import React from "react";

const XPLoading = () => {
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-6">
        <img src="src/assets/xp.png" alt="Windows Logo" className="w-12" />
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Windows <span className="text-orange-400">XP</span>
          </h1>
          <p className="text-sm text-gray-300">Kaveesha Protfilio</p>
        </div>
      </div>

      {/* Loading bar */}
      <div className="w-[190px] h-[17px] bg-[#1a1a1a] border border-gray-600 rounded-md overflow-hidden relative shadow-[0_0_8px_#000]">

        {/* 3 Squares Moving Together */}
        <div className="absolute top-[2px] w-[15px] h-[13px] bg-[#0a3cff] animate-xp-square rounded-sm left-[0px]"></div>
        <div className="absolute top-[2px] w-[15px] h-[13px] bg-[#0a3cff] animate-xp-square rounded-sm left-[20px]"></div>
        <div className="absolute top-[2px] w-[15px] h-[13px] bg-[#0a3cff] animate-xp-square rounded-sm left-[40px]"></div>

      </div>

      {/* Footer */}
      <p className="text-xs text-gray-500 absolute bottom-5">
        © Kaveesha Dilshan
      </p>
    </div>
  );
};

export default XPLoading;
