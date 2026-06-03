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

  const activeImage = images[activeIndex] ?? images[0];
  const previewImages = images.slice(0, 4);
  const remainingCount = Math.max(images.length - previewImages.length, 0);

  const openGallery = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const moveTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
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
        setActiveIndex((currentIndex) => (currentIndex - 1 + images.length) % images.length);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, isOpen]);

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-holly-leaf">
              Photo tour
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-holly-ink md:text-5xl">
              {homeName} in pictures
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-holly-ink/70">
              A closer look at the rooms, shared spaces, gardens and daily details families can see when they visit.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openGallery(0)}
            className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-holly-leaf px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-holly-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-gold"
          >
            <Images aria-hidden size={17} />
            <span>Open gallery</span>
            <span className="rounded-full bg-white/18 px-2 py-0.5 text-xs">{images.length}</span>
          </button>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <GalleryPreviewTile
            image={previewImages[0]}
            index={0}
            onOpen={openGallery}
            featured
          />

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {previewImages.slice(1).map((image, imageIndex) => {
              const index = imageIndex + 1;
              const showMore = index === previewImages.length - 1 && remainingCount > 0;

              return (
                <GalleryPreviewTile
                  key={image.src}
                  image={image}
                  index={index}
                  onOpen={openGallery}
                  moreCount={showMore ? remainingCount : 0}
                />
              );
            })}
          </div>
        </div>
      </div>

      {isOpen && activeImage ? (
        <div
          className="fixed inset-0 z-[90] bg-holly-ink/96 text-white"
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
                  {activeImage.caption}
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

            <div className="grid min-h-0 flex-1 gap-4 px-4 py-4 lg:grid-cols-[4rem_1fr_4rem] lg:px-6">
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

              <figure className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-4">
                <div className="relative min-h-[18rem] overflow-hidden rounded-lg bg-black/24">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
                <figcaption className="flex flex-col gap-2 text-sm leading-6 text-white/78 sm:flex-row sm:items-center sm:justify-between">
                  <span>
                    <span className="mr-2 inline-flex rounded-full bg-white/12 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/84">
                      {activeImage.category}
                    </span>
                    {activeImage.alt}
                  </span>
                  <span className="flex-none text-white/56">
                    {activeIndex + 1} of {images.length}
                  </span>
                </figcaption>
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

              <div className="grid grid-cols-2 gap-3 lg:hidden">
                <button
                  type="button"
                  onClick={() => moveTo(activeIndex - 1)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-white"
                >
                  <ChevronLeft aria-hidden size={18} />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => moveTo(activeIndex + 1)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-white"
                >
                  Next
                  <ChevronRight aria-hidden size={18} />
                </button>
              </div>
            </div>

            <div className="border-t border-white/12 px-4 py-3 sm:px-6">
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((image, index) => {
                  const isSelected = index === activeIndex;

                  return (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`relative h-20 w-28 flex-none overflow-hidden rounded-md border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-holly-gold ${
                        isSelected ? "border-holly-gold" : "border-white/18 opacity-72 hover:opacity-100"
                      }`}
                      aria-label={`Show ${image.caption}`}
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="7rem"
                        className="object-cover"
                        style={{ objectPosition: image.position ?? "50% 50%" }}
                      />
                    </button>
                  );
                })}
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
      className={`group relative overflow-hidden rounded-[1.25rem] bg-holly-ink text-left shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-holly-leaf ${
        featured ? "aspect-[4/3] lg:min-h-[30rem]" : "aspect-[4/3]"
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
        <span className="absolute inset-0 flex items-center justify-center bg-holly-ink/48 text-center font-display text-4xl font-semibold text-white">
          +{moreCount}
        </span>
      ) : null}
      <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-holly-ink shadow-soft">
        <Maximize2 aria-hidden size={18} />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-4 text-white">
        <span className="inline-flex rounded-full bg-white/16 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/88">
          {image.category}
        </span>
        <span className="mt-2 block text-sm font-semibold leading-6">{image.caption}</span>
      </span>
    </button>
  );
}
