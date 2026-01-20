"use client"
import CatPageWrapper from "@/components/CatPageWrapper";

export default function Cat1() {
  return (
    <CatPageWrapper
      image="/cat1.gif"
      title="Meow… who are you? 😼"
      nextRoute="/cat2"
      buttonText="Start the journey 🐾"
    />
  );
}
