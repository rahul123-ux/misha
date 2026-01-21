"use client";

import { useEffect, useState } from "react";
import FloatingEffects from "../../components/FloatingEffects";

export default function BirthdayPage() {
  const [showReplay, setShowReplay] = useState(false);
  const [effectsVisible, setEffectsVisible] = useState(true);

  /* ⏳ Delay replay button */
  useEffect(() => {
    const t = setTimeout(() => setShowReplay(true), 3000);
    return () => clearTimeout(t);
  }, []);

  /* 🌬️ Fade floating effects on scroll */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) {
        setEffectsVisible(false);
      } else {
        setEffectsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="page-flow">
      {/* 💕 FLOATING EFFECTS — INTRO ONLY */}
      {effectsVisible && <FloatingEffects active />}

      {/* 🎂 INTRO */}
      <section className="hero home-bg fade-in">
        <div className="emoji-stack">💖 💗 💞 🦋 ✨</div>

        <h1 className="birthday-title">
          This is all for you 💝
        </h1>

        <p className="birthday-text">
          Every step before this led here —
          to celebrate <em>you</em> and the love you bring
          into my life 🤍
        </p>

        {/* ⬇️ SCROLL HINT */}
        <div
          style={{
            marginTop: "40px",
            fontSize: "0.75rem",
            letterSpacing: "2px",
            opacity: 0.6,
          }}
        >
          scroll gently ↓
        </div>
      </section>

      {/* 🖼️ GALLERY — CLEAN */}
      <section className="gallery-section fade-in">
        <h2 className="section-title">Our Memories 💞</h2>

        <p className="gallery-subtitle">
          Moments frozen in time, yet alive in my heart forever
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
              Love, written quietly <br /> while you sit in my lap 💞
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

      {/* 💌 LOVE LETTER */}
      <section className="letter-section fade-in">
        <div className="letter-card">
          <h2>My Love 💖</h2>

          <p>
            From the moment you walked into my life, nothing stayed the same.
            You became my calm in chaos, my home in every sense of the word.
          </p>

          <p>
            This gallery may hold memories,
            but my heart holds <em>you</em> —
            every smile, every tear, every piece of who you are.
          </p>

          <p>
            I never want a world where I don’t get to love you.
            Not in this lifetime, not in any other.
          </p>

          <p className="signature">
            — Yours, completely and endlessly 💕
          </p>
        </div>
      </section>

      {/* 🔁 REPLAY — SUBTLE, DELAYED */}
      {showReplay && (
        <div
          className="fade-in"
          style={{
            textAlign: "center",
            padding: "40px 0 80px",
          }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              letterSpacing: "1.5px",
              opacity: 0.65,
              marginBottom: "12px",
            }}
          >
            Want to relive it?
          </p>

          {/* 🔁 REPLAY — SOFT BUTTON */}
          {showReplay && (
            <div
              className="fade-in"
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "80px",
              }}
            >
              <button
                onClick={() => {
                  sessionStorage.clear();
                  window.location.href = "/";
                }}
                style={{
                  padding: "12px 28px",
                  borderRadius: "999px",
                  border: "1px solid rgba(122, 46, 74, 0.35)",
                  background: "rgba(255, 255, 255, 0.45)",
                  backdropFilter: "blur(10px)",
                  color: "#7a2e4a",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(122, 46, 74, 0.15)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 40px rgba(122, 46, 74, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(122, 46, 74, 0.15)";
                }}
              >
                Replay our journey 💕
              </button>
            </div>
          )}

        </div>
      )}
    </main>
  );
}
