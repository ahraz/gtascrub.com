"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, useScroll, useInView } from "framer-motion";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 60;  
const IMG_HEIGHT = 85; 

function FlipCard({ src, index, target }: FlipCardProps) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180, scale: 1.2, zIndex: 50 }}
            >
                <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] bg-gray-200" style={{ backfaceVisibility: "hidden" }}>
                    <img src={src} alt={`portfolio-${index}`} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                </div>

                <div className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-[#0e0f0c] flex flex-col items-center justify-center p-4 border border-[#70cf36]/30" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-[#70cf36] uppercase tracking-widest mb-1">Clean</p>
                        <p className="text-[10px] font-medium text-white">Verified</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

const TOTAL_IMAGES = 15;

const IMAGES = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1584824486516-0555a07fc511?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1558904541-efa843a96f09?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1527345931282-79010bc18b0e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1580637172772-7634f19b8417?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=600&fit=crop",
];

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function ScrollGallery() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    
    const sectionRef = useRef<HTMLElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    // 1. Trigger animation ONLY when scrolled into view
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const MAX_SCROLL = 2500;
    const virtualScroll = useTransform(scrollYProgress, [0, 1], [0, MAX_SCROLL]);

    useEffect(() => {
        if (!stickyRef.current) return;
        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };
        const observer = new ResizeObserver(handleResize);
        observer.observe(stickyRef.current);
        setContainerSize({ width: stickyRef.current.offsetWidth, height: stickyRef.current.offsetHeight });
        return () => observer.disconnect();
    }, []);

    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    const scrollRotate = useTransform(virtualScroll, [600, MAX_SCROLL], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = stickyRef.current;
        if (!container) return;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // 2. Delayed Intro Sequence (Waits for isInView)
    useEffect(() => {
        if (!isInView) return;
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2000);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, [isInView]);

    const scatterPositions = useMemo(() => {
        return IMAGES.slice(0, TOTAL_IMAGES).map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => { unsubscribeMorph(); unsubscribeRotate(); unsubscribeParallax(); };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <>
        {/* 3. Increased wrapper to 500vh to slow down the scrub speed drastically */}
        <section ref={sectionRef} className="relative w-full h-[500vh] bg-white border-t border-gray-100">
            <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center perspective-1000">

                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.h2
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-3xl md:text-5xl font-black tracking-tighter text-[#0e0f0c]"
                    >
                        Precision in Every Detail.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-4 text-xs font-bold tracking-[0.2em] text-[#70cf36]"
                    >
                        SCROLL DOWN TO EXPLORE
                    </motion.p>
                </div>

                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[15%] md:top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
                        The GTA Scrub Standard
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 max-w-lg leading-relaxed">
                        Swipe through our premium commercial portfolio. Scroll your mouse to scrub through the timeline of our recent cleanouts.
                    </p>
                </motion.div>

                <div className="relative flex items-center justify-center w-full h-full mt-10 md:mt-20">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 70; 
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            const circleRadius = Math.min(minDimension * 0.35, 350);
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8; 
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8, 
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
        </>
    );
}
