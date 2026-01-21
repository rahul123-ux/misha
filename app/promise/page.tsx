"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const promises = [
    "I promise to choose you — not only on the easy days, but also when things feel heavy or unclear.",
    "I promise to listen, even when words feels uneasy.",
    "I promise to protect your heart the same way I protect my own — with care, patience, and honesty.",
    "I promise to grow with you, not ahead of you, not behind you, but beside you — always.",
    "And most of all, I promise to never leave you alone in any situation.",
];

export default function PromisePage() {
    const router = useRouter();
    const [visibleCount, setVisibleCount] = useState(0);

    /* 🌸 Reveal promises one by one */
    useEffect(() => {
        if (visibleCount < promises.length) {
            const t = setTimeout(
                () => setVisibleCount((v) => v + 1),
                900
            );
            return () => clearTimeout(t);
        }
    }, [visibleCount]);

    return (
        <main className="page-flow">
            <section className="hero home-bg fade-in">
                {/* 🌸 CONTENT */}
                <div style={{ textAlign: "center" }}>
                    <div className="emoji-stack">🤍 ✨ 🕊️</div>

                    <h1 className="birthday-title">
                        What I Promise You
                    </h1>

                    <p className="birthday-text" style={{ marginBottom: "12px" }}>
                        These aren’t big words or perfect lines —
                        just quiet promises from my heart to yours.
                    </p>

                    {/* ⬇️ SCROLL TO CONTINUE */}
                    <div
                        style={{
                            fontSize: "1rem",
                            letterSpacing: "2px",
                            color: "#7a2e4a",
                            opacity: 0.55,
                        }}
                    >
                        scroll to continue
                        <div
                            style={{
                                marginTop: "4px",
                                fontSize: "1rem",
                                animation: "scrollHint 1.8s infinite",
                            }}
                        >
                            ↓
                        </div>

                        <style jsx>{`
        @keyframes scrollHint {
          0% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(5px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
        }
      `}</style>
                    </div>
                </div>
            </section>


            {/* 💍 PROMISES */}
            <section className="letter-section">
                <div className="letter-card">
                    {promises.map((text, index) => (
                        <p
                            key={index}
                            style={{
                                opacity: index < visibleCount ? 1 : 0,
                                transform:
                                    index < visibleCount
                                        ? "translateY(0)"
                                        : "translateY(10px)",
                                transition:
                                    "opacity 0.8s ease, transform 0.8s ease",
                            }}
                        >
                            {text}
                        </p>
                    ))}

                    {/* 🤍 CONTINUE */}
                    {visibleCount >= promises.length && (
                        <div
                            style={{
                                textAlign: "center",
                                marginTop: "40px",
                            }}
                        >
                            <button
                                className="button"
                                onClick={() => router.push("/birthday")}
                            >
                                Continue 🤍
                            </button>
                        </div>
                    )}

                    {visibleCount >= promises.length && (
                        <p className="signature">
                            — With all my sincerity 🤍
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}
