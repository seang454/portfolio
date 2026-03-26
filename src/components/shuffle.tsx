"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type ShuffleDirection = "left" | "right" | "up" | "down";
type AnimationMode = "random" | "evenodd";
type TagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: ShuffleDirection;
  duration?: number;
  maxDelay?: number;
  ease?: string;
  threshold?: number;
  rootMargin?: string;
  tag?: TagName;
  textAlign?: React.CSSProperties["textAlign"];
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: AnimationMode;
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
  delay?: number;
}

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function Shuffle({
  text,
  className = "",
  style,
  shuffleDirection = "right",
  duration = 0.35,
  maxDelay = 0,
  ease = "power3.out",
  threshold = 0.1,
  rootMargin = "0px",
  tag = "p",
  textAlign = "left",
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = "evenodd",
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = DEFAULT_CHARSET,
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = false,
  delay = 0,
}: ShuffleProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const charRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasPlayedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  const chars = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    charRefs.current = charRefs.current.slice(0, chars.length);
  }, [chars.length]);

  useGSAP(
    () => {
      const element = rootRef.current;
      const targets = charRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (!element || !targets.length) return;

      const prefersReducedMotion =
        respectReducedMotion &&
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const getAxisStart = () => {
        switch (shuffleDirection) {
          case "left":
            return { xPercent: 18, yPercent: 0 };
          case "right":
            return { xPercent: -18, yPercent: 0 };
          case "up":
            return { xPercent: 0, yPercent: 32 };
          case "down":
            return { xPercent: 0, yPercent: -32 };
          default:
            return { xPercent: -18, yPercent: 0 };
        }
      };

      const runAnimation = () => {
        if (!loop && triggerOnce && hasPlayedRef.current) return;
        hasPlayedRef.current = true;
        setIsReady(true);

        const { xPercent, yPercent } = getAxisStart();
        const fromColor = colorFrom ?? "currentColor";
        const toColor = colorTo ?? "currentColor";
        const totalSteps = Math.max(1, Math.floor(shuffleTimes * 5));

        gsap.killTweensOf(targets);
        gsap.set(targets, {
          opacity: prefersReducedMotion ? 1 : 0,
          xPercent: prefersReducedMotion ? 0 : xPercent,
          yPercent: prefersReducedMotion ? 0 : yPercent,
          filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
          color: fromColor,
        });

        if (prefersReducedMotion) {
          targets.forEach((node, index) => {
            node.textContent = chars[index] ?? "";
          });
          gsap.set(targets, { color: toColor, clearProps: "filter" });
          onShuffleComplete?.();
          return;
        }

        const order =
          animationMode === "evenodd"
            ? [...targets.filter((_, index) => index % 2 === 0), ...targets.filter((_, index) => index % 2 === 1)]
            : targets;

        const timeline = gsap.timeline({
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? loopDelay : 0,
          delay,
          onRepeat: () => {
            targets.forEach((node, index) => {
              node.textContent = chars[index] ?? "";
            });
          },
          onComplete: () => {
            targets.forEach((node, index) => {
              node.textContent = chars[index] ?? "";
            });
            onShuffleComplete?.();
          },
        });

        order.forEach((node, index) => {
          const actualIndex = targets.indexOf(node);
          const finalChar = chars[actualIndex] ?? "";
          const tweenDelay =
            animationMode === "random" && maxDelay > 0 ? Math.random() * maxDelay : index * stagger;
          const counter = { step: 0 };

          timeline.to(
            counter,
            {
              step: totalSteps,
              duration,
              ease: "none",
              onStart: () => {
                node.textContent = finalChar === " " ? "\u00A0" : finalChar;
              },
              onUpdate: () => {
                if (finalChar === " ") {
                  node.textContent = "\u00A0";
                  return;
                }
                if (counter.step >= totalSteps - 1) {
                  node.textContent = finalChar;
                  return;
                }
                const randomIndex = Math.floor(Math.random() * scrambleCharset.length);
                node.textContent = scrambleCharset.charAt(randomIndex) || finalChar;
              },
            },
            tweenDelay,
          );

          timeline.to(
            node,
            {
              opacity: 1,
              xPercent: 0,
              yPercent: 0,
              filter: "blur(0px)",
              color: toColor,
              duration,
              ease,
              clearProps: "filter",
            },
            tweenDelay,
          );
        });
      };

      if (!triggerOnce) {
        hasPlayedRef.current = false;
      }

      observerRef.current?.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (!entry?.isIntersecting) return;
          runAnimation();
          if (triggerOnce) observerRef.current?.disconnect();
        },
        { threshold, rootMargin },
      );

      observerRef.current.observe(element);

      const handleHover = () => {
        if (triggerOnHover) {
          hasPlayedRef.current = false;
          runAnimation();
        }
      };

      if (triggerOnHover) {
        element.addEventListener("mouseenter", handleHover);
      }

      return () => {
        observerRef.current?.disconnect();
        if (triggerOnHover) {
          element.removeEventListener("mouseenter", handleHover);
        }
      };
    },
    {
      scope: rootRef,
      dependencies: [
        animationMode,
        chars,
        colorFrom,
        colorTo,
        delay,
        duration,
        ease,
        loop,
        loopDelay,
        maxDelay,
        onShuffleComplete,
        respectReducedMotion,
        rootMargin,
        scrambleCharset,
        shuffleDirection,
        shuffleTimes,
        stagger,
        text,
        threshold,
        triggerOnHover,
        triggerOnce,
      ],
    },
  );

  const Tag = tag;

  return (
    <Tag
      ref={rootRef}
      className={className}
      style={{ ...style, textAlign, visibility: isReady ? "visible" : "visible" }}
      aria-label={text}
    >
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          ref={(node) => {
            charRefs.current[index] = node;
          }}
          className="inline-block whitespace-pre will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
