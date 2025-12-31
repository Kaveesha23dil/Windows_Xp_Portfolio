import React, { useState } from 'react';
import MyComputer from './MyComputer';
import PaintApp from './PaintApp';
import XPCommandPrompt from './XPCommandPrompt';
import MyPictures from './MyPictures';
import PictureViewer from './PictureViewer';

const StartMenu = ({ isOpen, onClose, onOpenWindow, onLogOff, onTurnOff }) => {
    const [showAllPrograms, setShowAllPrograms] = useState(false);

    if (!isOpen) return null;

    const handleAllProgramsEnter = () => setShowAllPrograms(true);
    const handleAllProgramsLeave = () => setShowAllPrograms(false);

    const handleGenericClick = (id, title, Component) => {
        if (onOpenWindow) {
            onOpenWindow(id, title, Component);
            onClose();
        }
    };

    return (
        <div className="absolute bottom-[30px] left-0 w-[380px] h-[480px] bg-[#245DDA] rounded-t-lg shadow-[4px_4px_10px_rgba(0,0,0,0.5)] flex flex-col p-1 z-[100] font-[Tahoma,Verdana,sans-serif] select-none border-[2px] border-[#0F2C8D] border-b-0 origin-bottom-left animate-slide-up">
            {/* Header - User Info */}
            <div className="h-16 bg-gradient-to-r from-[#245DDA] via-[#4385E8] to-[#245DDA] flex items-center px-2 rounded-t-md border-b border-[#0F2C8D] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                <div className="w-12 h-12 bg-white rounded-sm border-[2px] border-white/60 shadow-sm flex items-center justify-center overflow-hidden mr-3">
                    <img src="/profile.jpeg" alt="User" className="w-full h-full object-cover" />
                </div>
                <span className="text-white font-bold text-lg drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">Kaveesha</span>
            </div>

            {/* Main Body */}
            <div className="flex-1 flex bg-white border border-[#245DDA] relative">

                {/* Left Column - Programs */}
                <div className="w-[50%] bg-white flex flex-col py-2 pl-1 pr-0 gap-1 border-r border-[#96ABDA]">
                    {/* Pinned Items */}
                    <MenuItem
                        icon="/icons/linkedin.png"
                        label="LinkedIn"
                        subLabel="Professional Profile"
                        bold
                        onClick={() => window.open('https://www.linkedin.com/in/kaveesha-dilshan-6196a7274/', '_blank')}
                    />
                    <MenuItem
                        icon="/icons/github.png"
                        label="GitHub"
                        subLabel="Code Repositories"
                        bold
                        onClick={() => window.open('https://github.com/Kaveesha23dil', '_blank')}
                    />
                    <MenuItem
                        icon="/icons/behance.png"
                        label="Behance"
                        subLabel="Design Portfolio"
                        bold
                        onClick={() => window.open('https://www.behance.net/kaveeshadilshan10', '_blank')}
                    />
                    <MenuItem
                        icon="/icons/outlook.png"
                        label="E-mail"
                        subLabel="Contact Me"
                        bold
                        onClick={() => window.location.href = 'mailto:kaveeshadilshankd23@gmail.com'}
                    />

                    <div className="my-1 border-b border-gray-300 w-[90%] self-center"></div>

                    <MenuItem
                        icon="/icons/media-player.png"
                        label="Windows Media Player"
                        onClick={() => handleGenericClick('wmp', 'Windows Media Player', <div className="p-4">Windows Media Player is not available.</div>)}
                    />
                    <MenuItem
                        icon="/icons/msn.png"
                        label="MSN Explorer"
                        onClick={() => handleGenericClick('msn', 'MSN Explorer', <div className="p-4">MSN Explorer is not available.</div>)}
                    />
                    <MenuItem
                        icon="/icons/movie-maker.png"
                        label="Windows Movie Maker"
                        onClick={() => handleGenericClick('wmm', 'Windows Movie Maker', <div className="p-4">Windows Movie Maker is not available.</div>)}
                    />
                    <MenuItem
                        icon="/icons/solitaire.png"
                        label="Solitaire"
                        onClick={() => handleGenericClick('solitaire', 'Solitaire', <div className="p-4">Solitaire is not available.</div>)}
                    />

                    <div className="flex-1"></div>

                    {/* All Programs Button */}
                    <div
                        className="flex items-center justify-center p-2 hover:bg-[#316AC5] hover:text-white cursor-default group mx-1 rounded-sm transition-colors text-sm font-bold text-gray-700 relative"
                        onMouseEnter={handleAllProgramsEnter}
                        onMouseLeave={handleAllProgramsLeave}
                    >
                        <span>All Programs</span>
                        <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[4px] border-l-current ml-2 group-hover:border-l-white"></div>

                        {/* All Programs Submenu */}
                        {showAllPrograms && (
                            <div className="absolute left-[95%] bottom-0 w-[200px] bg-white border border-[#00136B] shadow-lg p-1 z-[200] flex flex-col gap-1">
                                <div className="px-2 py-1 bg-[#D3E5FA] font-bold text-xs border-b border-[#96ABDA] mb-1">
                                    Accessories
                                </div>
                                <MenuItem
                                    icon="/icons/paint.png"
                                    label="Paint"
                                    small
                                    onClick={() => handleGenericClick('paint', 'Untitled - Paint', <PaintApp />)}
                                />
                                <MenuItem
                                    icon="/icons/cmd.png"
                                    label="Command Prompt"
                                    small
                                    onClick={() => handleGenericClick('cmd', 'C:\\WINDOWS\\system32\\cmd.exe', <XPCommandPrompt />)}
                                />
                                <MenuItem
                                    icon="/icons/notepad.png"
                                    label="Notepad"
                                    small
                                    onClick={() => handleGenericClick('notepad', 'Notepad', <div className="w-full h-full bg-white font-mono p-2">Notepad...</div>)}
                                />
                                <div className="px-2 py-1 bg-[#D3E5FA] font-bold text-xs border-b border-[#96ABDA] my-1">
                                    Games
                                </div>
                                <MenuItem
                                    icon="/icons/solitaire.png"
                                    label="Solitaire"
                                    small
                                    onClick={() => handleGenericClick('solitaire', 'Solitaire', <div className="p-4">Solitaire...</div>)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - System Places */}
                <div className="w-[50%] bg-[#D3E5FA] border-l border-[#96ABDA] py-2 pr-1 pl-1 flex flex-col gap-1">
                    <MenuItem
                        right
                        icon="/icons/folder-open.png"
                        label="My Documents"
                        bold
                        onClick={() => handleGenericClick('my-documents', 'My Documents', <div className="p-4">My Documents Content</div>)}
                    />
                    <MenuItem right icon="/icons/recent-docs.png" label="My Recent Documents" hasArrow />
                    <MenuItem
                        right
                        icon="/icons/folder-small.png"
                        label="My Pictures"
                        bold
                        onClick={() => handleGenericClick('my-pictures', 'My Pictures',
                            <MyPictures
                                onOpenImage={(img) => {
                                    if (onOpenWindow) {
                                        onOpenWindow(`img-${img.id}`, `${img.title} - Windows Picture and Fax Viewer`, <PictureViewer image={img} />);
                                    }
                                }}
                            />
                        )}
                    />
                    <MenuItem right icon="/icons/folder-small.png" label="My Music" bold />
                    <MenuItem
                        right
                        icon="/icons/my-computer.png"
                        label="My Computer"
                        bold
                        onClick={() => handleGenericClick('my-computer', 'My Computer', <MyComputer onOpenWindow={onOpenWindow} />)}
                    />

                    <div className="my-1 border-b border-[#AABCCF] w-[90%] self-center h-[1px]"></div>

                    <MenuItem
                        right
                        icon="/icons/control-panel.png"
                        label="Control Panel"
                        onClick={() => handleGenericClick('control-panel', 'Control Panel', <div className="p-4">Control Panel Content</div>)}
                    />
                    <MenuItem right icon="/icons/network.png" label="Connect To" />
                    <MenuItem right icon="/icons/printer.png" label="Printers and Faxes" />

                    <div className="my-1 border-b border-[#AABCCF] w-[90%] self-center h-[1px]"></div>

                    <MenuItem right icon="/icons/help.png" label="Help and Support" />
                    <MenuItem right icon="/icons/search.png" label="Search" />
                    <MenuItem right icon="/icons/run.png" label="Run..." />
                </div>
            </div>

            {/* Footer */}
            <div className="h-10 bg-gradient-to-b from-[#4282D6] to-[#3A75C5] flex items-center justify-end px-3 gap-3 border-t border-[#0F2C8D] shadow-[inset_0_2px_2px_rgba(255,255,255,0.3)]">
                <FooterButton icon="/icons/log-off.png" label="Log Off" onClick={onLogOff} />
                <FooterButton icon="/icons/shutdown.png" label="Turn Off Computer" onClick={onTurnOff} />
            </div>
        </div>
    );
};

const MenuItem = ({ icon, label, subLabel, bold, right, hasArrow, onClick, small }) => (
    <div
        className={`flex items-center px-1 py-[3px] gap-2 hover:bg-[#316AC5] group cursor-pointer rounded-sm mx-1 ${right ? 'text-[#00136B] hover:text-white' : 'text-gray-800 hover:text-white'}`}
        onClick={onClick}
    >
        <img src={icon} alt={label} className={`${small ? 'w-4 h-4' : 'w-8 h-8'} object-contain drop-shadow-sm`} />
        <div className="flex flex-col justify-center leading-none">
            <span className={`text-xs ${bold ? 'font-bold' : ''} ${right ? '' : 'group-hover:text-white'}`}>{label}</span>
            {subLabel && <span className="text-[10px] text-gray-500 group-hover:text-gray-200">{subLabel}</span>}
        </div>
        {hasArrow && (
            <div className="ml-auto w-0 h-0 border-y-[3px] border-y-transparent border-l-[3px] border-l-[#00136B] group-hover:border-l-white"></div>
        )}
    </div>
);

const FooterButton = ({ icon, label, onClick }) => (
    <div
        className="flex items-center gap-1 hover:brightness-110 cursor-pointer text-white px-2 py-1 rounded transition-all"
        onClick={onClick}
    >
        <img src={icon} alt={label} className="w-5 h-5 drop-shadow-md bg-[#D67128] rounded-[2px] p-[2px] border border-white/50" />
        <span className="text-xs shadow-black drop-shadow-sm leading-tight">{label}</span>
    </div>
);

export default StartMenu;
