import React, { useEffect, useState } from "react";
import bgImages from "../assets/images";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * bgImages.length);
        } while (next === prev);
        return next;
      });
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="relative w-full h-screen">
        {/* 배경 blur */}
        <img
          src={bgImages[currentIndex]}
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
          alt=""
        />

        {/* 메인 이미지 */}
        <img
          src={bgImages[currentIndex]}
          className="relative w-full h-full object-contain animate-fade"
          alt=""
        />
      </div>
    </div>
  );
};

export default HomePage;
