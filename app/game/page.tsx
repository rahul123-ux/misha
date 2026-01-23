"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* 🌸 Elegant romantic icons */
const icons = ["🤍", "🌸", "🌙", "🕊️", "✨", "🌹"];

type Card = {
    id: number;
    icon: string;
    flipped: boolean;
    matched: boolean;
};

export default function GamePage() {
    const router = useRouter();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [cards, setCards] = useState<Card[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matched, setMatched] = useState(0);

    const totalPairs = icons.length;
    const hasWon = matched === totalPairs;

    /* ========================= */
    /* 🎮 INIT GAME */
    /* ========================= */
    useEffect(() => {
        const shuffled = [...icons, ...icons]
            .sort(() => Math.random() - 0.5)
            .map((icon, i) => ({
                id: i,
                icon,
                flipped: false,
                matched: false,
            }));

        setCards(shuffled);
    }, []);

    /* ========================= */
    /* 🧠 MATCH LOGIC */
    /* ========================= */
    useEffect(() => {
        if (flipped.length !== 2) return;

        const [a, b] = flipped;
        const first = cards[a];
        const second = cards[b];

        if (first.icon === second.icon) {
            setCards((prev) =>
                prev.map((c, i) =>
                    i === a || i === b ? { ...c, matched: true } : c
                )
            );
            setMatched((m) => m + 1);
            setFlipped([]);
        } else {
            setTimeout(() => {
                setCards((prev) =>
                    prev.map((c, i) =>
                        i === a || i === b ? { ...c, flipped: false } : c
                    )
                );
                setFlipped([]);
            }, 650);
        }
    }, [flipped, cards]);

    /* ========================= */
    /* 🎵 PLAY MUSIC ON WIN */
    /* ========================= */
    useEffect(() => {
        if (hasWon && audioRef.current) {
            audioRef.current.volume = 0.35;
            audioRef.current.play().catch(() => { });
        }
    }, [hasWon]);

    /* ========================= */
    /* 🖱️ FLIP CARD */
    /* ========================= */
    const handleFlip = (index: number) => {
        if (
            hasWon ||
            flipped.length === 2 ||
            cards[index].flipped ||
            cards[index].matched
        )
            return;

        setCards((prev) =>
            prev.map((c, i) =>
                i === index ? { ...c, flipped: true } : c
            )
        );

        setFlipped((prev) => [...prev, index]);
        setMoves((m) => m + 1);
    };

    return (
        <main
            className="page-flow"
            style={{
                minHeight: "100svh",
                overflow: "hidden", // ✅ hard stop scroll
            }}
        >
            <section
                className="hero home-bg"
                style={{
                    minHeight: "100svh",
                    justifyContent: "center",
                }}
            >
                {/* 🌸 WIN STATE */}
                {hasWon && (
                    <>
                        <Petals />

                        <h2 className="birthday-title">
                            You did it, my love 💕
                        </h2>

                        <p className="hero-subtitle">
                            Every match felt like us —
                            finding each other again and again 🤍
                        </p>

                        <p
                            style={{
                                maxWidth: "420px",
                                margin: "16px auto 32px",
                                fontSize: "0.95rem",
                                opacity: 0.9,
                            }}
                        >
                            This was never about winning…
                            it was about sharing a quiet moment together 🌙
                        </p>

                        <button
                            className="button"
                            onClick={() => router.push("/music")}
                        >
                            Next ✨
                        </button>
                    </>
                )}

                {/* 🎮 GAME (AUTO-HIDES ON WIN) */}
                {!hasWon && (
                    <div
                        style={{
                            transform: "translateY(-32px)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",           // ✅ centers everything
                            width: "100%",
                        }}
                    >
                        <h1 className="hero-title">
                            Love Memory Match 💗
                        </h1>

                        <p className="hero-subtitle">
                            A little game… just for you 🤍
                        </p>

                        {/* STATUS */}
                        <div
                            style={{
                                display: "flex",
                                gap: "32px",
                                marginBottom: "20px",
                            }}
                        >
                            <div>
                                <strong>Moves</strong>
                                <div>{moves}</div>
                            </div>
                            <div>
                                <strong>Matched</strong>
                                <div>
                                    {matched}/{totalPairs}
                                </div>
                            </div>
                        </div>

                        {/* GAME GRID (NO SCROLL GUARANTEED) */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "14px",
                                width: "100%",
                                maxWidth: "280px",
                                margin: "0 auto",
                                opacity: hasWon ? 0 : 1,
                                transform: hasWon
                                    ? "scale(0.95)"
                                    : "scale(1)",
                                transition:
                                    "opacity 0.6s ease, transform 0.6s ease",
                            }}
                        >
                            {cards.map((card, i) => (
                                <button
                                    key={card.id}
                                    onClick={() => handleFlip(i)}
                                    style={{
                                        width: "100%",
                                        aspectRatio: "1 / 1", // 🔥 critical fix
                                        borderRadius: "20px",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "1.7rem",
                                        background:
                                            card.flipped || card.matched
                                                ? "rgba(255, 255, 255, 0.65)"
                                                : "linear-gradient(135deg, #ff8fb3, #ff5f9e)",
                                        backdropFilter: "blur(8px)",
                                        color: "#7a2e4a",
                                        boxShadow:
                                            card.flipped || card.matched
                                                ? "0 12px 30px rgba(122, 46, 74, 0.18)"
                                                : "0 10px 25px rgba(122, 46, 74, 0.28)",
                                        transition: "transform 0.25s ease",
                                        transform:
                                            card.flipped || card.matched
                                                ? "scale(1.05)"
                                                : "scale(1)",
                                    }}
                                >
                                    {card.flipped || card.matched ? card.icon : ""}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}

/* ========================= */
/* 🌸 PETALS */
function Petals() {
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                overflow: "hidden",
                zIndex: 6,
            }}
        >
            {Array.from({ length: 14 }).map((_, i) => (
                <span
                    key={i}
                    style={{
                        position: "absolute",
                        top: "-10%",
                        left: `${Math.random() * 100}%`,
                        fontSize: "1.2rem",
                        animation: `petalFall ${6 + Math.random() * 4}s linear infinite`,
                    }}
                >
                    🌸
                </span>
            ))}

            <style jsx>{`
        @keyframes petalFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}
