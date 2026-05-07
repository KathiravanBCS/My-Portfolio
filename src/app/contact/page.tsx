import type { Metadata } from "next";
import { baseURL } from "@/config";
import { ContactForm as ContactPage } from "@/components";
import { FaStar } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Contact - Let's Build Something",
  description: "Get in touch with me for projects, opportunities, or just to say hello.",
  openGraph: {
    title: "Contact - Let's Build Something",
    description: "Get in touch with me for projects, opportunities, or just to say hello.",
    url: `${baseURL}/contact`,
  },
};

export default function Contact() {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Header */}
      <div className="w-full text-center py-8 md:py-12 px-4">
        <p className="font-mono text-[#ff4081] text-sm tracking-widest uppercase mb-3">
          Get In Touch
        </p>
        <h1 className="font-mono font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white text-center mb-4">
          Let&apos;s Build <span className="text-[#ff4081]">Something</span> <FaStar className="text-[#ff4081] h-5 w-5 md:h-7 md:w-7 inline" />
        </h1>
        <p className="font-mono text-base sm:text-lg text-gray-700 dark:text-gray-400 max-w-2xl text-center mx-auto">
          Got a project, opportunity, or just want to say hello? I'm always up for a conversation.
        </p>
      </div>

      {/* Contact Form */}
      <ContactPage />
    </div>
  );
}
