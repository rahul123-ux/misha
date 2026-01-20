"use client";

import { useRouter } from "next/navigation";

export default function CatPageWrapper({
  image,
  title,
  subtitle,
  nextRoute,
  buttonText = "Continue 💕",
}) {
  const router = useRouter();

  return (
    <div className="fullscreen bg-soft">
      <img src={image} width={260} alt="feature" />

      <h1 className="title">{title}</h1>

      {/* 👇 Subtitle (only shows if provided) */}
      {subtitle && (
        <p className="subtitle">
          {subtitle}
        </p>
      )}

      {/* 👇 Hint text */}
      <p className="hint-text">To know more</p>

      <button
        className="button"
        onClick={() => router.push(nextRoute)}
      >
        {buttonText}
      </button>
    </div>
  );
}
