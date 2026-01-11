import React, { useEffect, useState } from "react";
import bgImages from "../assets/images";

// 배열 셔플 함수
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const HomePage = () => {
  const [order, setOrder] = useState([]); // 섞인 인덱스 순서
  const [position, setPosition] = useState(0); // 현재 위치

  // 최초 사이클 생성
  useEffect(() => {
    const indexes = bgImages.map((_, i) => i);
    setOrder(shuffleArray(indexes));
  }, []);

  // 6.5초마다 이미지 변경
  useEffect(() => {
    if (order.length === 0) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        // 한 사이클 끝 → 다시 셔플
        if (prev + 1 >= order.length) {
          const indexes = bgImages.map((_, i) => i);
          setOrder(shuffleArray(indexes));
          return 0;
        }
        return prev + 1;
      });
    }, 6500);

    return () => clearInterval(interval);
  }, [order]);

  if (order.length === 0) return null;

  const currentImage = bgImages[order[position]];

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="relative w-full h-screen">
        {/* 배경 blur */}
        <img
          src={currentImage}
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
          alt=""
        />

        {/* 메인 이미지 */}
        <img
          src={currentImage}
          className="relative w-full h-full object-contain animate-fade"
          alt=""
        />
      </div>
    </div>
  );
};

export default HomePage;
