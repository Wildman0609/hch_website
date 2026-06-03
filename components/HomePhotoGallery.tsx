"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images, Maximize2, X } from "lucide-react";
import type { CareHomeGalleryImage } from "@/data/homes";

type HomePhotoGalleryProps = {
  homeName: string;
  images: CareHomeGalleryImage[];
};

export function HomePhotoGallery({ homeName, images }: HomePhotoGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CareHomeGalleryImage["category"] | "All">("All");

  const categories = Array.from(new Set(images.map((image) => image.category)));
  const activeImages =
    activeCategory === "All"
      ? images
      : images.filter((image) => image.category === activeCategory);
  const categoryOptions: Array<CareHomeGalleryImage["category"] | "All"> = ["All", ...categories];
  const activeImage = activeImages[activeIndex] ?? activeImages[0];
  const previewImages = activeImages.slice(0, 6);
  const remainingCount = Math.max(activeImages.length - previewImages.length, 0);

  const openGallery = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const moveTo = (index: number) => {
    setActiveIndex((index + activeImages.length) % activeImages.length);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((currentIndex) => (currentIndex - 1 + activeImages.length) % activeImages.length);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((currentIndex) => (currentIndex + 1) % activeImages.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImages.length, isOpen]);

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="bg-holly-sky py-10 md:py-14">
      <div className="section-shell">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-holly-leaf">
              Photo tour
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-holly-ink md:text-4xl">
              {homeName} in pictures
            </h2>
            <p className="mt-3 text-base leading-7 text-holly-ink/70">
              A closer look at the rooms, shared spaces, gardens and daily details families can see when they visit.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openGallery(0)}
            className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full bg-holly-leaf px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-holly-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-gold"
          >
            <Images aria-hidden size={17} />
            <span>Open gallery</span>
            <span className="rounded-full bg-white/18 px-2 py-0.5 text-xs">{images.length}</span>
          </button>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="Filter photo gallery">
          {categoryOptions.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setActiveIndex(0);
              }}
              className={`flex-none rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-holly-leaf text-white"
                  : "bg-white text-holly-ink shadow-soft hover:bg-holly-cream"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:h-[30rem] lg:grid-cols-4 lg:grid-rows-2">
          {previewImages.map((image, index) => {
            const featured = index === 0;
            const showMore = index === previewImages.length - 1 && remainingCount > 0;

            return (
              <GalleryPreviewTile
                key={image.src}
                image={image}
                index={index}
                onOpen={openGallery}
                featured={featured}
                moreCount={showMore ? remainingCount : 0}
              />
            );
          })}
        </div>
      </div>

      {isOpen && activeImage ? (
        <div
          className="fixed inset-0 z-[90] bg-holly-ink text-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="home-photo-gallery-title"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-white/12 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-holly-leafLight">
                  {homeName}
                </p>
                <h2 id="home-photo-gallery-title" className="mt-1 truncate font-display text-2xl font-semibold">
                  Photo gallery
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close gallery"
                className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-holly-gold"
              >
                <X aria-hidden size={21} />
                <span className="sr-only">Close gallery</span>
              </button>
            </div>

            <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto]">
              <div className="grid min-h-0 gap-3 px-3 py-3 sm:px-5 sm:py-5 lg:grid-cols-[3.5rem_minmax(0,1fr)_3.5rem]">
                <div className="hidden items-center justify-center lg:flex">
                  <button
                    type="button"
                    onClick={() => moveTo(activeIndex - 1)}
                    title="Previous photo"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-holly-gold"
                  >
                    <ChevronLeft aria-hidden size={24} />
                    <span className="sr-only">Previous photo</span>
                  </button>
                </div>

                <figure className="relative min-h-[18rem] overflow-hidden rounded-lg bg-black">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </figure>

                <div className="hidden items-center justify-center lg:flex">
                  <button
                    type="button"
                    onClick={() => moveTo(activeIndex + 1)}
                    title="Next photo"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-holly-gold"
                  >
                    <ChevronRight aria-hidden size={24} />
                    <span className="sr-only">Next photo</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-white/12 px-4 py-4 sm:px-6">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="inline-flex rounded-full bg-white/12 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/84">
                      {activeImage.category}
                    </p>
                    <p className="mt-2 font-display text-2xl font-semibold leading-tight text-white">
                      {activeImage.caption}
                    </p>
                  </div>

                  <div className="flex flex-none items-center justify-between gap-3 sm:justify-end">
                    <span className="text-sm font-semibold text-white/62">
                      {activeIndex + 1} of {activeImages.length}
                    </span>
                    <div className="flex gap-2 lg:hidden">
                      <button
                        type="button"
                        onClick={() => moveTo(activeIndex - 1)}
                        title="Previous photo"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-holly-gold"
                      >
                        <ChevronLeft aria-hidden size={21} />
                        <span className="sr-only">Previous photo</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => moveTo(activeIndex + 1)}
                        title="Next photo"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-holly-gold"
                      >
                        <ChevronRight aria-hidden size={21} />
                        <span className="sr-only">Next photo</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function GalleryPreviewTile({
  image,
  index,
  onOpen,
  featured = false,
  moreCount = 0
}: {
  image?: CareHomeGalleryImage;
  index: number;
  onOpen: (index: number) => void;
  featured?: boolean;
  moreCount?: number;
}) {
  if (!image) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`group relative overflow-hidden rounded-lg bg-holly-ink text-left shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-leaf ${
        featured ? "aspect-[4/3] sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:h-full" : "aspect-[4/3] lg:h-full"
      }`}
      aria-label={`Open gallery at ${image.caption}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={featured ? "(min-width: 1024px) 48rem, 100vw" : "(min-width: 1024px) 25rem, (min-width: 640px) 33vw, 100vw"}
        className="object-cover transition duration-500 group-hover:scale-105"
        style={{ objectPosition: image.position ?? "50% 50%" }}
        priority={featured}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-holly-ink/88 via-holly-ink/24 to-transparent" />
      {moreCount > 0 ? (
        <span className="absolute inset-0 flex items-center justify-center bg-holly-ink/52 text-center font-display text-4xl font-semibold text-white">
          +{moreCount}
        </span>
      ) : null}
      <span className="absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/92 text-holly-ink shadow-soft">
        <Maximize2 aria-hidden size={18} />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-3 text-white">
        <span className="inline-flex rounded-full bg-white/16 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/88">
          {image.category}
        </span>
        <span className="mt-2 block text-sm font-semibold leading-5">{image.caption}</span>
      </span>
    </button>
  );
}
