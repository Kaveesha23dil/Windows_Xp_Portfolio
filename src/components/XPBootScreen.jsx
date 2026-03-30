import React, { useState, useEffect } from 'react';

const XPBootScreen = ({ onComplete }) => {
    const [bootPhase, setBootPhase] = useState(0); // 0: logo+text, 1: progress bar animating, 2: progress bar complete

    useEffect(() => {
        // Phase 1: Show logo and Microsoft text for ~1 second
        const phase1Timer = setTimeout(() => {
            setBootPhase(1);
        }, 1000);

        // Phase 2: Show progress bar animation for ~2 seconds
        const phase2Timer = setTimeout(() => {
            setBootPhase(2);
        }, 3000);

        // Complete boot and transition to desktop
        const completeTimer = setTimeout(() => {
            if (onComplete) {
                onComplete();
            }
        }, 3500);

        return () => {
            clearTimeout(phase1Timer);
            clearTimeout(phase2Timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center">
            {/* Windows XP Logo */}
            <div className="mb-8">
                <img
                    src="/xp.png"
                    alt="Windows XP"
                    className="w-32 h-32 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    onError={(e) => {
                        // Fallback SVG if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                {/* SVG fallback */}
                <div className="w-32 h-32 hidden items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <rect fill="#003399" x="10" y="20" width="80" height="60" rx="4"/>
                        <rect fill="#fff" x="20" y="30" width="20" height="10"/>
                        <rect fill="#fff" x="20" y="45" width="20" height="10"/>
                        <rect fill="#fff" x="20" y="60" width="20" height="10"/>
                        <rect fill="#fff" x="50" y="30" width="30" height="10"/>
                        <rect fill="#fff" x="50" y="45" width="30" height="10"/>
                        <rect fill="#fff" x="50" y="60" width="30" height="10"/>
                    </svg>
                </div>
            </div>

            {/* Microsoft Text */}
            <div className="text-white text-2xl font-light tracking-widest mb-12" style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}>
                Microsoft
            </div>

            {/* Classic XP Progress Bar */}
            {bootPhase >= 1 && (
                <div className="flex items-center gap-1">
                    {/* 12 rectangular blocks that animate */}
                    {Array.from({ length: 12 }).map((_, index) => {
                        const delay = index * 0.12; // Stagger animations
                        const isAnimating = bootPhase === 1;
                        const isComplete = bootPhase === 2;

                        return (
                            <div
                                key={index}
                                className="w-2 h-6 rounded-sm bg-[#003399]"
                                style={{
                                    animationDelay: isAnimating ? `${delay}s` : '0s',
                                    animation: isAnimating
                                        ? `progressBlock 1.4s ease-in-out infinite`
                                        : 'none',
                                    opacity: isComplete ? 1 : undefined
                                }}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default XPBootScreen;
