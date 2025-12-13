import React, { useState, useEffect, useRef } from 'react';
import wallpaper from '../assets/windows_xp_original-wallpaper.jpg';
import xpIcon from '../assets/xp.png';
import StartMenu from './StartMenu';
import DesktopIcon from './DesktopIcon';
import XPWindow from './XPWindow';


export default function XPDesktop() {
    const [time, setTime] = useState(new Date());
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [activeWindows, setActiveWindows] = useState({});
    const startMenuRef = useRef(null);
    const startButtonRef = useRef(null);

    // Window Management
    const handleOpenWindow = (id, title, content) => {
        if (activeWindows[id]) {
            setActiveWindows(prev => ({
                ...prev,
                [id]: { ...prev[id], isOpen: true }
            }));
            return;
        }

        setActiveWindows(prev => ({
            ...prev,
            [id]: { title, content, isOpen: true }
        }));
    };

    const handleCloseWindow = (id) => {
        setActiveWindows(prev => {
            const newState = { ...prev };
            delete newState[id];
            return newState;
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isStartMenuOpen &&
                startMenuRef.current && !startMenuRef.current.contains(event.target) &&
                startButtonRef.current && !startButtonRef.current.contains(event.target)) {
                setIsStartMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isStartMenuOpen]);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/^0(?:0:0?)?/, '');
    };

    return (
        <div className="h-screen w-screen overflow-hidden relative select-none font-[Tahoma,Verdana,sans-serif]">
            {/* Background - Bliss Wallpaper */}
            <div
                className="absolute inset-0 bg-cover bg-center z-[-1]"
                style={{
                    backgroundImage: `url(${wallpaper})`,
                }}
            ></div>

            {/* Watermark Name */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <h1 className="text-white text-[150px] font-bold opacity-20 select-none tracking-widest uppercase font-[Georgia,serif] drop-shadow-xl"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    Kaveesha
                </h1>
            </div>

            {/* Desktop Icons Area */}
            <div className="flex flex-col flex-wrap h-[calc(100vh-30px)] content-start p-2 gap-2">
                {/* My Computer */}
                <DesktopIcon
                    label="My Computer"
                    icon="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png"
                    onClick={() => handleOpenWindow('my-computer', 'My Computer', <div className="p-4">Welcome to My Computer!</div>)}
                />

                {/* Recycle Bin */}
                <DesktopIcon
                    label="Recycle Bin"
                    icon="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png"
                    onClick={() => handleOpenWindow('recycle-bin', 'Recycle Bin', <div className="p-4">Recycle Bin is empty.</div>)}
                />

                {/* New Folder */}
                <DesktopIcon
                    label="New Folder"
                    icon="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png"
                    onClick={() => handleOpenWindow('new-folder', 'New Folder', <div className="p-4">This is a new folder.</div>)}
                />
            </div>

            {/* Windows Layer */}
            {Object.entries(activeWindows).map(([id, window]) => (
                <XPWindow
                    key={id}
                    title={window.title}
                    isOpen={window.isOpen}
                    onClose={() => handleCloseWindow(id)}
                >
                    {window.content}
                </XPWindow>
            ))}

            {/* Taskbar */}
            <div className="absolute bottom-0 w-full h-[30px] bg-gradient-to-b from-[#245DDA] via-[#1F3B9F] to-[#245DDA] flex items-center justify-between z-50 border-t-[2px] border-[#3E80ED]">

                {/* Left Side: Start Button & Menu */}
                <div className="h-full flex items-center relative">
                    <div ref={startMenuRef}>
                        <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
                    </div>

                    <div className="h-full flex items-center" ref={startButtonRef}>
                        <button
                            className={`h-full flex items-center gap-1 px-2 pr-4 bg-gradient-to-b from-[#3C8D42] to-[#245B28] rounded-r-[10px] hover:brightness-110 active:brightness-90 transition shadow-[2px_0_5px_rgba(0,0,0,0.5)] italic font-bold ${isStartMenuOpen ? 'brightness-90 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]' : ''}`}
                            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
                        >
                            <img src={xpIcon} alt="logo" className="w-5 h-5 drop-shadow-sm ml-1 italic" style={{ filter: 'brightness(200%) grayscale(100%)' }} />
                            {/* Note: The real logo is colored, but this is a quick SVG simulation or we use a proper asset if available. 
                        Better to use the xp.png we have but small. */}
                            <span className="text-white text-lg shadow-black drop-shadow-md" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>start</span>
                        </button>
                        <div className="w-[2px] h-[80%] bg-[#1A3689] mx-1 border-l border-[#4375CA]"></div>
                    </div>
                </div>

                {/* System Tray */}
                <div className="h-full bg-[#1291F2] border-l border-[#0D73C2] flex items-center px-3 shadow-[inset_1px_0_5px_rgba(0,0,0,0.2)]">
                    <div className="w-4 h-4 bg-white rounded-full mx-2 border border-[#0D73C2] shadow-sm flex items-center justify-center text-[10px] text-[#0D73C2]">
                        {/* Volume icon placeholder */}
                        V
                    </div>
                    <span className="text-white text-xs">{formatTime(time)}</span>
                </div>
            </div>

        </div>
    );
}
