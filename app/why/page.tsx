"use client";

import { useRouter } from "next/navigation";

const traits = [
  {
    title: "Genuine Heart",
    text: "You always care for me and say each and everything from your heart🤍",
    icon: "💗",
  },
  {
    title: "Same nature",
    text: "You are a zerox copy of me which gives me relief🌙",
    icon: "✨",
  },
  {
    title: "Beautiful Soul",
    text: "Your soul is very pure and gentle, you even help your enemies🌸",
    icon: "🕊️",
  },
];

export default function WhyPage() {
  const router = useRouter();

  return (
    <main style={{ minHeight: "100svh", overflow: "hidden" }}>
      <section className="hero home-bg">
        <h1 className="hero-title">Why You Matter 💖</h1>
        <p className="hero-subtitle">
          A glimpse into what makes you extraordinary to me
        </p>

        <div style={{ maxWidth: "420px", display: "grid", gap: "24px" }}>
          {traits.map((t) => (
            <div
              key={t.title}
              style={{
                background: "rgba(255,255,255,0.45)",
                borderRadius: "24px",
                padding: "26px",
                textAlign: "center",
                backdropFilter: "blur(10px)",
                boxShadow: "0 20px 50px rgba(122,46,74,0.18)",
              }}
            >
              <div style={{ fontSize: "1.6rem" }}>{t.icon}</div>
              <h3 style={{ margin: "10px 0", color: "#7a2e4a" }}>{t.title}</h3>
              <p style={{ fontSize: "0.9rem", opacity: 0.85 }}>{t.text}</p>
            </div>
          ))}
        </div>

        <button className="button" onClick={() => router.push("/thoughts")}>
          Next ✨
        </button>
      </section>
    </main>
  );
}
