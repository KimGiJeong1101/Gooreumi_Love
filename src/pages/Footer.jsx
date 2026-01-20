import { Timer } from "lucide-react";

const Footer = ({ speed, setSpeed }) => {
  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-sm flex flex-col items-center gap-5">
      {/* 1 & 2. 설명 영역 (상단 배치 + 한글화) */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 text-gray-500">
          <h2 className="text-base md:text-lg font-bold text-gray-600 flex items-center gap-1.5">
            <span>새로운 구름이</span>

            {/* 포인트: 텍스트 크기를 살짝만 키우고(xl) 색상을 진한 블루로 강조 */}
            <span className="text-xl md:text-2xl font-black text-blue-500 drop-shadow-[0_1px_1px_rgba(59,130,246,0.2)]">
              {(speed / 1000).toFixed(1)}초
            </span>

            <span>마다 보기</span>
          </h2>
        </div>
      </div>

      {/* 3. 조절바 영역 (하단 배치) */}
      <div className="w-full flex items-center gap-4 px-2">
        <span className="text-xs font-black text-blue-400">빠르게</span>
        <div className="relative flex-1 flex items-center">
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="
              w-full h-2.5 bg-blue-100 rounded-full appearance-none cursor-pointer 
              accent-blue-600 hover:accent-blue-700 transition-all
            "
          />
        </div>
        <span className="text-xs font-black text-blue-600">천천히</span>
      </div>
    </div>
  );
};

export default Footer;
