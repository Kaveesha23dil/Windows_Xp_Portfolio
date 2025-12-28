import React, { useEffect } from 'react';


const XPWelcome = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3000); // Show for 3 seconds
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="h-screen w-screen bg-[#5A7EDC] flex flex-col items-center justify-center font-[Trebuchet MS] select-none text-white relative overflow-hidden">
            {/* Top/Bottom blue bars (darker) representing the letterbox effect often seen or just style */}
            <div className="absolute top-0 w-full h-[12vh] bg-[#003399] border-b-[#F46E02] border-b-2 shadow-md"></div>
            <div className="absolute bottom-0 w-full h-[12vh] bg-[#003399] border-t-[#F46E02] border-t-2 shadow-md"></div>

            {/* Content */}
            <div className="z-10 flex items-center gap-4 animate-fade-in">
                {/* Optional: Windows Logo transparent or just text */}
                {/* The user image shows just text "welcome" usually on the left or center. 
                     The classic XP Welcome screen actually has the user list. 
                     But the 'blue screen with welcome' is likely the boot phase or post-login.
                     We'll mimic the 'Welcome' text style closely. */}

                <div className="text-[4rem] italic font-semibold drop-shadow-md tracking-wide" style={{ textShadow: '2px 2px 5px rgba(0,0,0,0.3)' }}>
                    welcome
                </div>
            </div>

            {/* Gradient Overlay for that 'glossy' look */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
    );
};

export default XPWelcome;
