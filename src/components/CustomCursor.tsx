"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Neko sprite states
type NekoState =
  | "awake"
  | "idle"
  | "scratch"
  | "wash"
  | "yawn"
  | "sleep"
  | "up"
  | "down"
  | "left"
  | "right"
  | "upleft"
  | "upright"
  | "downleft"
  | "downright";

const SPRITE_SIZE = 32;
const CAT_SPEED = 10;
const CAT_SCALE = 2;
const IDLE_THRESHOLD = 24;
const FRAME_INTERVAL = 120; // ms per animation frame

function getDirectionSprite(dx: number, dy: number): NekoState {
  const angle = ((Math.atan2(dy, dx) / Math.PI) * 180 + 360) % 360;
  if (angle <= 292.5 && angle > 247.5) return "up";
  if (angle <= 337.5 && angle > 292.5) return "upright";
  if (angle <= 22.5 || angle > 337.5) return "right";
  if (angle <= 67.5 && angle > 22.5) return "downright";
  if (angle <= 112.5 && angle > 67.5) return "down";
  if (angle <= 157.5 && angle > 112.5) return "downleft";
  if (angle <= 202.5 && angle > 157.5) return "left";
  return "upleft";
}

function getSpriteUrl(state: NekoState, frame: number): string {
  if (state === "awake") return "/images/neko/awake.png";
  if (state === "idle") return "/images/neko/awake.png";
  const f = (frame % 2) + 1;
  return `/images/neko/${state}${f}.png`;
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  // Refs for animation loop (no re-renders needed)
  const mouseRef = useRef({ x: -100, y: -100 });
  const catRef = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const catElRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef(0);
  const idleTickRef = useRef(0);
  const stateRef = useRef<NekoState>("awake");
  const lastFrameTimeRef = useRef(0);
  const rafRef = useRef(0);

  // Detect dark mode
  useEffect(() => {
    const checkDark = () =>
      setIsDark(
        document.documentElement.classList.contains("dark") ||
          !document.documentElement.classList.contains("light")
      );
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Track mouse position directly (no springs = instant)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Move dot cursor instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      // Check pointer state
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const style = window.getComputedStyle(el);
        setIsPointer(
          style.cursor === "pointer" ||
            el.tagName === "A" ||
            el.tagName === "BUTTON" ||
            el.closest("a") !== null ||
            el.closest("button") !== null
        );
      }
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Neko cat animation loop
  const animate = useCallback((timestamp: number) => {
    const cat = catRef.current;
    const mouse = mouseRef.current;
    const catEl = catElRef.current;

    if (!catEl) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const dx = mouse.x - cat.x;
    const dy = mouse.y - cat.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Frame animation timing
    const shouldAdvanceFrame =
      timestamp - lastFrameTimeRef.current > FRAME_INTERVAL;
    if (shouldAdvanceFrame) {
      lastFrameTimeRef.current = timestamp;
      frameRef.current++;
    }

    if (distance < IDLE_THRESHOLD) {
      // Cat is close to cursor — idle behavior
      idleTickRef.current++;
      const idleTick = idleTickRef.current;

      if (idleTick < 20) {
        stateRef.current = "awake";
      } else if (idleTick < 40) {
        stateRef.current = "scratch";
      } else if (idleTick < 60) {
        stateRef.current = "wash";
      } else if (idleTick < 80) {
        stateRef.current = "yawn";
      } else {
        stateRef.current = "sleep";
      }
    } else {
      // Chase the cursor
      idleTickRef.current = 0;
      const speed = Math.min(CAT_SPEED, distance);
      const ratio = speed / distance;
      cat.x += dx * ratio;
      cat.y += dy * ratio;
      stateRef.current = getDirectionSprite(dx, dy);
    }

    // Update cat element position and sprite
    const scaledSize = SPRITE_SIZE * CAT_SCALE;
    catEl.style.transform = `translate(${cat.x - scaledSize / 2}px, ${cat.y - scaledSize}px)`;
    catEl.src = getSpriteUrl(stateRef.current, frameRef.current);

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  const scaledSize = SPRITE_SIZE * CAT_SCALE;

  return (
    <>
      {/* Neko cat sprite */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={catElRef}
        alt=""
        src="/images/neko/awake.png"
        width={scaledSize}
        height={scaledSize}
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          imageRendering: "pixelated",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
          filter: isDark
            ? "drop-shadow(0 0 6px rgba(255,64,129,0.6)) drop-shadow(0 0 12px rgba(255,64,129,0.3))"
            : "drop-shadow(0 0 3px rgba(255,64,129,0.3))",
        }}
      />

      {/* Small pink cursor dot — follows mouse instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          width: isPointer ? 10 : 8,
          height: isPointer ? 10 : 8,
          opacity: isVisible ? 1 : 0,
          background: isDark
            ? "radial-gradient(circle, #ffffff 0%, #ff4081 60%)"
            : "#ff4081",
          boxShadow: isDark
            ? `0 0 ${isPointer ? 14 : 8}px rgba(255,64,129,0.9), 0 0 ${isPointer ? 28 : 16}px rgba(255,64,129,0.5)`
            : "none",
          transition:
            "width 0.15s ease, height 0.15s ease, opacity 0.2s ease, box-shadow 0.2s ease",
        }}
      />
    </>
  );
}
