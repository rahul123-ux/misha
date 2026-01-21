"use client";

import { useRouter } from "next/navigation";
import { useMusicStore } from "../store/musicStore";

const songs = [
  {
    title: "Tu",
    subtitle: "I want you only 🤍",
    src: "/music/tu.mp3",
    color: "#ffe4ec",
  },
  {
    title: "Safar",
    subtitle: "Wanna have a life journey with you 🕊️",
    src: "/music/safar.mp3",
    color: "#e9f5ea",
  },
  {
    title: "Ishq",
    subtitle: "I am in love with you 💕",
    src: "/music/Ishq.mp3",
    color: "#f1ecff",
  },
];

export default function MusicPage() {
  const router = useRouter();
  const { play, pause, resume, stop, current, isPlaying } = useMusicStore();

  const handleToggle = (song, index) => {
    if (current === index && isPlaying) pause();
    else if (current === index && !isPlaying) resume();
    else play(song.src, index);
  };

  const currentSong = current !== null ? songs[current] : null;

  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* MAIN CONTENT */}
      <section
        className="hero home-bg"
        style={{
          flex: 1,
          justifyContent: "flex-start",
          paddingTop: "20px",
          paddingBottom: currentSong ? "140px" : "32px", // 👈 space for player
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "12px" }}>
          <h1 className="hero-title">Songs That Feel Like You 🎶</h1>
          <p
            className="hero-subtitle"
            style={{
              marginTop: "4px",
              marginBottom: "10px",
              fontSize: "0.9rem",
            }}
          >
            Some feelings don’t need words… they need music 🤍
          </p>
        </div>

        {/* SONG LIST */}
        <div
          style={{
            maxWidth: "360px",
            width: "100%",
            display: "grid",
            gap: "10px", // 👈 reduced spacing
            marginBottom: "24px",
          }}
        >
          {songs.map((song, i) => (
            <div
              key={song.title}
              style={{
                background: song.color,
                borderRadius: "18px",
                padding: "14px 16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 10px 26px rgba(122,46,74,0.18)",
                animation:
                  current === i && isPlaying ? "pulse 2s infinite" : "none",
              }}
            >
              <div>
                <strong style={{ color: "#7a2e4a" }}>{song.title}</strong>
                <p
                  style={{
                    fontSize: "0.75rem",
                    opacity: 0.75,
                    marginTop: "2px",
                  }}
                >
                  {song.subtitle}
                </p>
              </div>

              <button
                onClick={() => handleToggle(song, i)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "none",
                  background: "linear-gradient(135deg,#ff6fae,#ff3d7f)",
                  color: "white",
                  fontSize: "1.05rem",
                  cursor: "pointer",
                }}
              >
                {current === i && isPlaying ? "⏸" : "▶"}
              </button>
            </div>
          ))}
        </div>

        {/* NEXT BUTTON */}
        <button
          className="button"
          onClick={() => {
            // 💕 you can choose:
            // stop(); // ← uncomment if you want music to stop
            router.push("/why");
          }}
        >
          Next ✨
        </button>
      </section>

      {/* MINI MUSIC PLAYER (FIXED) */}
      {currentSong && (
        <div className="mini-player">
          <div className="mini-left">
            <div className={`heart ${isPlaying ? "beat" : ""}`}>💗</div>
            <div>
              <strong>{currentSong.title}</strong>
              <p>{currentSong.subtitle}</p>
            </div>
          </div>

          <div className={`equalizer ${isPlaying ? "active" : ""}`}>
            <span />
            <span />
            <span />
          </div>

          <div className="mini-controls">
            <button onClick={() => (isPlaying ? pause() : resume())}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button onClick={stop}>✖</button>
          </div>
        </div>
      )}
    </main>
  );
}
