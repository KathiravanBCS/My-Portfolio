'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, ChevronRight,
  Cpu, Zap, Briefcase, Mail, Sparkles, RefreshCw,
} from 'lucide-react';

const AVATAR_SRC = '/images/avatar.png';

const QUICK_QUESTIONS = [
  { text: 'What technologies does Kathiravan work with?', icon: Cpu, label: 'Tech Stack' },
  { text: 'Tell me about recent projects', icon: Zap, label: 'Projects' },
  { text: "What is Kathiravan's professional background?", icon: Briefcase, label: 'Experience' },
  { text: 'How can I contact Kathiravan?', icon: Mail, label: 'Contact' },
];

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant' as const,
  parts: [{
    type: 'text' as const,
    text: "Hi! I'm KathiravanBot, Kathiravan V's AI portfolio assistant.\n\nAsk me about his projects, tech stack, experience, or how to get in touch.\n\nI can also forward your message directly to Kathiravan if you share your email and query.",
  }],
  createdAt: new Date(),
};

export default function KathiravanBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastScrollTime = useRef(0);

  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const isLoading = status === 'streaming';
  const displayMessages = messages.length === 0 ? [WELCOME_MESSAGE] : messages;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isOpen) setIsKeyboardVisible(false);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current && isMobile === false) {
      inputRef.current.focus();
    }
  }, [isOpen, isMobile]);

  const scrollToBottomIfNear = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current < 500) return;
    lastScrollTime.current = now;
    const el = messagesContainerRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (status === 'streaming') scrollToBottomIfNear();
  }, [status, scrollToBottomIfNear]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed && trimmed.length <= 2000) {
      sendMessage({ text: trimmed });
      setInput('');
    }
  };

  const handleReset = () => window.location.reload();

  const isMobileViewport = isMobile === true;

  const chatWindowClass = [
    'fixed z-[9998] flex flex-col border backdrop-blur-2xl transition-all duration-300',
    isLight
      ? 'border-gray-200 bg-white/95 shadow-[0_35px_80px_rgba(0,0,0,0.15)] ring-1 ring-gray-200/50'
      : 'border-white/10 bg-[#0d0d12]/95 shadow-[0_35px_80px_rgba(0,0,0,0.75)] ring-1 ring-white/5',
    isMobileViewport
      ? `${isKeyboardVisible ? 'bottom-2' : 'bottom-36'} left-4 right-4`
      : 'bottom-20 right-4 md:right-6 h-[480px] w-[340px]',
  ].join(' ');

  const chatWindowStyle = isMobileViewport
    ? {
        height: isKeyboardVisible ? '60dvh' : '70dvh',
        maxHeight: '520px',
        minHeight: isKeyboardVisible ? '360px' : '420px',
      }
    : undefined;

  if (!mounted) return null;

  const chatUI = (
    <>
      {/* Floating toggle button */}
      <style>{`
        @keyframes float-pulse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.5), 0 25px 60px rgba(0,0,0,0.25); }
          50% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.8), 0 25px 60px rgba(0,0,0,0.35); }
        }
        .bot-button-glow { animation: glow 2s ease-in-out infinite; }
        .bot-button-float { animation: float-pulse 3s ease-in-out infinite; }
      `}</style>
      <div className="pointer-events-none fixed inset-x-0 bottom-28 md:bottom-28 z-[9999] px-4 md:px-6">
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(o => !o)}
            aria-label="Toggle KathiravanBot"
            className={[
              'pointer-events-auto bot-button-float group relative flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-xl',
              'transition-all active:scale-95',
              isLight
                ? 'border-purple-300/50 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-[0_25px_60px_rgba(168,85,247,0.25)] hover:border-purple-400 hover:shadow-[0_25px_70px_rgba(168,85,247,0.35)]'
                : 'border-purple-500/40 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-[0_25px_60px_rgba(168,85,247,0.4)] hover:border-purple-400/60 hover:shadow-[0_25px_70px_rgba(168,85,247,0.5)]',
            ].join(' ')}
            style={{ animation: !isOpen ? 'glow 2s ease-in-out infinite' : 'none' }}
          >
            {/* Pulsing background ring */}
            {!isOpen && (
              <div className="absolute inset-0 rounded-full border border-purple-400/30 animate-pulse" />
            )}
            {isOpen
              ? <X size={20} className="transition-transform duration-200 group-hover:rotate-90" />
              : <MessageCircle size={20} className="transition-transform duration-200 group-hover:scale-110" />}
          </button>
        </div>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={chatWindowClass}
            style={chatWindowStyle}
          >
            {/* Header */}
            <div className={[
              'relative flex items-center gap-3 border-b px-4 py-2.5',
              isLight ? 'border-gray-200 bg-gray-50' : 'border-white/10 bg-[#0d0d12]',
            ].join(' ')}>
              <div className="relative h-7 w-7 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={AVATAR_SRC}
                  alt="Kathiravan V"
                  className={[
                    'h-7 w-7 rounded-full border object-cover',
                    isLight ? 'border-gray-200' : 'border-white/10',
                  ].join(' ')}
                />
                <span className={[
                  'absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full border',
                  isLight ? 'border-gray-50 bg-gray-50' : 'border-[#0d0d12] bg-[#0d0d12]',
                ].join(' ')}>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </span>
              </div>

              <div className="flex-1 min-w-0 flex items-center gap-2">
                <p className={`text-[13px] font-bold truncate ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  KathiravanBot
                </p>
                <span className={[
                  'flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold border shrink-0',
                  isLight
                    ? 'bg-pink-100 text-pink-600 border-pink-200'
                    : 'bg-pink-500/10 text-pink-400 border-pink-500/20',
                ].join(' ')}>
                  <Sparkles size={7} /> AI
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset chat"
                  title="Reset Chat"
                  className={[
                    'shrink-0 p-2 transition-all',
                    isLight
                      ? 'text-gray-400 hover:bg-gray-200 hover:text-gray-700'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white',
                  ].join(' ')}
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className={[
                    'shrink-0 p-2 transition-all',
                    isLight
                      ? 'text-gray-400 hover:bg-red-100 hover:text-red-500'
                      : 'text-slate-400 hover:bg-red-500/10 hover:text-red-400',
                  ].join(' ')}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className={[
                'flex-1 overflow-y-auto space-y-6 px-5 py-6 relative scroll-smooth',
                'scrollbar-thin scrollbar-track-transparent',
                isLight
                  ? 'bg-white scrollbar-thumb-gray-200'
                  : 'bg-[#080810] scrollbar-thumb-white/10',
              ].join(' ')}
            >
              <div className={[
                'absolute inset-0 bg-[size:40px_40px] pointer-events-none opacity-40',
                isLight
                  ? 'bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]'
                  : 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]',
              ].join(' ')} />

              {displayMessages.map((message, index) => (
                <motion.div
                  key={message.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`relative flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={[
                    'max-w-[85%] px-5 py-4 shadow-sm text-[14.5px] leading-relaxed',
                    message.role === 'user'
                      ? isLight
                        ? 'bg-pink-600 text-white font-medium'
                        : 'bg-[#2a1a20] border border-pink-500/30 text-white font-medium'
                      : isLight
                        ? 'bg-gray-100 border border-gray-200 text-gray-800'
                        : 'bg-[#0d0d18] border border-white/10 text-slate-200',
                  ].join(' ')}>
                    <div className={[
                      'prose prose-sm max-w-none prose-p:my-1.5 prose-pre:my-3 prose-pre:border',
                      isLight
                        ? 'prose-gray prose-strong:text-gray-900 prose-headings:text-gray-900 prose-pre:bg-gray-200 prose-pre:border-gray-300'
                        : 'prose-invert prose-strong:text-white prose-headings:text-white prose-ul:text-slate-300 prose-pre:bg-[#15171f] prose-pre:border-white/10',
                    ].join(' ')}>
                      {message.parts?.map((part, i) => {
                        if (part.type === 'text' && part.text) {
                          return (
                            <ReactMarkdown
                              key={`${part.type}-${i}`}
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: ({ node: _node, ...props }) => (
                                  <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`underline transition-all ${
                                      isLight
                                        ? 'text-pink-600 decoration-pink-600/30 hover:decoration-pink-600'
                                        : 'text-pink-400 decoration-pink-400/30 hover:decoration-pink-400'
                                    }`}
                                  />
                                ),
                              }}
                            >
                              {part.text}
                            </ReactMarkdown>
                          );
                        }
                        if (part.type === 'tool-result' && 'output' in part && part.output) {
                          const result = part.output as { success?: boolean; message?: string };
                          if (result?.message) {
                            return (
                              <div key={`${part.type}-${i}`} className={`italic text-xs mt-2 border-t pt-2 ${
                                isLight ? 'text-gray-500 border-gray-200' : 'text-slate-500 border-white/5'
                              }`}>
                                {result.message}
                              </div>
                            );
                          }
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && displayMessages[displayMessages.length - 1]?.role !== 'assistant' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className={`border px-4 py-3 ${
                    isLight ? 'bg-gray-100 border-gray-200' : 'bg-[#0d0d18] border-white/10'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 animate-bounce bg-pink-500 [animation-delay:-0.3s]" />
                      <div className="h-1.5 w-1.5 animate-bounce bg-pink-500 [animation-delay:-0.15s]" />
                      <div className="h-1.5 w-1.5 animate-bounce bg-pink-500" />
                    </div>
                  </div>
                </motion.div>
              )}

              {displayMessages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="pt-2"
                >
                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className={`w-full border-t ${isLight ? 'border-gray-200' : 'border-white/5'}`} />
                    </div>
                    <div className="relative flex justify-center">
                      <span className={`px-3 text-[10px] font-medium uppercase tracking-wider ${
                        isLight ? 'bg-white text-gray-500' : 'bg-[#080810] text-slate-500'
                      }`}>
                        I can help you with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {QUICK_QUESTIONS.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => sendMessage({ text: item.text })}
                        className={[
                          'group flex items-center gap-3 w-full border p-3 text-left transition-all',
                          isLight
                            ? 'border-gray-200 bg-gray-50 hover:border-pink-300 hover:bg-pink-50'
                            : 'border-white/5 bg-[#0d0d18] hover:border-pink-500/20 hover:bg-[#130d12]',
                        ].join(' ')}
                      >
                        <div className={[
                          'flex h-8 w-8 shrink-0 items-center justify-center transition-colors',
                          isLight
                            ? 'bg-gray-200 text-gray-500 group-hover:bg-pink-100 group-hover:text-pink-600'
                            : 'bg-white/5 text-slate-400 group-hover:bg-pink-500/10 group-hover:text-pink-400',
                        ].join(' ')}>
                          <item.icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[10px] font-medium mb-0.5 ${isLight ? 'text-gray-500' : 'text-slate-500'}`}>
                            {item.label}
                          </p>
                          <p className={`text-[12px] truncate ${
                            isLight ? 'text-gray-700 group-hover:text-gray-900' : 'text-slate-200 group-hover:text-white'
                          }`}>
                            {item.text}
                          </p>
                        </div>
                        <ChevronRight size={14} className={[
                          'opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0',
                          isLight ? 'text-gray-400 group-hover:text-pink-600' : 'text-slate-600 group-hover:text-pink-400',
                        ].join(' ')} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={[
              'border-t px-5',
              isMobileViewport ? (isKeyboardVisible ? 'py-2.5' : 'py-3.5') : 'py-4',
              isLight ? 'border-gray-200 bg-gray-50' : 'border-white/10 bg-[#0d0d12]',
            ].join(' ')}>
              <form
                onSubmit={handleSubmit}
                className={[
                  'flex items-center gap-2 border px-2 py-2 transition-all',
                  isLight
                    ? 'border-gray-200 bg-white focus-within:border-pink-400 focus-within:shadow-[0_0_20px_-5px_rgba(236,72,153,0.15)]'
                    : 'border-white/10 bg-[#15171f] focus-within:border-pink-500/30 focus-within:bg-[#1a1020] focus-within:shadow-[0_0_20px_-5px_rgba(236,72,153,0.2)]',
                ].join(' ')}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onFocus={() => isMobileViewport && setIsKeyboardVisible(true)}
                  onBlur={() => setIsKeyboardVisible(false)}
                  placeholder="Ask anything..."
                  disabled={isLoading}
                  maxLength={2000}
                  className={[
                    'flex-1 bg-transparent px-3 outline-none min-w-0',
                    isMobileViewport ? 'text-base' : 'text-[13px]',
                    isLight ? 'text-gray-900 placeholder:text-gray-400' : 'text-white placeholder:text-slate-500',
                  ].join(' ')}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className={[
                    'flex h-9 w-9 shrink-0 items-center justify-center shadow-lg transition-all',
                    'hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100',
                    isLight ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white',
                  ].join(' ')}
                >
                  <Send size={16} />
                </button>
              </form>
              <div className="mt-2 text-center">
                <span className={`text-[9px] font-medium tracking-wide ${
                  isLight ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  POWERED BY AI · GEMINI 2.5 FLASH
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return createPortal(chatUI, document.body);
}
