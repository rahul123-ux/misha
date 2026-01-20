"use client";

import { useRouter } from "next/navigation";

export default function CatPageWrapper({
  image,
  title,
  nextRoute,
  buttonText = "Click 💕",
}) {
  const router = useRouter();

  return (
    <div className="fullscreen bg-soft">
      <img src={image} width={260} alt="cat" />
      <h1 className="title">{title}</h1>

      <button
        className="button"
        onClick={() => router.push(nextRoute)}
      >
        {buttonText}
      </button>
    </div>
  );
}
