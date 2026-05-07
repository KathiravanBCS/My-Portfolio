import type { Metadata } from "next";
import { services, baseURL, person } from "@/config";
import { ServicesContent } from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: services.title,
  description: services.description,
  openGraph: {
    title: services.title,
    description: services.description,
    url: `${baseURL}${services.path}`,
  },
};

export default function Services() {
  return <ServicesContent />;
}
