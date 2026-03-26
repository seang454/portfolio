"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type TagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export default function TypewriterText({
  text,
  className = "",
  tag = "p",
  delay = 0,
  duration = 1.1,
  showCursor = true,
  persistCursor = true,
  cursorClassName = "",
  loop = false,
  loopDelay = 1.2,
}: {
  text: string;
  className?: string;
  tag?: TagName;
  delay?: number;
  duration?: number;
  showCursor?: boolean;
  persistCursor?: boolean;
  cursorClassName?: string;
  loop?: boolean;
  loopDelay?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useGSAP(
    () => {
      const totalCharacters = text.length;
      const state = { count: 0 };
      const stepDuration = Math.max(duration / Math.max(totalCharacters, 1), 0.045);
      const deleteDuration = Math.max(stepDuration * totalCharacters * 0.82, 0.72);

      setDisplayText("");
      setIsComplete(false);

      const timeline = gsap.timeline({
        delay,
        onComplete: () => {
          setDisplayText(text);
          setIsComplete(true);
        },
      });

      timeline.to(state, {
        count: totalCharacters,
        duration: stepDuration * totalCharacters,
        ease: "none",
        snap: { count: 1 },
        onUpdate: () => {
          setDisplayText(text.slice(0, state.count));
        },
      });

      if (loop) {
        timeline.to({}, { duration: loopDelay });
        timeline.to(state, {
          count: 0,
          duration: deleteDuration,
          ease: "power1.inOut",
          snap: { count: 1 },
          onStart: () => {
            setIsComplete(false);
          },
          onUpdate: () => {
            setDisplayText(text.slice(0, state.count));
          },
        });
        timeline.repeat(-1);
      }

      return () => {
        timeline.kill();
      };
    },
    { dependencies: [delay, duration, loop, loopDelay, text] },
  );

  const Tag = tag;
  const shouldShowCursor = showCursor && (!isComplete || persistCursor);

  return (
    <Tag className={className} aria-label={text}>
      <span>{displayText}</span>
      {shouldShowCursor ? (
        <span
          aria-hidden="true"
          className={`typewriter-cursor ${cursorClassName}`.trim()}
        >
          _
        </span>
      ) : null}
    </Tag>
  );
}
