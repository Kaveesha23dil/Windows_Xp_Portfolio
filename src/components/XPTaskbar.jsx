import React, { useState, useEffect } from 'react';

const XPTaskbar = ({
    activeWindows,
    onWindowClick,
    startMenuOpen,
    onStartMenuToggle
}) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showClockTooltip, setShowClockTooltip] = useState(false);
    const [showNotification, setShowNotification] = useState(() => {
        // Show notification only once per session
        const shown = sessionStorage.getItem('skills-notification-shown');
        if (!shown) {
            sessionStorage.setItem('skills-notification-shown', 'true');
            return true;
        }
        return false;
    });

    // Update clock every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString([], {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatShortDate = (date) => {
        return date.toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Dismiss notification after a few seconds
    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    // Get window icon based on window content type
    const getWindowIcon = (windowId) => {
        const iconMap = {
            'my-computer': '/icons/my-computer.png',
            'paint': '/icons/paint.png',
            'cmd': '/icons/cmd.png',
            'about-me': '/icons/folder-open.png',
            'my-projects': '/icons/folder.png',
            'skills': '/icons/cmd.png',
            'resume': '/icons/notepad.png',
            'contact': '/icons/outlook.png',
            'default': '/icons/folder.png'
        };
        return iconMap[windowId] || iconMap.default;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 h-[30px] bg-gradient-to-b from-[#245DDA] via-[#1F3B9F] to-[#245DDA] flex items-center justify-between z-50 border-t-2 border-[#3E80ED] font-[Tahoma,Verdana,sans-serif] select-none">
            {/* Left Side: Start Button and Window Tabs */}
            <div className="h-full flex items-center">
                {/* Start Button */}
                <div className="h-full flex items-center relative">
                    <button
                        id="start-button"
                        className={`h-full flex items-center gap-1 px-2 pr-4 bg-gradient-to-b from-[#3C8D42] to-[#245B28] rounded-r-[10px] hover:brightness-110 active:brightness-90 transition shadow-[2px_0_5px_rgba(0,0,0,0.5)] italic font-bold ${startMenuOpen ? 'brightness-90 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]' : ''}`}
                        onClick={onStartMenuToggle}
                        title="Start"
                    >
                        <img
                            src="/xp.png"
                            alt="Windows"
                            className="w-5 h-5 drop-shadow-sm ml-1 italic"
                            style={{ filter: 'brightness(200%) grayscale(100%)' }}
                            onError={(e) => {
                                // Fallback green square if logo fails
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'inline-block';
                            }}
                        />
                        {/* SVG fallback for Windows logo */}
                        <span className="hidden w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-sm shadow-sm border border-white/30"></span>
                        <span className="text-white text-lg shadow-black drop-shadow-md leading-none" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>start</span>
                    </button>
                    <div className="w-[2px] h-[80%] bg-[#1A3689] mx-1 border-l border-[#4375CA]"></div>
                </div>

                {/* Window Tabs */}
                <div className="flex items-center gap-1 pl-1 overflow-x-auto max-w-[60vw]">
                    {Object.values(activeWindows).map((window, index) => {
                        const isMinimized = window.isMinimized;
                        const isActive = !isMinimized;

                        return (
                            <button
                                key={index}
                                onClick={() => onWindowClick(index)}
                                className={`w-[160px] h-[22px] flex items-center px-2 text-white text-xs text-left truncate rounded-[2px] gap-1 transition-all ${
                                    isActive
                                        ? 'bg-[#1F3B9F] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] border border-[#162C7A] bg-opacity-80'
                                        : 'bg-[#3C81F3] hover:bg-[#5FA3F8] shadow-[1px_1px_0_rgba(255,255,255,0.2)] border border-[#162C7A]'
                                }`}
                                title={isMinimized ? 'Restore' : 'Minimize'}
                            >
                                <img
                                    src={getWindowIcon(window.id || window.key || 'default')}
                                    alt=""
                                    className="w-4 h-4 object-contain drop-shadow-sm"
                                    onError={(e) => {
                                        // Hide icon if it fails to load
                                        e.target.style.display = 'none';
                                    }}
                                />
                                <span className="truncate w-full">{window.title}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Right Side: System Tray */}
            <div className="h-full bg-[#1291F2] border-l border-[#0D73C2] flex items-center px-2 shadow-[inset_1px_0_5px_rgba(0,0,0,0.2)] gap-2">

                {/* Notification Bubble */}
                {showNotification && (
                    <div className="relative">
                        <div className="bg-[#FFE87C] border-2 border-[#8B7D6B] rounded-lg p-2 shadow-lg max-w-[200px] animate-bounce-slow">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1 animate-pulse"></div>
                                <div>
                                    <div className="text-xs font-bold text-gray-800">System Notice</div>
                                    <div className="text-xs text-gray-700">Your skills are loading...</div>
                                </div>
                                <button
                                    className="text-gray-500 hover:text-gray-700 ml-2"
                                    onClick={() => setShowNotification(false)}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        {/* Notification arrow */}
                        <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#8B7D6B] transform -translate-x-1/2"></div>
                    </div>
                )}

                {/* Volume Icon */}
                <div
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center border border-[#0D73C2] shadow-sm cursor-pointer hover:brightness-90"
                    title="Volume"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="#0D73C2"/>
                        <path d="M15.54 8.46C16.4774 9.39765 17.004 10.6692 17.004 12.0001C17.004 13.3309 16.4774 14.6026 15.54 15.5391M19.0718 10.9282C19.2835 11.1399 19.3515 11.4509 19.2618 11.7396L17.6169 15.4447C17.2987 16.0571 16.7447 16.4923 16.0737 16.6498L12.5648 17.7358C11.8977 17.8887 11.2967 17.5501 11.1437 16.883L10.0477 12.178C9.92417 11.5967 10.2442 11.0906 10.8255 10.9671L14.3344 10.1378C14.9157 10.0143 15.4217 10.3343 15.5352 10.9166L15.5352 10.9166M12.0002 16C10.3431 16 9.00021 14.6571 9.00021 13C9.00021 11.3429 10.3431 10 12.0002 10C13.6573 10 15.0002 11.3429 15.0002 13C15.0002 14.6571 13.6573 16 12.0002 16Z"
                              stroke="#0D73C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                {/* Network Icon */}
                <div
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center border border-[#0D73C2] shadow-sm cursor-pointer hover:brightness-90"
                    title="Network"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12Z" fill="#0D73C2"/>
                        <path d="M4 12H20" stroke="#0D73C2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 4V12" stroke="#0D73C2" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 12V20" stroke="#0D73C2" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>

                {/* Clock */}
                <div
                    className="h-6 px-2 flex items-center justify-center border-l border-[#0D73C2] cursor-pointer hover:bg-[#0D73C2]/20 transition-colors"
                    onMouseEnter={() => setShowClockTooltip(true)}
                    onMouseLeave={() => setShowClockTooltip(false)}
                >
                    <span className="text-white text-xs drop-shadow-sm leading-none">
                        {formatTime(currentTime)}
                    </span>

                    {/* Clock Tooltip */}
                    {showClockTooltip && (
                        <div className="absolute bottom-full right-0 mb-2 bg-white border-2 border-[#0A41C4] shadow-[4px_4px_10px_rgba(0,0,0,0.5)] rounded p-2 z-50">
                            <div className="text-sm font-bold text-[#0A41C4]">{formatDate(currentTime)}</div>
                            <div className="text-xs text-gray-600">{formatShortDate(currentTime)}</div>
                            {/* Tooltip arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Simple Volume Control Popup (optional enhancement)
const VolumePopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed bottom-8 right-2 bg-white border-4 border-[#0A41C4] shadow-[4px_4px_10px_rgba(0,0,0,0.6)] rounded p-4 z-50 w-48">
            <div className="text-sm font-bold text-[#0A41C4] mb-2">Volume</div>
            <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                className="w-full accent-[#003399]"
            />
            <div className="flex justify-between text-xs mt-1">
                <span>0</span>
                <span>100</span>
            </div>
        </div>
    );
};

export default XPTaskbar;
