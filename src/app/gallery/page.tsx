import type { Metadata } from "next";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/config";

export const metadata: Metadata = {
  title: gallery.title,
  description: gallery.description,
  openGraph: {
    title: gallery.title,
    description: gallery.description,
    url: `${baseURL}${gallery.path}`,
  },
};

export default function Gallery() {
  return (
    <div className="py-16 sm:py-24">
      <GalleryView />
    </div>
  );
}
