import type { Metadata } from "next";
import { baseURL } from "@/resources";
import { ContactForm as ContactPage } from "@/components";

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
  return <ContactPage />;
}
