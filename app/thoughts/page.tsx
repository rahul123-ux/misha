"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

  /* ===== Preload polaroids early ===== */
  useEffect(() => {
    polaroidImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  /* ===== Text Scroll Ref ===== */
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) textRef.current.scrollTop = 0;
  }, [index]);

  /* ================= POLAROID PAGE ================= */

  if (mode === "polaroid") {
    return (
      <main className="polaroid-root fade">
        <h1>Some of your moments 🤍</h1>
        <p className="subtitle">Little memories, softly pressed into time.</p>

        <div className="polaroid-grid">
          {polaroidImages.map((img, i) => (
            <div key={i} className="polaroid romantic">
              <Image
                src={img}
                alt="polaroid"
                width={300}
                height={380}
                priority
                className="polaroid-img"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        <button className="next-btn" onClick={() => router.push("/promise")}>
          Continue ✨
        </button>
      </main>
    );
  }

  /* ================= MEMORY READER ================= */

  return (
    <main className="memory-page fade">
      <div className="memory-image-box">
        <Image
          src={memories[index].img}
          alt="memory"
          width={400}
          height={520}
          priority
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </div>

      <div className="memory-text-scroll" ref={textRef}>
        <p>{memories[index].text}</p>
      </div>

      <div className="memory-controls">
        <button onClick={() => setIndex((i) => Math.max(i - 1, 0))} disabled={index === 0}>
          ⬅ Back
        </button>

        {index === memories.length - 1 ? (
          <button onClick={() => setMode("polaroid")}>View memories 📸</button>
        ) : (
          <button onClick={() => setIndex((i) => Math.min(i + 1, memories.length - 1))}>
            Next ➜
          </button>
        )}
      </div>
    </main>
  );
}
