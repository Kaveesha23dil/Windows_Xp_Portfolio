import React from "react";
import xpLogo from "../assets/xp.png";

const XPLoading = () => {
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center relative font-sans select-none cursor-wait">

      {/* Main Container */}
      <div className="flex flex-col items-center w-[300px]">

        {/* Logo Section */}
        <div className="flex items-center justify-center gap-4 mb-16 relative">
          <div className="absolute -top-6 text-white/50 text-xs tracking-wider">Microsoft</div>
          {/* Windows Logo */}
          <div className="w-20 h-20">
            <img src={xpLogo} alt="Windows Logo" className="w-full h-full object-contain" />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center h-20">
            <div className="text-white text-5xl font-bold tracking-tighter leading-none relative top-1">
              Windows
              <span className="text-[#FF6600] text-3xl italic absolute -top-1 -right-8 font-normal" style={{ fontFamily: 'Arial' }}>xp</span>
            </div>
          </div>
        </div>

        {/* Loading Bar Container */}
        <div className="w-full h-[14px] border-[1px] border-[#555] rounded-[3px] p-[2px] relative overflow-hidden bg-black mt-4">
          {/* The Moving Blue Chunks */}
          <div className="flex gap-[2px] absolute top-[2px] animate-xp-bar w-[60px]">
            <div className="w-[18px] h-[8px] bg-gradient-to-b from-[#6D91E5] via-[#2F4F9F] to-[#203975] rounded-[1px] shadow-[0_0_2px_rgba(47,79,159,0.8)]"></div>
            <div className="w-[18px] h-[8px] bg-gradient-to-b from-[#6D91E5] via-[#2F4F9F] to-[#203975] rounded-[1px] shadow-[0_0_2px_rgba(47,79,159,0.8)]"></div>
            <div className="w-[18px] h-[8px] bg-gradient-to-b from-[#6D91E5] via-[#2F4F9F] to-[#203975] rounded-[1px] shadow-[0_0_2px_rgba(47,79,159,0.8)]"></div>
          </div>
        </div>

      </div>

      {/* Footer Copyright */}
      <div className="absolute bottom-8 flex items-center justify-between w-full px-8">
        <div className="text-white/60 text-xs">
          Copyright © Kaveesha Dilshan
        </div>
        <div className="text-white/60 font-bold text-xs italic tracking-widest">
          Kaveesha Dilshan
        </div>
      </div>

    </div>
  );
};

export default XPLoading;
