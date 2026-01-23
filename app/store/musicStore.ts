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

let unlocked = false; // 🔓 iOS audio unlock flag

export const useMusicStore = create<MusicState>((set, get) => ({
  audio: null,
  current: null,
  isPlaying: false,

  play: async (src, index) => {
    let { audio } = get();

    if (!audio) {
      audio = new Audio();
      audio.preload = "auto";
    }

    // 🔓 iOS AUDIO UNLOCK (first interaction only)
    if (!unlocked) {
      try {
        audio.src = src;
        await audio.play();
        audio.pause();
        audio.currentTime = 0;
        unlocked = true;
      } catch {}
    }

    audio.pause();
    audio.src = src;
    audio.currentTime = 0;
    audio.loop = true;

    const playAudio = () => {
      audio!.play().catch(() => {});
      set({ isPlaying: true, current: index });
    };

    if (audio.readyState >= 3) {
      playAudio();
    } else {
      audio.oncanplaythrough = playAudio;
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
      audio.oncanplaythrough = null;
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
    }

    set({
      isPlaying: false,
      current: null,
    });
  },
}));
