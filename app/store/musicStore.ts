import { create } from "zustand";

type MusicStore = {
  audio: HTMLAudioElement | null;
  current: number | null;
  isPlaying: boolean;

  play: (src: string, index: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

export const useMusicStore = create<MusicStore>((set, get) => ({
  audio: null,
  current: null,
  isPlaying: false,

  play: (src, index) => {
    const { audio } = get();

    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(src);
    newAudio.loop = true;
    newAudio.play();

    set({
      audio: newAudio,
      current: index,
      isPlaying: true,
    });
  },

  pause: () => {
    const { audio } = get();
    if (audio) audio.pause();
    set({ isPlaying: false });
  },

  resume: () => {
    const { audio } = get();
    if (audio) audio.play();
    set({ isPlaying: true });
  },

  stop: () => {
    const { audio } = get();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    set({ isPlaying: false, current: null });
  },
}));
