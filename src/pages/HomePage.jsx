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
    }, 5000); // 5초마다

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-8 min-h-screen">
      <div className="w-full min-h-screen relative overflow-hidden">
        <img
          key={currentIndex} // 이미지 변경 시 fade 적용
          src={bgImages[currentIndex]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-fade"
        />
      </div>
    </div>
  );
};

export default HomePage;
