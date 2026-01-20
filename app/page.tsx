"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="intro">
      <h1 className="intro-title">
        Hello Misha <span>💖</span>
      </h1>

      <p className="intro-text">
        Let’s talk about you.
        <br />
        About the little things that make you…
        <br />
        <strong>so beautifully you.</strong>
      </p>

      <p className="intro-ready">ARE YOU READY?</p>

      <button
        className="intro-btn"
        onClick={() => router.push("/hair")}
      >
        Let’s begin ✨
      </button>
    </main>
  );
}
