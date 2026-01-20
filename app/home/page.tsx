"use client";

import FloatingEffects from "../../components/FloatingEffects";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
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
          <div className="emoji-stack">💖 💗 💞 🦋 ✨</div>

          <h1 className="birthday-title">
            Happy Birthday, meri jaan 🎂💕
          </h1>

          <p className="birthday-text">
            Today isn’t just your birthday —
            it’s a celebration of the love, warmth,
            and light you bring into my life.
            <br />
            Thank you, my love, for choosing me
            and for making my world more beautiful
            just by being in it 🤍
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
            <h2 className="section-title">Our Memories💞</h2>

            <p className="gallery-subtitle">
              Moments frozen in time, yet alive in my heart forever 🤍
            </p>

            <div className="gallery-grid">
              <div className="memory-card">
                <img src="/mine.jpeg" alt="Us together" />
                <p className="memory-text">
                  That smile I fall for <br /> every single time 😊✨
                </p>
              </div>

              <div className="memory-card">
                <img src="/i.jpeg" alt="Your smile" />
                <p className="memory-text">
                  Two hands, one promise <br /> forever 🤝💍
                </p>
              </div>

              <div className="memory-card">
                <img src="/love.jpeg" alt="Love" />
                <p className="memory-text">
                  You, being effortlessly <br /> beautiful 🤍🌸
                </p>
              </div>

              <div className="memory-card">
                <img src="/s.jpeg" alt="You being you" />
                <p className="memory-text">
                  A memory I’ll carry <br /> in my heart always 💕
                </p>
              </div>

              <div className="memory-card">
                <img src="/hand.jpeg" alt="Holding hands" />
                <p className="memory-text">
                  Love, written quietly <br /> while you sit in my lap, safe and loved 💞
                </p>
              </div>

              <div className="memory-card">
                <img src="/m.jpeg" alt="A special memory" />
                <p className="memory-text">
                  The moment I realized <br /> you feel like home 🏡💖
                </p>
              </div>
            </div>
          </section>

          <section className="letter-section fade-in">
            <div className="letter-card">
              <h2>My Love 💖</h2>

              <p>
                From the moment you walked into my life, nothing stayed the same.
                You became my calm in chaos, my home in every sense of the word.
                Your shoulder is where my heart feels safe.
              </p>

              <p>
                This gallery may hold memories,
                but my heart holds *you* —
                every smile, every tear, every piece of who you are.
              </p>

              <p>
                You are unimaginably precious to me.
                If I hold you close, it’s not possession —
                it’s fear of a world where I don’t get to love you.
                I never want to lose you, not in any lifetime.
              </p>

              <p>
                One day, I won’t just promise forever —
                I’ll stand beside you and make you my bride,
                with the whole world watching and my heart choosing you again 💍✨
              </p>

              <p className="signature">— Yours, completely and endlessly 💕</p>
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
