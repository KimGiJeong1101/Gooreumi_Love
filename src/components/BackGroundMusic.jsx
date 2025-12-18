import { useRef, useState } from "react";

const BackGroundMusic = () => {
  const audioRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // ⭐ 추가

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1);

  // 🔹 시작 버튼 클릭 (사용자 제스처)
  const handleStart = () => {
    // 음악 시작
    audioRef.current.muted = false;
    audioRef.current.volume = volume;
    audioRef.current.play();
    setIsPlaying(true);

    // 화면 페이드 아웃 시작
    setStarted(true);

    // 트랜지션 끝나면 제거
    setTimeout(() => {
      setShowIntro(false);
    }, 2300); // transition 시간과 동일
  };

  // 🔹 재생
  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  // 🔹 일시정지
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // 🔹 정지
  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false); // ⭐ 이 줄이 핵심
  };

  // 🔹 볼륨 조절
  const handleVolumeChange = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    audioRef.current.volume = v;
  };

  return (
    <>
      {/* ▶ 시작 화면 */}
      {showIntro && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,

            opacity: started ? 0 : 1,
            transition: "opacity 2.3s ease",
            pointerEvents: started ? "none" : "auto",
          }}
        >
          <button
            onClick={handleStart}
            style={{
              fontSize: "18px",
              padding: "12px 24px",
              cursor: "pointer",
            }}
          >
            ▶ 사이트 시작
          </button>
        </div>
      )}

      {/* ▶ 음악 컨트롤 (오른쪽 상단) */}
      {started && (
        <div
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 14px",
            background: "rgba(0, 0, 0, 0.6)",
            borderRadius: "8px",
            zIndex: 1000,
          }}
        >
          {/* 버튼 영역 */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {!isPlaying && <button onClick={handlePlay}>▶</button>}

            {isPlaying && <button onClick={handlePause}>⏸</button>}

            <button onClick={handleStop}>⏹</button>
          </div>

          {/* 볼륨 */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            style={{ width: "80px" }}
          />
        </div>
      )}

      {/* ▶ 오디오 */}
      <audio ref={audioRef} src="/Gooreumi_Love.mp3" loop />
    </>
  );
};

// 버튼 공통 스타일
const buttonStyle = {
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
};

export default BackGroundMusic;
