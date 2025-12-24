import React, { useState } from 'react';
import xpLogo from '../assets/xp.png'; // Assuming this exists, based on previous code

export default function WindowsXPLogin({ onLogin }) {
  const [hoveredUser, setHoveredUser] = useState(null);

  const users = [
    { name: 'Kaveesha', iconColor: 'orange' },
    { name: 'Guest', iconColor: 'blue' }
  ];

  const handleUserClick = () => {
    if (onLogin) {
      onLogin(); // Trigger login state change
    }
  };

  return (
    <div className="h-screen w-full bg-[#5A7EDC] flex flex-col items-center justify-between font-[Trebuchet MS] overflow-hidden select-none">

      {/* Top Decoration */}
      <div className="w-full h-[12vh] bg-[#003399] border-b-[#F46E02] border-b-2 shadow-md shrink-0 relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-xl pointer-events-none"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex items-center justify-center relative">
        <div className="w-full max-w-4xl flex items-center gap-0">

          {/* Left Side: Logo & Instructions */}
          <div className="flex-1 flex flex-col items-end pr-8 py-8 text-right space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <img src={xpLogo} alt="Windows XP" className="w-24 h-24 object-contain drop-shadow-lg" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-white font-bold text-5xl drop-shadow-md" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Windows</span>
                <span className="text-[#FF6600] font-bold text-5xl italic drop-shadow-md -mt-1" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)', fontFamily: "Arial" }}>xp</span>
              </div>
            </div>
            <div className="bg-gradient-to-l from-white/0 via-white/20 to-white/0 w-64 h-[1px] my-2"></div>
            <p className="text-white text-xl font-medium drop-shadow-md w-64 leading-tight">
              To begin, click your user name
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="h-64 w-[2px] bg-gradient-to-b from-transparent via-white/50 to-transparent mx-4 shadow-[0_0_4px_rgba(255,255,255,0.5)]"></div>

          {/* Right Side: Users List */}
          <div className="flex-1 flex flex-col items-start pl-8 space-y-4 min-h-[300px] justify-center">
            {users.map((user, index) => (
              <div
                key={index}
                onClick={handleUserClick}
                className={`group flex items-center gap-4 p-2 pl-4 rounded-lg transition-all duration-200 cursor-pointer w-72 border-2 ${hoveredUser === index ? 'bg-[#315BB6]/50 border-[#Fcb63d]/80' : 'bg-transparent border-transparent'}`}
                onMouseEnter={() => setHoveredUser(index)}
                onMouseLeave={() => setHoveredUser(null)}
              >
                {/* User Icon Frame */}
                <div className={`w-16 h-16 rounded-[4px] border-2 border-white/60 bg-${user.iconColor}-400 shadow-md relative overflow-hidden flex items-center justify-center group-hover:border-[#Fcb63d]`}>
                  {user.name === 'Kaveesha' ? (
                    <img src="/profile.jpeg" alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-black/10"></div>
                      <svg viewBox="0 0 24 24" className="w-10 h-10 text-white drop-shadow-sm opacity-90" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </>
                  )}
                </div>

                {/* Username */}
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-normal drop-shadow-md group-hover:text-white/100">{user.name}</span>
                  {hoveredUser === index && (
                    <span className="text-[#E0E0E0] text-sm animate-pulse">Type your password</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-[12vh] bg-[#003399] border-t-[#F46E02] border-t-2 flex items-center justify-between px-8 shrink-0 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-xl pointer-events-none"></div>

        {/* Turn Off Button */}
        <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#E2532E] to-[#CD3628] border border-white/40 flex items-center justify-center shadow-lg group-hover:brightness-110">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <span className="text-white font-medium text-lg drop-shadow-md">Turn off computer</span>
        </button>

        {/* Footer Info */}
        <div className="flex flex-col items-end">
          <span className="text-white/60 text-sm hover:text-white/90 cursor-help transition-colors">After you log on, you can add or change accounts.</span>
          <span className="text-white/60 text-sm hover:text-white/90 cursor-help transition-colors">Just go to Control Panel and click User Accounts.</span>
        </div>
      </div>
    </div>
  );
}