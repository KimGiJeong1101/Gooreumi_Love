import React, { useEffect, useState } from "react";
import bgImages from "../assets/images";
import Footer from "./Footer";

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// ⭐ props로 speed, setSpeed를 받아와야 합니다.
const HomePage = ({ speed, setSpeed }) => {
  const [order, setOrder] = useState([]);
  const [position, setPosition] = useState(0);

  // ❌ 내부의 speed 상태 선언은 삭제해야 합니다 (props와 충돌 방지)

  useEffect(() => {
    const indexes = bgImages.map((_, i) => i);
    setOrder(shuffleArray(indexes));
  }, []);

  useEffect(() => {
    if (order.length === 0) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev + 1 >= order.length) return 0;
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [order, speed]);

  if (order.length === 0) return null;
  const currentImage = bgImages[order[position]];

  return (
    /* h-screen과 overflow-hidden을 제거하여 푸터가 보일 공간을 확보합니다 */
    <div className="w-full flex flex-col gap-6">
      {/* 이미지 영역: h-screen 대신 구체적인 높이(예: 70vh)를 주거나 유연하게 설정 */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden rounded-3xl shadow-lg bg-gray-100">
        {/* 배경 blur */}
        <img
          src={currentImage}
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 transition-all duration-1000"
          alt=""
        />

        {/* 메인 이미지 */}
        <img
          src={currentImage}
          className="relative w-full h-full object-contain animate-fade transition-all duration-1000"
          alt="구름이"
        />
      </div>

      {/* ⭐ 이제 이미지 아래에 자연스럽게 배치됩니다 */}
      <Footer speed={speed} setSpeed={setSpeed} />

      {/* 여백 확보용 */}
      <div className="h-10"></div>
    </div>
  );
};

export default HomePage;
