"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiLink } from "react-icons/hi2";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { MdContentCopy, MdDone } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";

interface ShareButtonProps {
  title: string;
  url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(url || window.location.href);
  }, [url]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const peerlistShareUrl = `https://peerlist.io/share?title=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-pink-300 dark:border-pink-800/60 bg-white dark:bg-transparent text-gray-900 dark:text-white font-mono text-sm font-medium hover:bg-pink-50 dark:hover:bg-pink-950/30 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
          />
        </svg>
        <span>Share</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 backdrop-blur-sm bg-black/60"
              role="presentation"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-md rounded-lg shadow-2xl overflow-hidden border border-gray-800 bg-gray-950"
            >
              {/* Header */}
              <div className="flex items-start justify-between px-6 py-5 border-b border-gray-800">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Share this
                  </span>
                  <h3 className="text-lg font-bold leading-snug line-clamp-2 text-white">
                    {title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close share dialog"
                  className="p-1.5 rounded-md transition-colors ml-4 bg-gray-800/50 hover:bg-gray-700 text-gray-400 hover:text-white"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Social Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-3 p-4 border rounded-md transition-all group bg-[#161B22] hover:bg-[#1C2128] border-gray-700 hover:border-gray-600"
                    aria-label="Share on X/Twitter"
                  >
                    <FaXTwitter className="text-2xl group-hover:scale-110 transition-transform duration-300 text-white" />
                    <span className="text-xs font-medium text-gray-300 group-hover:text-white text-center">
                      X
                    </span>
                  </a>

                  <a
                    href={linkedinShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-3 p-4 border rounded-md transition-all group bg-[#161B22] hover:bg-[#1C2128] border-gray-700 hover:border-gray-600"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedin className="text-2xl text-[#0077b5] group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-medium text-gray-300 group-hover:text-white text-center">
                      LinkedIn
                    </span>
                  </a>

                  <a
                    href={peerlistShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-3 p-4 border rounded-md transition-all group bg-[#161B22] hover:bg-[#1C2128] border-gray-700 hover:border-gray-600"
                    aria-label="Share on Peerlist"
                  >
                    <IoGlobeOutline className="text-2xl group-hover:scale-110 transition-transform duration-300 text-gray-300 group-hover:text-white" />
                    <span className="text-xs font-medium text-gray-300 group-hover:text-white text-center">
                      Peerlist
                    </span>
                  </a>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 font-medium tracking-wider bg-gray-950 text-gray-500">
                      Or copy link
                    </span>
                  </div>
                </div>

                {/* Copy Link Section */}
                <div className="relative group/input">
                  <div className="flex items-center gap-3 border rounded-md p-1.5 pl-4 transition-colors focus-within:border-pink-500/50 focus-within:ring-1 focus-within:ring-pink-500/20 bg-[#161B22] border-gray-700">
                    <HiLink className="w-4 h-4 text-gray-500 group-focus-within/input:text-pink-500 transition-colors" />
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="bg-transparent border-none text-sm w-full focus:outline-none py-2 text-gray-300 placeholder-gray-600"
                    />
                    <button
                      type="button"
                      onClick={handleCopy}
                      aria-label={copied ? "Copied to clipboard" : "Copy link to clipboard"}
                      className={`flex items-center justify-center p-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
                        copied
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white border border-gray-700"
                      }`}
                    >
                      {copied ? (
                        <MdDone className="w-5 h-5" />
                      ) : (
                        <MdContentCopy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
