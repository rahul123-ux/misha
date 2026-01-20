"use client";

import FloatingEffects from "../../components/FloatingEffects";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const FORCE_UNLOCK = true;

  const [mounted, setMounted] = useState(false);
  const [birthday, setBirthday] = useState<Date | null>(null);

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const [unlocked, setUnlocked] = useState(FORCE_UNLOCK);
  const [entered, setEntered] = useState(false);

  const galleryRef = useRef<HTMLDivElement | null>(null);

  /* ========================= */
  /* 🧠 MOUNT GATE */
  /* ========================= */
  useEffect(() => {
    setMounted(true);
    setBirthday(new Date("2026-01-24T00:00:00"));
  }, []);

  /* ========================= */
  /* ⏳ COUNTDOWN */
  /* ========================= */
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

  /* ========================= */
  /* 🎯 BUTTON CLICK */
  /* ========================= */
  const handleEnter = () => {
    setEntered(true);

    setTimeout(() => {
      galleryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  };

  if (!mounted) return null;

  return (
    <main className="page-flow">
      {/* 💕 EFFECTS ONLY BEFORE GALLERY */}
      <FloatingEffects active={!entered} />

      {!unlocked && (
        <section className="hero home-bg">
          <h1 className="hero-title">Almost there 💕</h1>

          <p className="hero-subtitle">
            Something beautiful is waiting for you…
            <br />
            Unlocking in ✨
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

      {unlocked && (
        <section className="hero home-bg fade-in">
          <div className="emoji-stack">💖 💗 💞 🦋 🦋</div>

          <h1 className="birthday-title">Happy Birthday, meri jaan</h1>

          <p className="birthday-text">
            Today is all about celebrating you and the joy you bring to my life.
            <br />
            Thank you so much my love for coming into my life.
          </p>

          {!entered && (
            <button className="button" onClick={handleEnter}>
              Enter my heart 💕
            </button>
          )}
        </section>
      )}

      {entered && (
        <>
          <section ref={galleryRef} className="gallery-section fade-in">
            <h2 className="section-title">Our Memories 💞</h2>

            <div className="gallery-grid">
              <img src="/mine.jpeg" alt="Memory 1" />
              <img src="/i.jpeg" alt="Memory 2" />
              <img src="love.jpeg" alt="Memory 3" />
              <img src="/s.jpeg" alt="Memory 4" />
              <img src="hand.jpeg" alt="Memory 5" />
              <img src="/m.jpeg" alt="Memory 6" />
            </div>
          </section>

          <section className="letter-section fade-in">
            <div className="letter-card">
              <h2>My Love 💖</h2>

              <p>
                From the moment you came into my life, everything changed.
                Your shoulder became my favorite place to rest.
              </p>

              <p>
                This gallery holds memories, but my heart holds you — today and
                always.
              </p>

              <p>
                You are really really precious for me, i am too much possessive for you cause i dont want to loose you.
              </p>

              <p>
                Gonna make you my bride someday.
              </p>

              <p className="signature">— Yours, forever 💕</p>
            </div>
          </section>
        </>
      )}
    </main>
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
