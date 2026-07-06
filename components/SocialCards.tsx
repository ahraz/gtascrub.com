"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const [centerIndex, setCenterIndex] = useState(0);

  const total = cards.length;
  const arcAngle = 60;
  const angleStep = arcAngle / (Math.max(total - 1, 1));
  const startAngle = -arcAngle / 2;
  const radius = 520;

  const needsPagination = total > 0;
  const ARROW_CLASSES = "flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 shadow-sm";

  function cycle(direction: "left" | "right") {
    const els = cardsRef.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    if (rotationRef.current) clearInterval(rotationRef.current);

    const shift = direction === "right" ? -1 : 1;
    currentIndexRef.current = (currentIndexRef.current + total + shift) % total;

    if (direction === "right") {
      const last = els.pop()!;
      els.unshift(last);
    } else {
      const first = els.shift()!;
      els.push(first);
    }

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

    setCenterIndex((currentIndexRef.current + Math.floor(total / 2)) % total);
    startRotation();
  }

  function chevron(dir: "left" | "right") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points={dir === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
      </svg>
    );
  }

  function startRotation() {
    if (rotationRef.current) clearInterval(rotationRef.current);
    rotationRef.current = setInterval(() => {
      const els = cardsRef.current.filter(Boolean) as HTMLElement[];
      if (!els.length) return;
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
      setCenterIndex((currentIndexRef.current + Math.floor(total / 2)) % total);
    }, 4000);
  }

  useEffect(() => {
    const els = cardsRef.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power3.out" } });

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
          x,
          top: y,
          zIndex,
          rotation: -angle * 0.5,
          duration: 0.6 + i * 0.08,
          ease: "back.out(1.2)",
        },
        "+=0.03"
      );
    });

    tl.call(() => {
      els.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          if (rotationRef.current) clearInterval(rotationRef.current);
          gsap.to(el, { scale: 1.08, zIndex: 999, duration: 0.4, ease: "power2.out" });
          els.forEach((other) => {
            if (other !== el) {
              gsap.to(other, { scale: 0.92, opacity: 0.6, duration: 0.4, ease: "power2.out" });
            }
          });
        });

        el.addEventListener("mouseleave", () => {
          startRotation();
          els.forEach((other, j) => {
            const angle = startAngle + j * angleStep;
            gsap.to(other, { scale: 1, opacity: 1, zIndex: Math.round(j < total / 2 ? total - j : j), duration: 0.5, ease: "power2.out" });
          });
        });

        el.addEventListener("click", () => {
          gsap.fromTo(el, { scale: 0.95 }, { scale: 1.08, duration: 0.3, ease: "elastic.out(1, 0.4)" });
        });
      });
    });

    tlRef.current = tl;
    setCenterIndex(Math.floor(total / 2));
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
    <div className="flex flex-col items-center w-full relative z-20">
      <div ref={containerRef} className="fan-layout relative w-full h-[450px] md:h-[600px] max-w-[80rem] mx-auto flex justify-center items-center">
        {cards.map((card, index) => {
          const image = (
            <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <img src={card.imgUrl} loading="lazy" alt={card.alt || `Card ${index}`} className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 z-30 pointer-events-none">
                <p className="text-white font-bold text-lg md:text-xl leading-tight shadow-sm">{card.alt}</p>
              </div>
            </div>
          );

          const cardClass = "fan-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[340px] md:w-[320px] md:h-[420px] cursor-pointer origin-center";

          return card.linkUrl ? (
            <a key={index} ref={(el) => setCardRef(el, index)} href={card.linkUrl} target={card.linkUrl.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className={cardClass}>{image}</a>
          ) : (
            <div key={index} ref={(el) => setCardRef(el, index)} className={cardClass}>{image}</div>
          );
        })}
      </div>

      {needsPagination && (
        <div className="flex items-center justify-center gap-4 mt-8 md:mt-12 z-30">
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("left")} aria-label="Previous">
            {chevron("left")}
          </button>
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === centerIndex ? "bg-[#70cf36] scale-[1.3]" : "bg-gray-200"}`} />
            ))}
          </div>
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("right")} aria-label="Next">
            {chevron("right")}
          </button>
        </div>
      )}
    </div>
  );
}
