import Image from "next/image";
import type { Metadata } from "next";
import { about, person, social, baseURL } from "@/resources";
import { iconLibrary } from "@/resources/icons";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: about.title,
  description: about.description,
  openGraph: {
    title: about.title,
    description: about.description,
    url: `${baseURL}${about.path}`,
  },
};

export default function About() {
  return <AboutContent />;
}
