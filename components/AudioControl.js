import { useRef, useState } from "react";

export default function AudioControl() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = e.target.value;
  };

  const formatTime = (t) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="audio-player">
      <button onClick={togglePlay} className="audio-btn">
        {playing ? "❚❚" : "▶"}
      </button>

      <input
        type="range"
        className="audio-progress"
        min={0}
        max={duration || 0}
        step={1}
        value={progress}
        onChange={handleSeek}
      />

      <span className="audio-time">
        {formatTime(progress)} / {formatTime(duration)}
      </span>

      {/* audio file placed in /public/audio/ */}
      <audio
        ref={audioRef}
        src="/audio/synthwave.mp3"
        onTimeUpdate={handleTimeUpdate}
        preload="auto"
      />
    </div>
  );
}
