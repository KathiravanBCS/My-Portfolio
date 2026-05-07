'use client'

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface Position {
  x: number;
  y: number;
}

interface SpriteSet {
  [key: string]: [number, number][];
}

const SPRITE_SETS: SpriteSet = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

const NEKO_SPEED = 12;
const LONG_PRESS_DURATION = 500;
const STORAGE_KEY_DISABLED = 'oneko-cat-disabled';
const STORAGE_KEY_SPRITE = 'oneko-sprite-type';

type SpriteType = 'cat' | 'dog';

export default function OnekoCat() {
  const pathname = usePathname();
  const nekoRef = useRef<HTMLDivElement>(null);

  const [nekoPos, setNekoPos] = useState<Position>({ x: 32, y: 32 });
  const [isVisible, setIsVisible] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [spriteType, setSpriteType] = useState<SpriteType>('cat');
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const hasMouseMovedRef = useRef(false);

  const mousePosRef = useRef<Position>({ x: 0, y: 0 });
  const nekoPosRef = useRef<Position>({ x: 32, y: 32 });
  const frameCountRef = useRef(0);
  const idleTimeRef = useRef(0);
  const idleAnimationRef = useRef<string | null>(null);
  const idleAnimationFrameRef = useRef(0);
  const isDisabledRef = useRef(false);

  const lastFrameTimestamp = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastTapTime = useRef<number>(0);
  const tapCount = useRef<number>(0);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartPos = useRef<Position | null>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    isDisabledRef.current = isDisabled;
  }, [isDisabled]);

  const setSprite = useCallback((name: string, frame: number) => {
    if (!nekoRef.current) return;
    const sprite = SPRITE_SETS[name][frame % SPRITE_SETS[name].length];
    nekoRef.current.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }, []);

  const resetIdleAnimation = useCallback(() => {
    idleAnimationRef.current = null;
    idleAnimationFrameRef.current = 0;
  }, []);

  const handleIdle = useCallback(() => {
    idleTimeRef.current += 1;
    const idleAnimation = idleAnimationRef.current;
    const idleAnimationFrame = idleAnimationFrameRef.current;
    const nekoPos = nekoPosRef.current;

    if (idleTimeRef.current > 10 && Math.floor(Math.random() * 200) === 0 && !idleAnimation) {
      const options = ['sleeping', 'scratchSelf'];
      if (nekoPos.x < 32) options.push('scratchWallW');
      if (nekoPos.y < 32) options.push('scratchWallN');
      if (nekoPos.x > window.innerWidth - 32) options.push('scratchWallE');
      if (nekoPos.y > window.innerHeight - 32) options.push('scratchWallS');
      idleAnimationRef.current = options[Math.floor(Math.random() * options.length)];
    }

    switch (idleAnimationRef.current) {
      case 'sleeping':
        if (idleAnimationFrame < 8) {
          setSprite('tired', 0);
          break;
        }
        setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) resetIdleAnimation();
        break;
      case 'scratchWallN':
      case 'scratchWallS':
      case 'scratchWallE':
      case 'scratchWallW':
      case 'scratchSelf':
        setSprite(idleAnimationRef.current, idleAnimationFrame);
        if (idleAnimationFrame > 9) resetIdleAnimation();
        break;
      default:
        setSprite('idle', 0);
        return;
    }
    idleAnimationFrameRef.current += 1;
  }, [setSprite, resetIdleAnimation]);

  const handleFrame = useCallback(() => {
    if (!nekoRef.current) return;

    if (isDisabledRef.current) {
      if (idleAnimationRef.current === 'sleeping') {
        if (idleAnimationFrameRef.current < 8) {
          setSprite('tired', 0);
        } else {
          setSprite('sleeping', Math.floor(idleAnimationFrameRef.current / 4));
        }
        idleAnimationFrameRef.current += 1;
      } else {
        setSprite('idle', 0);
      }
      return;
    }

    frameCountRef.current += 1;
    const nekoPos = nekoPosRef.current;
    const mousePos = mousePosRef.current;
    const diffX = nekoPos.x - mousePos.x;
    const diffY = nekoPos.y - mousePos.y;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < NEKO_SPEED || distance < 48) {
      handleIdle();
      return;
    }

    idleAnimationRef.current = null;
    idleAnimationFrameRef.current = 0;

    if (idleTimeRef.current > 1) {
      setSprite('alert', 0);
      idleTimeRef.current = Math.max(idleTimeRef.current - 1, 0);
      return;
    }

    let direction = '';
    direction += diffY / distance > 0.5 ? 'N' : '';
    direction += diffY / distance < -0.5 ? 'S' : '';
    direction += diffX / distance > 0.5 ? 'W' : '';
    direction += diffX / distance < -0.5 ? 'E' : '';
    setSprite(direction, frameCountRef.current);

    const newX = nekoPos.x - (diffX / distance) * NEKO_SPEED;
    const newY = nekoPos.y - (diffY / distance) * NEKO_SPEED;
    const nextPos = {
      x: Math.min(Math.max(16, newX), window.innerWidth - 16),
      y: Math.min(Math.max(16, newY), window.innerHeight - 16),
    };

    nekoPosRef.current = nextPos;
    setNekoPos(nextPos);
    idleTimeRef.current = 0;
  }, [setSprite, handleIdle]);

  useEffect(() => {
    const storedDisabled = localStorage.getItem(STORAGE_KEY_DISABLED);
    if (storedDisabled === 'true') {
      setIsDisabled(true);
      isDisabledRef.current = true;
      idleAnimationRef.current = 'sleeping';
      idleAnimationFrameRef.current = 0;
    }
    const storedSprite = localStorage.getItem(STORAGE_KEY_SPRITE) as SpriteType;
    if (storedSprite === 'cat' || storedSprite === 'dog') {
      setSpriteType(storedSprite);
    }
    return () => {
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
      if (longPressTimeoutRef.current) clearTimeout(longPressTimeoutRef.current);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!hasMouseMovedRef.current) {
        const startPos = { x: event.clientX, y: event.clientY };
        nekoPosRef.current = startPos;
        setNekoPos(startPos);
        hasMouseMovedRef.current = true;
        setHasMouseMoved(true);
      }
      if (isDisabledRef.current) return;
      mousePosRef.current = { x: event.clientX, y: event.clientY };
      idleTimeRef.current = 0;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
        lastFrameTimestamp.current = null;
      } else {
        setIsVisible(true);
      }
    };

    const animate = (timestamp: number) => {
      if (!lastFrameTimestamp.current) {
        lastFrameTimestamp.current = timestamp;
      }
      if (timestamp - lastFrameTimestamp.current > 100) {
        lastFrameTimestamp.current = timestamp;
        handleFrame();
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isReducedMotion && isVisible) {
      lastFrameTimestamp.current = null;
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('visibilitychange', handleVisibilityChange);
      animationFrameId.current = requestAnimationFrame(animate);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      lastFrameTimestamp.current = null;
    };
  }, [isVisible, handleFrame]);

  const toggleDisabledState = useCallback(() => {
    const next = !isDisabledRef.current;
    isDisabledRef.current = next;
    setIsDisabled(next);
    if (next) {
      idleAnimationRef.current = 'sleeping';
      idleAnimationFrameRef.current = 0;
    } else {
      idleAnimationRef.current = null;
      idleAnimationFrameRef.current = 0;
    }
    localStorage.setItem(STORAGE_KEY_DISABLED, String(next));
  }, []);

  const handleSpriteChange = useCallback((type: SpriteType) => {
    setSpriteType(type);
    localStorage.setItem(STORAGE_KEY_SPRITE, type);
    setShowSwitcher(false);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabledRef.current) return;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      if (!nekoRef.current) return;
      nekoRef.current.style.transform = 'scale(1.2)';
      setTimeout(() => {
        if (nekoRef.current) nekoRef.current.style.transform = 'scale(1)';
      }, 100);
    }, 250);
  }, []);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    toggleDisabledState();
  }, [toggleDisabledState]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSwitcher(prev => !prev);
  };

  const clearLongPressTimeout = useCallback(() => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime.current;
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    clearLongPressTimeout();
    tapCount.current = (timeSinceLastTap < 300 && timeSinceLastTap > 0)
      ? tapCount.current + 1
      : 1;
    lastTapTime.current = now;
    if (tapCount.current === 2) {
      toggleDisabledState();
      tapCount.current = 0;
    } else {
      longPressTimeoutRef.current = setTimeout(() => {
        if (touchStartPos.current) setShowSwitcher(prev => !prev);
        tapCount.current = 0;
      }, LONG_PRESS_DURATION);
      tapTimeoutRef.current = setTimeout(() => { tapCount.current = 0; }, 300);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    clearLongPressTimeout();
    const touch = e.touches[0];
    if (touchStartPos.current) {
      const dx = touch.clientX - touchStartPos.current.x;
      const dy = touch.clientY - touchStartPos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 10) tapCount.current = 0;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    clearLongPressTimeout();
    touchStartPos.current = null;
  };

  const isBlogPage = pathname?.startsWith('/blog');
  if (!isVisible || isBlogPage || !hasMouseMoved) return null;

  const spriteImage = spriteType === 'cat' ? '/oneko.gif' : '/oneko-dog.gif';

  return (
    <>
      <div
        ref={nekoRef}
        aria-label={isDisabled ? 'Sleeping neko — double-click to wake' : 'Neko — double-click to sleep, right-click to switch'}
        title={isDisabled ? 'Double-click to wake up' : 'Double-click to sleep · Right-click to switch'}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: '32px',
          height: '32px',
          position: 'fixed',
          pointerEvents: 'auto',
          cursor: 'pointer',
          imageRendering: 'pixelated',
          left: `${nekoPos.x - 16}px`,
          top: `${nekoPos.y - 16}px`,
          zIndex: 9999,
          backgroundImage: `url(${spriteImage})`,
          transition: 'transform 0.1s ease-out',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          opacity: isDisabled ? 0.5 : 1,
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      />

      {/* Floating sprite switcher */}
      <div
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '16px',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: 'flex-start',
        }}
      >
        <button
          type="button"
          onClick={() => setShowSwitcher(prev => !prev)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowSwitcher(prev => !prev); }}
          title="Switch neko sprite"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.15)',
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            padding: 0,
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'; }}
        >
          {spriteType === 'cat' ? '🐱' : '🐶'}
        </button>

        {showSwitcher && (
          <div
            style={{
              backgroundColor: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '10px',
              padding: '4px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              minWidth: '130px',
            }}
          >
            <button
              type="button"
              onClick={() => handleSpriteChange('cat')}
              style={{
                width: '100%',
                padding: '8px 12px',
                textAlign: 'left',
                background: spriteType === 'cat' ? 'rgba(255,255,255,0.12)' : 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: '6px',
                fontSize: '13px',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => { if (spriteType !== 'cat') e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={(e) => { if (spriteType !== 'cat') e.currentTarget.style.background = 'transparent'; }}
            >
              🐱 Oneko Cat
            </button>
            <button
              type="button"
              onClick={() => handleSpriteChange('dog')}
              style={{
                width: '100%',
                padding: '8px 12px',
                textAlign: 'left',
                background: spriteType === 'dog' ? 'rgba(255,255,255,0.12)' : 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: '6px',
                fontSize: '13px',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => { if (spriteType !== 'dog') e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={(e) => { if (spriteType !== 'dog') e.currentTarget.style.background = 'transparent'; }}
            >
              🐶 Oneko Dog
            </button>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '4px 0' }} />
            <button
              type="button"
              onClick={toggleDisabledState}
              style={{
                width: '100%',
                padding: '8px 12px',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                color: isDisabled ? '#a3e635' : '#f87171',
                cursor: 'pointer',
                borderRadius: '6px',
                fontSize: '13px',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              {isDisabled ? '▶ Wake up' : '💤 Sleep'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
