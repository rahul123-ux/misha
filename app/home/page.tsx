"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import FloatingEffects from "../../components/FloatingEffects";

export default function HomePage() {
  const router = useRouter();
  const FORCE_UNLOCK = false;

  const [mounted, setMounted] = useState(false);
  const [birthday, setBirthday] = useState<Date | null>(null);

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const [unlocked, setUnlocked] = useState(FORCE_UNLOCK);

/* ========================= */
/* 🧠 MOUNT */
useEffect(() => {
  setMounted(true);
  setBirthday(new Date("2026-01-24T00:00:00"));
}, []);

  /* ========================= */
  /* ⏳ COUNTDOWN */
  useEffect(() => {
    if (!mounted || FORCE_UNLOCK || !birthday) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const distance = birthday.getTime() - now;

      if (distance <= 0) {
        setUnlocked(true);
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted, birthday, FORCE_UNLOCK]);

  if (!mounted) return null;

  return (
    <main className="page-flow">
      <FloatingEffects active/>

      {/* 🔒 LOCKED */}
      {!unlocked && (
        <section className="hero home-bg">
          <h1 className="hero-title">Almost there 💕</h1>
          <p className="hero-subtitle">
            Something beautiful is waiting for you…
          </p>

          {timeLeft && (
            <div className="flip-countdown">
              <FlipUnit value={timeLeft.days} label="Days" />
              <FlipUnit value={timeLeft.hours} label="Hours" />
              <FlipUnit value={timeLeft.minutes} label="Minutes" />
              <FlipUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          )}
        </section>
      )}

      {/* 🔓 UNLOCKED */}
      {unlocked && (
        <section className="hero home-bg fade-in">
          <div className="emoji-stack floating-emojis">
            💖 💗 💞 🦋 ✨ 🌸 💫
          </div>

          <h1 className="birthday-title glow-text">
            Happy Birthday, Meri jaan 🎂💖
          </h1>

          <StaggeredTyping />

          <button
            className="button pulse-heart"
            onClick={() => router.push("/game")}
          >
            Step into my heart 💞
          </button>
        </section>
      )}
    </main>
  );
}

/* ========================= */
/* 💕 STAGGERED TYPING */
function StaggeredTyping() {
  const texts = [
    `Today isn’t just your birthday…
it’s the day the world became softer 🌷
brighter ✨
and infinitely more beautiful —
because you, exist 💞`,

    `Every heartbeat of mine whispers your name 💗
Every moment feels warmer with you 🦋
And every tomorrow…
is a dream I want to live with you, Baby ✨`,

    `I created this little world for you —
filled with love, surprises, and pieces of my heart 💕
Are you ready to step inside, Misha?`,
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {texts.map((text, index) => (
        <TypingText
          key={index}
          text={text}
          isActive={index === activeIndex}
          onComplete={() =>
            setTimeout(() => setActiveIndex((i) => i + 1), 400)
          }
          className="birthday-text poetic"
        />
      ))}

      <div className="soft-divider">♡ ♡ ♡</div>
    </>
  );
}

/* ========================= */
/* ⌨️ SAFE TYPING + CURSOR */
function TypingText({
  text,
  isActive,
  onComplete,
  speed = 45,
  className = "",
}: {
  text: string;
  isActive: boolean;
  onComplete: () => void;
  speed?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!isActive) return;

    indexRef.current = 0;
    setDisplayed("");

    const typing = setInterval(() => {
      const nextChar = text[indexRef.current];

      if (nextChar === undefined) {
        clearInterval(typing);
        setShowCursor(false);
        onComplete();
        return;
      }

      setDisplayed((prev) => prev + nextChar);
      indexRef.current += 1;
    }, speed);

    return () => clearInterval(typing);
  }, [isActive, text, speed, onComplete]);

  useEffect(() => {
    if (!isActive) return;

    const blink = setInterval(() => {
      setShowCursor((v) => !v);
    }, 500);

    return () => clearInterval(blink);
  }, [isActive]);

  if (!isActive && displayed === "") return null;

  return (
    <p className={className}>
      {displayed}
      {showCursor && <span className="cursor">|</span>}
    </p>
  );
}

/* ========================= */
/* 🔁 FLIP UNIT */
function FlipUnit({ value, label }: { value: number; label: string }) {
  const prevValue = useRef<number>(value);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (prevValue.current !== value) {
      setAnimate(true);
      prevValue.current = value;
      const timeout = setTimeout(() => setAnimate(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [value]);

  return (
    <div className="flip-unit">
      <div className="flip-card">
        <div className={`flip-inner ${animate ? "do-flip" : ""}`}>
          {String(value).padStart(2, "0")}
        </div>
      </div>
      <span className="flip-label">{label}</span>
    </div>
  );
}
