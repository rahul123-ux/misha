"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ================= MEMORY DATA ================= */

const memories = [
  {
    img: "/m.jpeg",
    text:
      "On our this meet, I was waiting. Then you came riding a scooty with your friend Tejasvini. I called you and asked you to come towards me, so you came. Then we went down, and there was soil there, so we sat there anyway. After that, you were very shy. We talked a lot there, and I gave you a gift. You opened it right there. Then you were about to go, but I said, “Stay here, let’s take a photo,” and then we clicked this hand-holding photo.",
  },
  {
    img: "/s.jpeg",
    text:
      "On our this meet, I was with my brothers, and I was waiting for you. Then you came with your friend Ridhima. At first, we just stood there where my brothers were. After that, we went to our usual place. We sat there and talked for a while, and then I gave you the ring. You were very happy. Then someone came there, so we moved to the place where the brothers were standing. When we reached there, we took our first full photo, which was clicked by my brother. After that, we took the ring photo as well—the one that has been uploaded.",
  },
  {
    img: "/love.jpeg",
    text:
      "On our this meet, first we went to the gurudwara and then we went to the nature park. Then you fed me white sauce pasta with your own hands. After that, someone came there, so we went out for a ride. At first, we were on separate scooties, and then we rode on the same one. I was riding the scooty, and in between, you were riding the scooty, and during all this, we reached a really amazing location. We enjoyed a lot there and clicked many photos. The one that has been uploaded is also from that place.",
  },
  {
    img: "/she.jpeg",
    text:
      "On our this meet, I was coming to Ropar to buy clothes for Preet, and I also wanted to get a few things for myself. Then I called you and asked if you would come, and you said yes. After that, we went to Zudio. I waited for you outside for a while, and then you arrived. We went inside together. Preet didn’t really know how to choose clothes and kept getting confused, so she was making us mad again and again by asking what to pick. Then I teased you a little too. After we selected clothes for Preet, we clicked some photos, and one of those is the photo that has been uploaded.",
  },
];

/* ================= POLAROID DATA ================= */

const polaroidImages = ["/p3.jpeg", "/p2.jpeg", "/p7.jpeg", "/p8.jpeg"];

export default function ThoughtsPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"reader" | "polaroid">("reader");
  const [index, setIndex] = useState(0);
  const [polaroidsReady, setPolaroidsReady] = useState(false);

  const textRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef(0);

  /* ================= PRELOAD POLAROIDS ================= */

  useEffect(() => {
    let loaded = 0;
    polaroidImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === polaroidImages.length) {
          setPolaroidsReady(true);
        }
      };
    });
  }, []);

  /* ================= RESET TEXT SCROLL ================= */

  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = 0;
    }
  }, [index]);

  /* ================= SWIPE SUPPORT ================= */

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 60 && index < memories.length - 1) {
      setIndex((i) => i + 1);
    }

    if (diff < -60 && index > 0) {
      setIndex((i) => i - 1);
    }
  };

  /* ================= POLAROID PAGE ================= */

  if (mode === "polaroid") {
    return (
      <main className="polaroid-root fade">
        <h1>Some of your moments 🤍</h1>
        <p className="subtitle">Little memories, softly pressed into time.</p>

        {!polaroidsReady && <div className="polaroid-loader" />}

        {polaroidsReady && (
          <div className="polaroid-grid fade-in">
            {polaroidImages.map((img, i) => (
              <div key={i} className="polaroid romantic">
                <img src={img} alt="polaroid" />
              </div>
            ))}
          </div>
        )}

        <button className="next-btn" onClick={() => router.push("/promise")}>
          Continue ✨
        </button>
      </main>
    );
  }

  /* ================= MEMORY READER ================= */

  return (
    <main
      className="memory-page fade"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* IMAGE */}
      {/* IMAGE */}
<div className="memory-image-box">
  {/* FLOATING HEARTS & BUTTERFLIES */}
  <div className="floating-container">
    {Array.from({ length: 8 }).map((_, i) => (
      <span
        key={i}
        className={`floating ${i % 2 === 0 ? "heart" : "butterfly"}`}
        style={{
          left: `${Math.random() * 100}%`,
          fontSize: `${14 + Math.random() * 10}px`,
          animationDuration: `${14 + Math.random() * 6}s`,
        }}
      >
        {i % 2 === 0 ? "🤍" : "🦋"}
      </span>
    ))}
  </div>

  {/* MEMORY IMAGE (smooth fade) */}
  <img
    key={memories[index].img}
    src={memories[index].img}
    alt="memory"
    className="memory-fade"
  />
</div>


      {/* TEXT */}
      <div className="memory-text-scroll" ref={textRef}>
        <p>{memories[index].text}</p>
      </div>

      {/* CONTROLS */}
      <div className="memory-controls">
        <button
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          ⬅ Back
        </button>

        {index === memories.length - 1 ? (
          <button onClick={() => setMode("polaroid")}>
            View memories 📸
          </button>
        ) : (
          <button onClick={() => setIndex((i) => i + 1)}>
            Next ➜
          </button>
        )}
      </div>
    </main>
  );
}
