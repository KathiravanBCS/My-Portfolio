"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa6";

// ─── CAL.COM TYPE DEFINITIONS ───────────────────────────────────────────────
// Cal.com embed is loaded via iframe, no API initialization needed

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const CONFIG = {
  WEB3FORMS_ACCESS_KEY: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY",
  CAL_API_KEY: process.env.NEXT_PUBLIC_CAL_API_KEY || "YOUR_CAL_API_KEY",
  RECIPIENT_NAME: "Kathiravan V",
  SOCIAL_LINKS: {
    email: "kathiravanvittopa717@gmail.com",
    github: "https://github.com/KathiravanBCS",
    linkedin: "https://www.linkedin.com/in/kathiravan-vittobha-182569317/",
    twitter: "https://twitter.com",
  },
  LOCATION: "Chennai, Tamil Nadu, India",
  AVAILABILITY: "Open to opportunities",
};

// ─── TYPES ──────────────────────────────────────────────────────────────────
type CommandType = {
  command: string;
  output: string | React.ReactNode;
  isError?: boolean;
};

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";
type InputMode = "" | "name" | "email" | "message";

const TYPING_DELAY = 30;

// ─── ICONS ──────────────────────────────────────────────────────────────────
const IconMail = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Mail</title>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconPhone = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Phone</title>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const IconTerminal = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Terminal</title>
    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);

const IconMessageSquare = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Message</title>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconSend = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Send</title>
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconCalendar = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Calendar</title>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconRotate = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Rotate</title>
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2-8.83"/>
  </svg>
);

const IconArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <title>Arrow Right</title>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ContactPage() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Standard form state
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Terminal state
  const getInitialCommandHistory = useCallback((): CommandType[] => [{
    command: "",
    output: (
      <div className="space-y-2 text-gray-300">
        <p className="font-semibold text-gray-100">Welcome to {CONFIG.RECIPIENT_NAME}'s Terminal Contact!</p>
        <p>Follow these steps to send me a message:</p>
        <p className="ml-4">1. <span className="text-green-400">name</span> - Set your name</p>
        <p className="ml-4">2. <span className="text-green-400">email</span> - Set your email</p>
        <p className="ml-4">3. <span className="text-green-400">message</span> - Write your message</p>
        <p className="ml-4">4. <span className="text-green-400">send</span> - Send your message</p>
        <p className="ml-4">5. <span className="text-green-400">status</span> - Check current input status</p>
        <p className="ml-4">6. <span className="text-green-400">clear</span> - Clear the terminal</p>
      </div>
    )
  }], []);

  const [commandHistory, setCommandHistory] = useState<CommandType[]>(getInitialCommandHistory());
  const [command, setCommand] = useState("");
  const [inputMode, setInputMode] = useState<InputMode>("");
  const [inputPrompt, setInputPrompt] = useState("");
  const [terminalFormState, setTerminalFormState] = useState<FormState>({ name: "", email: "", message: "" });
  const [terminalStatus, setTerminalStatus] = useState<FormStatus>("idle");
  const [currentStep, setCurrentStep] = useState(1);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [time, setTime] = useState({ date: "", time: "" });
  const [isTerminalMode, setIsTerminalMode] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLIFrameElement>(null);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({ date: now.toLocaleDateString(), time: now.toLocaleTimeString() });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  const focusInput = () => inputRef.current?.focus();

  const simulateTyping = (text: string, callback?: () => void) => {
    setIsTyping(true);
    setTypingText("");
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(text.substring(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setIsTyping(false);
        callback?.();
      }
    }, TYPING_DELAY);
    return () => clearInterval(interval);
  };

  const sendEmail = async (data: FormState) => {
    try {
      if (!data.email || !data.message) return { success: false, error: "Missing required fields" };
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) return { success: false, error: "Invalid email format" };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: CONFIG.WEB3FORMS_ACCESS_KEY,
          name: data.name?.trim() || "",
          email: data.email.trim(),
          message: data.message.trim(),
        }),
      });

      const result = await response.json();
      return result.success ? { success: true } : { success: false, error: result.error || "Failed to send" };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Network error" };
    }
  };

  // Standard form handlers
  const handleStandardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setFormStatus("error");
      setErrorMsg("Please fill in all fields");
      return;
    }
    
    setFormStatus("submitting");
    setErrorMsg("");
    const result = await sendEmail(form);
    
    if (result.success) {
      setFormStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    } else {
      setFormStatus("error");
      setErrorMsg(result.error || "Failed to send message");
    }
  };

  // Terminal handlers
  const handleInputSubmit = () => {
    if (!command.trim()) return;

    const newCommand: CommandType = { command: command, output: "" };

    if (inputMode === "name") {
      if (command.trim().length < 2) {
        newCommand.output = "Please enter a valid name (at least 2 characters).";
        newCommand.isError = true;
      } else {
        setTerminalFormState(prev => ({ ...prev, name: command.trim() }));
        newCommand.output = `Name set to "${command.trim()}".`;
        setInputMode("");
        setCurrentStep(Math.max(currentStep, 2));
      }
    } else if (inputMode === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(command.trim())) {
        newCommand.output = "Please enter a valid email address.";
        newCommand.isError = true;
      } else {
        setTerminalFormState(prev => ({ ...prev, email: command.trim() }));
        newCommand.output = `Email set to "${command.trim()}".`;
        setInputMode("");
        setCurrentStep(Math.max(currentStep, 3));
      }
    } else if (inputMode === "message") {
      if (command.trim().length < 5) {
        newCommand.output = "Please enter a longer message (at least 5 characters).";
        newCommand.isError = true;
      } else {
        setTerminalFormState(prev => ({ ...prev, message: command.trim() }));
        newCommand.output = `Message set to "${command.trim()}".`;
        setInputMode("");
        setCurrentStep(Math.max(currentStep, 4));
      }
    }

    setCommandHistory(prev => [...prev, newCommand]);
    setCommand("");
  };

  const executeCommand = (cmdText: string) => {
    simulateTyping(cmdText, () => {
      setCommand(cmdText);
      handleCommand(cmdText);
    });
  };

  const handleCommand = (cmdOverride?: string) => {
    if (inputMode || isTyping) return;

    const cmdText = cmdOverride || command;
    if (!cmdText.trim()) return;

    const newCommand: CommandType = { command: cmdText, output: "" };
    const lowerCommand = cmdText.toLowerCase().trim();

    if (lowerCommand === "clear") {
      setCommandHistory([]);
      setCommand("");
      return;
    }
    
    if (lowerCommand === "name") {
      newCommand.output = "Enter your name:";
      setInputMode("name");
      setInputPrompt("Name:");
    } else if (lowerCommand === "email") {
      newCommand.output = "Enter your email address:";
      setInputMode("email");
      setInputPrompt("Email:");
    } else if (lowerCommand === "message") {
      newCommand.output = "Enter your message:";
      setInputMode("message");
      setInputPrompt("Message:");
    } else if (lowerCommand === "send") {
      if (!terminalFormState.name || !terminalFormState.email || !terminalFormState.message) {
        newCommand.output = `Missing required fields. Current status:\nName: ${terminalFormState.name ? "✓" : "✗"}\nEmail: ${terminalFormState.email ? "✓" : "✗"}\nMessage: ${terminalFormState.message ? "✓" : "✗"}\n\nPlease fill in all fields before sending.`;
        newCommand.isError = true;
      } else {
        setTerminalStatus("submitting");
        newCommand.output = "Sending your message...";

        sendEmail(terminalFormState).then((result) => {
          if (result.success) {
            setCommandHistory(prev => [...prev, {
              command: "",
              output: <div className="space-y-2"><p className="text-green-400">✓ Message sent successfully!</p><p>{CONFIG.RECIPIENT_NAME} will get back to you soon at {terminalFormState.email}.</p></div>,
            }]);
            setTerminalStatus("success");
            setTerminalFormState({ name: "", email: "", message: "" });
            setCurrentStep(1);
          } else {
            setCommandHistory(prev => [...prev, {
              command: "",
              output: <div className="space-y-2"><p className="text-red-400">✗ Error sending message:</p><p className="text-sm text-red-300">{result.error}</p></div>,
              isError: true
            }]);
            setTerminalStatus("error");
          }
        });
      }
    } else if (lowerCommand === "status") {
      newCommand.output = (
        <div className="space-y-1"><p>Current status:</p>
          <p className="ml-2">Name: {terminalFormState.name ? <span className="text-green-400">{terminalFormState.name} ✓</span> : <span className="text-gray-500">Not set ✗</span>}</p>
          <p className="ml-2">Email: {terminalFormState.email ? <span className="text-green-400">{terminalFormState.email} ✓</span> : <span className="text-gray-500">Not set ✗</span>}</p>
          <p className="ml-2">Message: {terminalFormState.message ? <span className="text-green-400">Set ✓</span> : <span className="text-gray-500">Not set ✗</span>}</p>
        </div>
      );
    } else if (lowerCommand === "help") {
      newCommand.output = (
        <div className="space-y-2 text-gray-300"><p>Available commands:</p>
          <p className="ml-4"><span className="text-green-400">name</span> - Set your name</p>
          <p className="ml-4"><span className="text-green-400">email</span> - Set your email</p>
          <p className="ml-4"><span className="text-green-400">message</span> - Write your message</p>
          <p className="ml-4"><span className="text-green-400">send</span> - Send your message</p>
          <p className="ml-4"><span className="text-green-400">status</span> - Check current input status</p>
          <p className="ml-4"><span className="text-green-400">clear</span> - Clear the terminal</p>
        </div>
      );
    } else {
      newCommand.output = `Command not found: ${cmdText}. Type "help" to see available commands.`;
      newCommand.isError = true;
    }

    setCommandHistory(prev => [...prev, newCommand]);
    setCommand("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputMode) handleInputSubmit();
      else handleCommand();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const suggestions = ["name", "email", "message", "send", "status", "clear", "help"];
      const match = suggestions.find(cmd => cmd.startsWith(command.toLowerCase()));
      if (match) setCommand(match);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const lastCommand = commandHistory.filter(entry => entry.command).map(entry => entry.command).pop();
      if (lastCommand && !inputMode) setCommand(lastCommand);
    }
  };

  const getPrompt = () => {
    if (inputMode) return inputPrompt;
    if (terminalStatus === "submitting") return "sending...";
    return "kathiravan@portfolio:~$";
  };

  const getNextSuggestedCommand = () => {
    if (!terminalFormState.name) return "name";
    if (!terminalFormState.email) return "email";
    if (!terminalFormState.message) return "message";
    return "send";
  };

  return (
    <section className="relative py-12 md:py-20 px-3 md:px-4 bg-white dark:bg-gray-950">
      {!isTerminalMode && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-pink-500/10 to-transparent blur-3xl" />
        </div>
      )}

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Let's <span className="text-[#ff4081]">Build</span> Something{" "}
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="inline-block ml-1"
            >
              <FaStar className="text-[#ff4081] h-5 w-5 md:h-7 md:w-7 inline" />
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4"
          >
            Got a project, opportunity, or just want to say hello? I'm always up for a conversation.
          </motion.p>
        </motion.div>

        {/* Mode Toggle Button */}
        <div className="flex justify-center mb-8">
          <motion.button
            type="button"
            onClick={() => setIsTerminalMode(!isTerminalMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all duration-300 font-medium ${
              isTerminalMode
                ? "bg-gray-900 border border-gray-700 text-gray-300 hover:text-white dark:bg-gray-800"
                : "bg-pink-500 text-white hover:bg-pink-600"
            }`}
          >
            {isTerminalMode ? (
              <>
                <IconMessageSquare className="w-4 h-4" />
                <span>Standard Form</span>
              </>
            ) : (
              <>
                <IconTerminal className="w-4 h-4" />
                <span>Terminal Mode</span>
              </>
            )}
            <IconRotate className="w-3 h-3 ml-1" />
          </motion.button>
        </div>

        {isTerminalMode ? (
          // Terminal Mode
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Terminal */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 overflow-hidden rounded-lg">
                <div className="p-3 flex items-center justify-between bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="flex-1 text-center text-sm font-mono text-gray-600 dark:text-gray-400">Terminal — contact.sh</div>
                  <div className="text-sm font-mono text-pink-500 dark:text-pink-400">{time.time}</div>
                </div>

                <div
                  ref={terminalRef}
                  className="p-4 h-96 overflow-y-auto bg-gray-50 dark:bg-gray-950 font-mono text-sm font-semibold cursor-text"
                  onClick={focusInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") focusInput();
                  }}
                >
                  <div className="text-pink-500 dark:text-pink-400 mb-2 font-bold">Last login: {time.date} {time.time}</div>
                  <div className="mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                    <span className="font-black text-pink-500 dark:text-pink-400">Portfolio Terminal</span> <span className="font-semibold text-gray-600 dark:text-gray-400">v1.0.0 - Type <span className="font-bold text-pink-500 dark:text-pink-400">help</span> for commands</span>
                  </div>

                  {commandHistory.map((entry, index) => (
                    <div key={`${index}-${entry.command}`} className="mb-4">
                      {entry.command && <div className="flex"><span className="text-gray-500 dark:text-gray-500 mr-2 font-black">{getPrompt()}</span><span className="text-gray-900 dark:text-white font-bold">{entry.command}</span></div>}
                      <div className={`ml-4 mt-1 font-semibold ${entry.isError ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-300"}`}>{entry.output}</div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex"><span className="text-gray-500 dark:text-gray-500 mr-2 font-black">{getPrompt()}</span><span className="text-gray-900 dark:text-white font-bold">{typingText}<span className="animate-pulse">▌</span></span></div>
                  )}

                  {!isTyping && (
                    <div className="flex items-center"><span className="text-gray-500 dark:text-gray-500 mr-2 font-black">{getPrompt()}</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white font-semibold placeholder-gray-400 dark:placeholder-gray-600"
                        placeholder="Type a command..."
                        disabled={terminalStatus === "submitting" || isTyping}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-4 rounded-lg">
                  <h3 className="text-sm font-black text-gray-900 dark:text-white mb-3">Terminal Pro Tips</h3>
                  <div className="space-y-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    <div className="flex items-start gap-2"><span className="text-pink-500 dark:text-pink-400 flex-shrink-0">↹</span><p>Press <span className="text-gray-800 dark:text-gray-300 font-bold">Tab</span> to autocomplete</p></div>
                    <div className="flex items-start gap-2"><span className="text-pink-500 dark:text-pink-400 flex-shrink-0">↑</span><p>Press <span className="text-gray-800 dark:text-gray-300 font-bold">Up Arrow</span> for previous commands</p></div>
                    <div className="flex items-start gap-2"><span className="text-pink-500 dark:text-pink-400 flex-shrink-0">!</span><p>Click command buttons to execute</p></div>
                  </div>
                  <button
                    type="button"
                    onClick={() => executeCommand(getNextSuggestedCommand())}
                    className="mt-3 w-full py-2 px-3 text-sm font-black bg-pink-500 hover:bg-pink-600 text-white dark:bg-pink-600 dark:hover:bg-pink-700 rounded flex items-center justify-center gap-1 transition-colors"
                  >
                    Next: {getNextSuggestedCommand()} <IconArrowRight />
                  </button>
                </div>

                {terminalStatus === "idle" && !isTyping && !inputMode && (
                  <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-3 rounded-lg">
                    <div className="text-sm font-bold text-gray-600 dark:text-gray-500 mb-2">Available commands:</div>
                    <div className="flex flex-wrap gap-1">
                      {!terminalFormState.name && <button type="button" onClick={() => executeCommand("name")} className="px-2 py-1 text-sm font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 rounded transition-colors">name</button>}
                      {!terminalFormState.email && <button type="button" onClick={() => executeCommand("email")} className="px-2 py-1 text-sm font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 rounded transition-colors">email</button>}
                      {!terminalFormState.message && <button type="button" onClick={() => executeCommand("message")} className="px-2 py-1 text-sm font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 rounded transition-colors">message</button>}
                      {terminalFormState.name && terminalFormState.email && terminalFormState.message && <button type="button" onClick={() => executeCommand("send")} className="px-2 py-1 text-sm font-bold bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 border border-pink-500 dark:border-pink-600 text-white rounded transition-colors">send</button>}
                      <button type="button" onClick={() => executeCommand("status")} className="px-2 py-1 text-sm font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 rounded transition-colors">status</button>
                      <button type="button" onClick={() => executeCommand("help")} className="px-2 py-1 text-sm font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 rounded transition-colors">help</button>
                      <button type="button" onClick={() => executeCommand("clear")} className="px-2 py-1 text-sm font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 rounded transition-colors">clear</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <IconMail className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Email</p>
                  <a href={`mailto:${CONFIG.SOCIAL_LINKS.email}`} className="text-gray-300 hover:text-pink-500 transition font-medium">
                    {CONFIG.SOCIAL_LINKS.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <IconPhone className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Phone</p>
                  <a href="tel:+91934276414" className="text-gray-300 hover:text-pink-500 transition font-medium">
                    +91 9342764141  
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-start gap-4 group w-full hover:opacity-80 transition text-left"
              >
                <div className="flex-shrink-0 p-2 rounded bg-gray-800 group-hover:bg-gray-700 transition">
                  <IconCalendar className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Schedule</p>
                  <p className="text-gray-300 group-hover:text-pink-500 transition font-medium">Schedule 1:1</p>
                  <p className="text-xs text-gray-600 mt-1">{showCalendar ? 'Hide calendar' : 'Show calendar'}</p>
                </div>
              </button>

              {/* Calendar Modal Popup */}
              {showCalendar && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowCalendar(false)}
                    className="fixed inset-0 bg-black/50 z-40"
                  />
                  
                  {/* Modal */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  >
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                      {/* Modal Header */}
                      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Schedule Your Meeting</h3>
                        <button
                          type="button"
                          onClick={() => setShowCalendar(false)}
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                          aria-label="Close modal"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <title>Close</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="overflow-y-auto max-h-[calc(90vh-70px)] bg-white dark:bg-gray-950">
                        <iframe
                          ref={calendarRef}
                          src="https://cal.com/kathiravan-vittobha/30min"
                          width="100%"
                          height="750"
                          frameBorder="0"
                          scrolling="auto"
                          title="Schedule meeting"
                          style={{ colorScheme: "light dark" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : (
          // Standard Form Mode
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 overflow-hidden rounded-lg shadow-lg dark:shadow-none">
                <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-gray-800/50">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Send me a message</h2>
                </div>

                <form onSubmit={handleStandardSubmit} className="p-6 md:p-8 space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name <span className="text-pink-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-pink-500 dark:focus:border-pink-500 transition rounded"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email <span className="text-pink-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-pink-500 dark:focus:border-pink-500 transition rounded"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message <span className="text-pink-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell me what's on your mind..."
                      rows={6}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-pink-500 dark:focus:border-pink-500 transition rounded resize-none"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    whileHover={{ scale: formStatus === "submitting" ? 1 : 1.02 }}
                    whileTap={{ scale: formStatus === "submitting" ? 1 : 0.98 }}
                    className="w-full py-3 px-6 font-semibold bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send Message"}
                  </motion.button>

                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/50 text-green-700 dark:text-green-400 rounded text-center font-medium"
                    >
                      ✓ Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                  {formStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 text-red-700 dark:text-red-400 rounded text-center font-medium"
                    >
                      ✗ {errorMsg}
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Info Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium uppercase tracking-wide">Email</p>
                <a href={`mailto:${CONFIG.SOCIAL_LINKS.email}`} className="text-gray-900 dark:text-white font-medium hover:text-pink-500 dark:hover:text-pink-500 transition text-lg">
                  {CONFIG.SOCIAL_LINKS.email}
                </a>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium uppercase tracking-wide">Response Time</p>
                <p className="text-gray-900 dark:text-white font-medium text-lg">24-48 Hours</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium uppercase tracking-wide">Location</p>
                <p className="text-gray-900 dark:text-white font-medium text-lg">{CONFIG.LOCATION}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
