import React, { useState, useEffect, useRef } from 'react';

const StartMenu = ({ isOpen, onClose, onOpenWindow, onLogOff, onTurnOff }) => {
    const [showAllPrograms, setShowAllPrograms] = useState(false);
    const [showShutdownDialog, setShowShutdownDialog] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                const startButton = document.getElementById('start-button');
                if (startButton && !startButton.contains(event.target)) {
                    onClose();
                }
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleAllProgramsEnter = () => setShowAllPrograms(true);
    const handleAllProgramsLeave = () => setShowAllPrograms(false);

    const handleNavigationClick = (route, id) => {
        if (onOpenWindow) {
            onOpenWindow(id, route, null);
            onClose();
        }
    };

    const handleShutdownOption = (option) => {
        setShowShutdownDialog(false);
        if (onTurnOff) {
            onTurnOff(option);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Start Menu */}
            <div ref={menuRef} className="absolute bottom-[30px] left-0 w-[400px] h-[520px] bg-[#245DDA] rounded-t-lg shadow-[4px_4px_10px_rgba(0,0,0,0.5)] flex flex-col z-[100] font-[Tahoma,Verdana,sans-serif] select-none border-[2px] border-[#0F2C8D] border-b-0 origin-bottom-left animate-slide-up">
                {/* Header - User Banner with Blue Gradient */}
                <div className="h-20 bg-gradient-to-b from-[#0A41C4] via-[#245DDA] to-[#0A41C4] flex items-center px-4 rounded-t-md border-b border-[#0F2C8D] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                    <div className="w-14 h-14 bg-white rounded-full border-[3px] border-white/70 shadow-md flex items-center justify-center overflow-hidden mr-3">
                        <img src="/profile.jpeg" alt="User" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23ccc" width="100" height="100"/><text x="50" y="55" font-size="40" text-anchor="middle" fill="%23666">K</text></svg>'; }} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-xl drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)]">Kaveesha</span>
                        <span className="text-blue-200 text-xs drop-shadow-sm">Logged in</span>
                    </div>
                </div>

                {/* Main Body - Two Column Layout */}
                <div className="flex-1 flex bg-white border-x border-[#245DDA] relative overflow-hidden">

                    {/* Left Column - Pinned Programs / Navigation */}
                    <div className="w-[50%] bg-white flex flex-col py-2 pl-2 pr-1 gap-0.5 border-r border-[#96ABDA] overflow-y-auto">
                        {/* Navigation Links */}
                        <MenuItemCompact
                            icon="/icons/folder-open.png"
                            label="About Me"
                            onClick={() => handleNavigationClick('About Me', 'about-me')}
                        />
                        <MenuItemCompact
                            icon="/icons/folder.png"
                            label="My Projects"
                            onClick={() => handleNavigationClick('My Projects', 'my-projects')}
                        />
                        <MenuItemCompact
                            icon="/icons/cmd.png"
                            label="Skills"
                            onClick={() => handleNavigationClick('Skills', 'skills')}
                        />
                        <MenuItemCompact
                            icon="/icons/notepad.png"
                            label="Resume"
                            onClick={() => handleNavigationClick('Resume', 'resume')}
                        />
                        <MenuItemCompact
                            icon="/icons/outlook.png"
                            label="Contact"
                            onClick={() => handleNavigationClick('Contact', 'contact')}
                        />

                        <div className="my-1.5 border-b border-gray-300 w-[90%] self-center"></div>

                        {/* Pinned Apps */}
                        <MenuItemCompact
                            icon="/icons/linkedin.png"
                            label="LinkedIn"
                            subLabel="Professional"
                            onClick={() => window.open('https://www.linkedin.com/in/kaveesha-dilshan-6196a7274/', '_blank')}
                        />
                        <MenuItemCompact
                            icon="/icons/github.png"
                            label="GitHub"
                            subLabel="Code"
                            onClick={() => window.open('https://github.com/Kaveesha23dil', '_blank')}
                        />
                        <MenuItemCompact
                            icon="/icons/behance.png"
                            label="Behance"
                            subLabel="Design"
                            onClick={() => window.open('https://www.behance.net/kaveeshadilshan10', '_blank')}
                        />
                        <MenuItemCompact
                            icon="/icons/ie.png"
                            label="Internet Explorer"
                            subLabel="Web Browser"
                            onClick={() => window.open('https://www.google.com', '_blank')}
                        />

                        <div className="my-1.5 border-b border-gray-300 w-[90%] self-center"></div>

                        {/* All Programs Section */}
                        <div className="px-2 py-1 text-xs font-bold text-gray-600">All Programs</div>

                        {/* Accessories */}
                        <MenuItemCompact
                            icon="/icons/paint.png"
                            label="Paint"
                            small
                            onClick={() => {
                                if (onOpenWindow) {
                                    onOpenWindow('paint', 'Untitled - Paint', <div className="p-4 text-sm">Paint application would open here.</div>);
                                    onClose();
                                }
                            }}
                        />
                        <MenuItemCompact
                            icon="/icons/cmd.png"
                            label="Command Prompt"
                            small
                            onClick={() => {
                                if (onOpenWindow) {
                                    onOpenWindow('cmd', 'Command Prompt', <div className="p-4 text-sm font-mono bg-black text-green-400 h-full">C:\WINDOWS\system32\cmd.exe</div>);
                                    onClose();
                                }
                            }}
                        />
                        <MenuItemCompact
                            icon="/icons/notepad.png"
                            label="Notepad"
                            small
                            onClick={() => {
                                if (onOpenWindow) {
                                    onOpenWindow('notepad', 'Untitled - Notepad', <div className="p-4 text-sm font-mono">Notepad content...</div>);
                                    onClose();
                                }
                            }}
                        />

                        {/* Games */}
                        <div className="px-2 py-1 text-xs font-bold text-gray-600 mt-1">Games</div>
                        <MenuItemCompact
                            icon="/icons/solitaire.png"
                            label="Solitaire"
                            small
                            onClick={() => {
                                if (onOpenWindow) {
                                    onOpenWindow('solitaire', 'Solitaire', <div className="p-4 text-center">♠ ♣ ♥ ♦</div>);
                                    onClose();
                                }
                            }}
                        />

                        <div className="flex-1"></div>

                        {/* All Programs Button */}
                        <div
                            className="flex items-center justify-center p-2 hover:bg-[#316AC5] hover:text-white cursor-default group mx-1 rounded-sm transition-colors text-xs font-bold text-gray-700 relative mt-1"
                            onMouseEnter={handleAllProgramsEnter}
                            onMouseLeave={handleAllProgramsLeave}
                        >
                            <span>All Programs</span>
                            <div className="w-0 h-0 border-y-[3px] border-y-transparent border-l-[3px] border-l-current ml-2 group-hover:border-l-white"></div>

                            {/* All Programs Flyout */}
                            {showAllPrograms && (
                                <div className="absolute left-full bottom-0 ml-1 w-[200px] bg-white border border-[#00136B] shadow-lg p-1 z-[200] flex flex-col gap-0.5">
                                    <div className="px-2 py-1 bg-[#D3E5FA] font-bold text-[10px] border-b border-[#96ABDA] mb-1">
                                        Accessories
                                    </div>
                                    <MenuItemCompact
                                        icon="/icons/paint.png"
                                        label="Paint"
                                        tiny
                                        onClick={() => { if(onOpenWindow){onOpenWindow('paint', 'Untitled - Paint', <div className="p-4">Paint</div>); onClose();} }}
                                    />
                                    <MenuItemCompact
                                        icon="/icons/cmd.png"
                                        label="Command Prompt"
                                        tiny
                                        onClick={() => { if(onOpenWindow){onOpenWindow('cmd', 'Command Prompt', <div className="p-4">Command Prompt</div>); onClose();} }}
                                    />
                                    <MenuItemCompact
                                        icon="/icons/notepad.png"
                                        label="Notepad"
                                        tiny
                                        onClick={() => { if(onOpenWindow){onOpenWindow('notepad', 'Notepad', <div className="p-4">Notepad</div>); onClose();} }}
                                    />

                                    <div className="px-2 py-1 bg-[#D3E5FA] font-bold text-[10px] border-b border-[#96ABDA] mt-1 mb-1">
                                        Games
                                    </div>
                                    <MenuItemCompact
                                        icon="/icons/solitaire.png"
                                        label="Solitaire"
                                        tiny
                                        onClick={() => { if(onOpenWindow){onOpenWindow('solitaire', 'Solitaire', <div className="p-4">Solitaire</div>); onClose();} }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - System Places */}
                    <div className="w-[50%] bg-[#D3E5FA] border-l border-[#96ABDA] py-2 pr-2 pl-1 flex flex-col gap-0.5 overflow-y-auto">
                        <MenuItemCompact
                            right
                            icon="/icons/folder-open.png"
                            label="My Documents"
                            bold
                            onClick={() => { if(onOpenWindow){onOpenWindow('my-documents', 'My Documents', <div className="p-4">My Documents</div>); onClose();} }}
                        />
                        <MenuItemCompact right icon="/icons/recent-docs.png" label="My Recent Documents" hasArrow />
                        <MenuItemCompact
                            right
                            icon="/icons/folder-small.png"
                            label="My Pictures"
                            bold
                            onClick={() => { if(onOpenWindow){onOpenWindow('my-pictures', 'My Pictures', <div className="p-4">My Pictures</div>); onClose();} }}
                        />
                        <MenuItemCompact right icon="/icons/folder-small.png" label="My Music" bold />
                        <MenuItemCompact
                            right
                            icon="/icons/my-computer.png"
                            label="My Computer"
                            bold
                            onClick={() => { if(onOpenWindow){onOpenWindow('my-computer', 'My Computer', <div className="p-4">My Computer</div>); onClose();} }}
                        />

                        <div className="my-1.5 border-b border-[#AABCCF] w-[90%] self-center h-[1px]"></div>

                        <MenuItemCompact
                            right
                            icon="/icons/control-panel.png"
                            label="Control Panel"
                            onClick={() => { if(onOpenWindow){onOpenWindow('control-panel', 'Control Panel', <div className="p-4">Control Panel</div>); onClose();} }}
                        />
                        <MenuItemCompact right icon="/icons/network.png" label="Connect To" />
                        <MenuItemCompact right icon="/icons/printer.png" label="Printers and Faxes" />

                        <div className="my-1.5 border-b border-[#AABCCF] w-[90%] self-center h-[1px]"></div>

                        <MenuItemCompact right icon="/icons/help.png" label="Help and Support" />
                        <MenuItemCompact right icon="/icons/search.png" label="Search" />
                        <MenuItemCompact right icon="/icons/run.png" label="Run..." />
                    </div>
                </div>

                {/* Footer with Log Off and Turn Off */}
                <div className="h-10 bg-gradient-to-b from-[#4282D6] to-[#3A75C5] flex items-center justify-end px-3 gap-2 border-t border-[#0F2C8D] shadow-[inset_0_2px_2px_rgba(255,255,255,0.3)]">
                    <FooterButton icon="/icons/log-off.png" label="Log Off" onClick={() => { if(onLogOff) onLogOff(); onClose(); }} />
                    <FooterButton icon="/icons/shutdown.png" label="Turn Off Computer" onClick={() => setShowShutdownDialog(true)} />
                </div>
            </div>

            {/* Shutdown Dialog */}
            {showShutdownDialog && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[200]" onClick={() => setShowShutdownDialog(false)}>
                    <div className="bg-white border-4 border-[#0A41C4] shadow-[8px_8px_20px_rgba(0,0,0,0.6)] rounded-none w-[320px]" onClick={(e) => e.stopPropagation()}>
                        {/* Title Bar */}
                        <div className="bg-gradient-to-b from-[#245DDA] to-[#0A41C4] px-3 py-2 flex items-center justify-between border-b border-[#0F2C8D]">
                            <span className="text-white font-bold text-sm drop-shadow-sm">Turn Off Computer</span>
                            <button
                                className="text-white hover:brightness-75 text-lg leading-none w-6 h-6 flex items-center justify-center"
                                onClick={() => setShowShutdownDialog(false)}
                            >×</button>
                        </div>

                        {/* Content */}
                        <div className="p-6 bg-[#ECE9D8]">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#245DDA] rounded-full flex items-center justify-center flex-shrink-0">
                                    <div className="w-8 h-8 text-white text-2xl font-bold text-center leading-8">?</div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm mb-4">What do you want the computer to do?</p>

                                    <div className="flex flex-col gap-2">
                                        <ShutdownOptionButton
                                            label="Turn Off"
                                            description="Turns off your computer"
                                            icon="⏻"
                                            onClick={() => handleShutdownOption('shutdown')}
                                        />
                                        <ShutdownOptionButton
                                            label="Restart"
                                            description="Restarts your computer"
                                            icon="↻"
                                            onClick={() => handleShutdownOption('restart')}
                                        />
                                        <ShutdownOptionButton
                                            label="Cancel"
                                            description="Returns to Windows"
                                            icon="✕"
                                            onClick={() => handleShutdownOption('cancel')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const MenuItemCompact = ({ icon, label, subLabel, bold, right, hasArrow, onClick, small, tiny }) => {
    let sizeClass = 'text-xs';
    let iconSize = 'w-6 h-6';
    let paddingClass = 'py-1.5 px-2';

    if (tiny) {
        sizeClass = 'text-[10px]';
        iconSize = 'w-4 h-4';
        paddingClass = 'py-1 px-1.5';
    } else if (small) {
        sizeClass = 'text-[10px]';
        iconSize = 'w-4 h-4';
        paddingClass = 'py-1 px-2';
    }

    return (
        <div
            className={`flex items-center ${paddingClass} gap-2 hover:bg-[#316AC5] group cursor-pointer rounded-sm mx-0.5 ${right ? 'text-[#00136B] hover:text-white' : 'text-gray-800 hover:text-white'}`}
            onClick={onClick}
        >
            <img src={icon} alt={label} className={`${iconSize} object-contain drop-shadow-sm bg-transparent`} onError={(e) => { e.target.style.display = 'none'; }} />
            <div className="flex flex-col justify-center leading-tight flex-1">
                <span className={`${sizeClass} ${bold ? 'font-bold' : ''} ${right ? '' : 'group-hover:text-white'} truncate`}>{label}</span>
                {subLabel && <span className="text-[9px] text-gray-500 group-hover:text-gray-200 truncate">{subLabel}</span>}
            </div>
            {hasArrow && (
                <div className="w-0 h-0 border-y-[3px] border-y-transparent border-l-[3px] border-l-[#00136B] group-hover:border-l-white"></div>
            )}
        </div>
    );
};

const FooterButton = ({ icon, label, onClick }) => (
    <button
        className="flex items-center gap-1.5 hover:brightness-110 cursor-pointer text-white px-3 py-1 rounded transition-all bg-[#4282D6] hover:bg-[#5A9EF7] border border-[#0F2C8D] shadow-sm"
        onClick={onClick}
    >
        <img src={icon} alt={label} className="w-5 h-5 drop-shadow-md bg-white/20 rounded p-0.5" onError={(e) => { e.target.style.display = 'none'; }} />
        <span className="text-xs shadow-black drop-shadow-sm leading-tight">{label}</span>
    </button>
);

const ShutdownOptionButton = ({ label, description, icon, onClick }) => (
    <button
        className="flex items-center gap-3 p-2 hover:bg-[#316AC5] hover:text-white text-left transition-colors border border-transparent hover:border-[#0F2C8D] rounded"
        onClick={onClick}
    >
        <span className="text-xl w-6 text-center">{icon}</span>
        <div className="flex-1">
            <div className="text-sm font-bold">{label}</div>
            <div className="text-xs text-gray-600 group-hover:text-gray-200">{description}</div>
        </div>
    </button>
);

export default StartMenu;
