import React from 'react';

const StartMenu = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute bottom-[30px] left-0 w-[380px] h-[480px] bg-[#245DDA] rounded-t-lg shadow-[4px_4px_10px_rgba(0,0,0,0.5)] flex flex-col p-1 z-[100] font-[Tahoma,Verdana,sans-serif] select-none border-[2px] border-[#0F2C8D] border-b-0 origin-bottom-left animate-slide-up">
            {/* Header - User Info */}
            <div className="h-16 bg-gradient-to-r from-[#245DDA] via-[#4385E8] to-[#245DDA] flex items-center px-2 rounded-t-md border-b border-[#0F2C8D] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                <div className="w-12 h-12 bg-white rounded-sm border-[2px] border-white/60 shadow-sm flex items-center justify-center overflow-hidden mr-3">
                    <img src="https://win98icons.alexmeub.com/icons/png/user_world-2.png" alt="User" className="w-full h-full object-cover" />
                </div>
                <span className="text-white font-bold text-lg drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">Owner</span>
            </div>

            {/* Main Body */}
            <div className="flex-1 flex bg-white border border-[#245DDA]">

                {/* Left Column - Programs */}
                <div className="w-[50%] bg-white flex flex-col py-2 pl-1 pr-0 gap-1 border-r border-[#96ABDA]">
                    {/* Pinned Items */}
                    <MenuItem icon="https://win98icons.alexmeub.com/icons/png/msie1-4.png" label="Internet" subLabel="Internet Explorer" bold />
                    <MenuItem icon="https://win98icons.alexmeub.com/icons/png/outlook_express-4.png" label="E-mail" subLabel="Outlook Express" bold />

                    <div className="my-1 border-b border-gray-300 w-[90%] self-center"></div>

                    <MenuItem icon="https://win98icons.alexmeub.com/icons/png/media_player-4.png" label="Windows Media Player" />
                    <MenuItem icon="https://win98icons.alexmeub.com/icons/png/msn2-4.png" label="MSN Explorer" />
                    <MenuItem icon="https://win98icons.alexmeub.com/icons/png/moviemaker-4.png" label="Windows Movie Maker" />
                    <MenuItem icon="https://win98icons.alexmeub.com/icons/png/solitaire-4.png" label="Solitaire" />

                    <div className="flex-1"></div>

                    <div className="flex items-center justify-center p-2 hover:bg-[#316AC5] hover:text-white cursor-default group mx-1 rounded-sm transition-colors text-sm font-bold text-gray-700">
                        <span>All Programs</span>
                        <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[4px] border-l-current ml-2 group-hover:border-l-white"></div>
                    </div>
                </div>

                {/* Right Column - System Places */}
                <div className="w-[50%] bg-[#D3E5FA] border-l border-[#96ABDA] py-2 pr-1 pl-1 flex flex-col gap-1">
                    <MenuItem right icon="https://win98icons.alexmeub.com/icons/png/directory_open-4.png" label="My Documents" bold />
                    <MenuItem right icon="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" label="My Recent Documents" hasArrow />
                    <MenuItem right icon="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs_small-4.png" label="My Pictures" bold />
                    <MenuItem right icon="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs_small-4.png" label="My Music" bold />
                    <MenuItem right icon="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png" label="My Computer" bold />

                    <div className="my-1 border-b border-[#AABCCF] w-[90%] self-center h-[1px]"></div>

                    <MenuItem right icon="https://win98icons.alexmeub.com/icons/png/control_panel-4.png" label="Control Panel" />
                    <MenuItem right icon="https://win98icons.alexmeub.com/icons/png/network_internet_pcs_installer-4.png" label="Connect To" />
                    <MenuItem right icon="https://win98icons.alexmeub.com/icons/png/printer-4.png" label="Printers and Faxes" />

                    <div className="my-1 border-b border-[#AABCCF] w-[90%] self-center h-[1px]"></div>

                    <MenuItem right icon="https://win98icons.alexmeub.com/icons/png/help_book_big-4.png" label="Help and Support" />
                    <MenuItem right icon="https://win98icons.alexmeub.com/icons/png/search_file-4.png" label="Search" />
                    <MenuItem right icon="https://win98icons.alexmeub.com/icons/png/run-4.png" label="Run..." />
                </div>
            </div>

            {/* Footer */}
            <div className="h-10 bg-gradient-to-b from-[#4282D6] to-[#3A75C5] flex items-center justify-end px-3 gap-3 border-t border-[#0F2C8D] shadow-[inset_0_2px_2px_rgba(255,255,255,0.3)]">
                <FooterButton icon="https://win98icons.alexmeub.com/icons/png/key_win-4.png" label="Log Off" />
                <FooterButton icon="https://win98icons.alexmeub.com/icons/png/shut_down_cool-4.png" label="Turn Off Computer" />
            </div>
        </div>
    );
};

const MenuItem = ({ icon, label, subLabel, bold, right, hasArrow }) => (
    <div className={`flex items-center px-1 py-[3px] gap-2 hover:bg-[#316AC5] group cursor-pointer rounded-sm mx-1 ${right ? 'text-[#00136B] hover:text-white' : 'text-gray-800 hover:text-white'}`}>
        <img src={icon} alt={label} className="w-8 h-8 object-contain drop-shadow-sm" />
        <div className="flex flex-col justify-center leading-none">
            <span className={`text-xs ${bold ? 'font-bold' : ''} ${right ? '' : 'group-hover:text-white'}`}>{label}</span>
            {subLabel && <span className="text-[10px] text-gray-500 group-hover:text-gray-200">{subLabel}</span>}
        </div>
        {hasArrow && (
            <div className="ml-auto w-0 h-0 border-y-[3px] border-y-transparent border-l-[3px] border-l-[#00136B] group-hover:border-l-white"></div>
        )}
    </div>
);

const FooterButton = ({ icon, label }) => (
    <div className="flex items-center gap-1 hover:brightness-110 cursor-pointer text-white px-2 py-1 rounded transition-all">
        <img src={icon} alt={label} className="w-5 h-5 drop-shadow-md bg-[#D67128] rounded-[2px] p-[2px] border border-white/50" />
        <span className="text-xs shadow-black drop-shadow-sm leading-tight">{label}</span>
    </div>
);

export default StartMenu;
