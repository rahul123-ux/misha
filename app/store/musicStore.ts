import { create } from "zustand";

interface MusicState {
  audio: HTMLAudioElement | null;
  current: number | null;
  isPlaying: boolean;

  play: (src: string, index: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  audio: null,
  current: null,
  isPlaying: false,

  play: (src, index) => {
    let { audio } = get();

    // 🎧 create audio only once
    if (!audio) {
      audio = new Audio();
      audio.preload = "auto";
    }

    // ⛔ stop previous
    audio.pause();
    audio.src = src;
    audio.currentTime = 0;
    audio.loop = true;

    // 🚀 play when ready (reduces delay)
    const playAudio = () => {
      audio!.play().catch(() => {});
      set({ isPlaying: true, current: index });
    };

    if (audio.readyState >= 3) {
      playAudio();
    } else {
      audio.oncanplay = playAudio;
      audio.load();
    }

    set({ audio });
  },

  pause: () => {
    const { audio } = get();
    audio?.pause();
    set({ isPlaying: false });
  },

  resume: () => {
    const { audio } = get();
    audio?.play().catch(() => {});
    set({ isPlaying: true });
  },

 stop: () => {
  const { audio } = get();

  if (audio) {
    audio.oncanplay = null;   // 🔥 cancel pending play
    audio.pause();
    audio.currentTime = 0;
    audio.loop = false;
  }

  set({
    isPlaying: false,
    current: null,           // ✅ hides mini player
  });
},
}));
