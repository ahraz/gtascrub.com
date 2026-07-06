"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface CardData {
  imgUrl: string;
  alt: string;
  linkUrl?: string;
}

interface SocialCardsProps {
  cards: CardData[];
}

export default function SocialCards({ cards }: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | HTMLAnchorElement)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const rotationRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const els = cardsRef.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const total = els.length;
    const arcAngle = 60; // total spread in degrees
    const angleStep = arcAngle / (total - 1);
    const startAngle = -arcAngle / 2;
    const radius = 520; // px radius of the fan arc

    // Build the fan timeline
    const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power3.out" } });

    // Set initial state — cards start invisible and slightly below
    tl.set(els, { opacity: 0, y: 60, scale: 0.85 });

    els.forEach((el, i) => {
      const angle = startAngle + i * angleStep;
      const rad = (angle * Math.PI) / 180;
      const x = Math.sin(rad) * radius;
      const y = Math.cos(rad) * (radius * 0.15) - radius * 0.35;

      const zIndex = Math.round(i < total / 2 ? total - i : i);

      tl.to(
        el,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          x: x,
          top: y,
          zIndex: zIndex,
          rotation: -angle * 0.5,
          duration: 0.6 + i * 0.08,
          ease: "back.out(1.2)",
        },
        "+=0.03"
      );
    });

    // After fan-in, set up hover effects
    tl.call(() => {
      els.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          // Pause auto-rotation
          if (rotationRef.current) clearInterval(rotationRef.current);

          // Bring hovered card forward and scale slightly
          gsap.to(el, {
            scale: 1.08,
            zIndex: 999,
            duration: 0.4,
            ease: "power2.out",
          });

          // Slightly push other cards back
          els.forEach((other) => {
            if (other !== el) {
              gsap.to(other, {
                scale: 0.92,
                opacity: 0.6,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          });
        });

        el.addEventListener("mouseleave", () => {
          // Resume auto-rotation
          startRotation();

          // Reset all cards
          els.forEach((other, j) => {
            const angle = startAngle + j * angleStep;
            gsap.to(other, {
              scale: 1,
              opacity: 1,
              zIndex: Math.round(j < total / 2 ? total - j : j),
              duration: 0.5,
              ease: "power2.out",
            });
          });
        });

        el.addEventListener("click", () => {
          // On click, briefly pulse
          gsap.fromTo(el, { scale: 0.95 }, { scale: 1.08, duration: 0.3, ease: "elastic.out(1, 0.4)" });
        });
      });
    });

    tlRef.current = tl;

    // Auto-rotate: shift the stack every 4 seconds
    function startRotation() {
      if (rotationRef.current) clearInterval(rotationRef.current);
      rotationRef.current = setInterval(() => {
        currentIndexRef.current = (currentIndexRef.current + 1) % total;
        const first = els.shift()!;
        els.push(first);
        els.forEach((el, j) => {
          const angle = startAngle + j * angleStep;
          const rad = (angle * Math.PI) / 180;
          const x = Math.sin(rad) * radius;
          const y = Math.cos(rad) * (radius * 0.15) - radius * 0.35;
          const zIdx = Math.round(j < total / 2 ? total - j : j);
          gsap.to(el, {
            x,
            top: y,
            zIndex: zIdx,
            rotation: -angle * 0.5,
            duration: 0.6,
            ease: "power3.inOut",
          });
        });
      }, 4000);
    }

    startRotation();

    return () => {
      tl.kill();
      if (rotationRef.current) clearInterval(rotationRef.current);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", () => {});
        el.removeEventListener("mouseleave", () => {});
        el.removeEventListener("click", () => {});
      });
    };
  }, []);

  const setCardRef = (el: HTMLDivElement | HTMLAnchorElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <div
      ref={containerRef}
      className="fan-layout flex relative justify-center items-center w-full h-[450px] md:h-[600px] max-w-[80rem] mx-auto"
    >
          {cards.map((card, index) => {
            const image = (
              <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <img
                  src={card.imgUrl}
                  loading="lazy"
                  alt={card.alt || `Card ${index}`}
                  className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-6 left-6 z-30 pointer-events-none">
                  <p className="text-white font-bold text-lg">{card.alt}</p>
                </div>
              </div>
            );

            const cardClass =
              "fan-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 md:w-[320px] md:h-[420px] cursor-pointer origin-center";

            return card.linkUrl ? (
              <a
                key={index}
                ref={(el) => setCardRef(el, index)}
                href={card.linkUrl}
                target={card.linkUrl.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={cardClass}
              >
                {image}
              </a>
            ) : (
              <div key={index} ref={(el) => setCardRef(el, index)} className={cardClass}>
                {image}
              </div>
            );
          })}
    </div>
  );
}
