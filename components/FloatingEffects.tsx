"use client";

import { useEffect, useState } from "react";

type Item = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  type: "heart" | "butterfly";
};

export default function FloatingEffects({ active }: { active: boolean }) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (!active) {
      setItems([]);
      return;
    }

    const generated: Item[] = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 12 + 14, // ✅ smaller
      delay: Math.random() * 4,
      duration: Math.random() * 10 + 12,
      type: Math.random() > 0.5 ? "heart" : "butterfly",
    }));

    setItems(generated);
  }, [active]);

  if (!active) return null;

  return (
    <div className="floating-container">
      {items.map((item) => (
        <span
          key={item.id}
          className={`floating ${item.type}`}
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.type === "heart" ? "❤️" : "🦋"}
        </span>
      ))}
    </div>
  );
}
