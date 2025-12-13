import React from 'react';

export default function XPWindow({ title, children, onClose, isOpen = true }) {
    if (!isOpen) return null;

    return (
        <div className="absolute top-10 left-10 w-[600px] h-[400px] flex flex-col bg-[#ECE9D8] rounded-t-lg shadow-xl overflow-hidden border border-[#0055EA] select-none z-10 font-sans">
            {/* Title Bar */}
            <div className="h-[30px] bg-gradient-to-r from-[#0058EE] via-[#3593FF] to-[#0058EE] flex items-center justify-between px-2 select-none shadow-[inset_0_-1px_0_rgba(255,255,255,0.3)]">
                <div className="flex items-center gap-2">
                    {/* Optional small icon could go here */}
                    <span className="text-white text-sm font-bold drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)] truncate max-w-[400px]">
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="w-[21px] h-[21px] bg-[#E94D40] border border-white/50 rounded-[3px] flex items-center justify-center hover:bg-[#F06E65] active:bg-[#B02B22] shadow-[inset_1px_1px_0_rgba(255,255,255,0.5),1px_1px_2px_rgba(0,0,0,0.3)]"
                        title="Close"
                    >
                        <span className="text-white text-md font-bold leading-none mb-0.5 ml-0.5 text-shadow">×</span>
                    </button>
                </div>
            </div>

            {/* Menu Bar (Optional placeholder for authenticity) */}
            <div className="h-[24px] bg-[#ECE9D8] flex items-center px-2 border-b border-[#D8D2BD] text-xs text-black">
                <span className="mr-3 hover:bg-[#316AC5] hover:text-white px-1 cursor-default">File</span>
                <span className="mr-3 hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Edit</span>
                <span className="mr-3 hover:bg-[#316AC5] hover:text-white px-1 cursor-default">View</span>
                <span className="mr-3 hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Favorites</span>
                <span className="mr-3 hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Tools</span>
                <span className="mr-3 hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Help</span>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white p-4 overflow-auto border-t border-[#D8D2BD] content-container">
                {children}
            </div>

            {/* Status Bar */}
            <div className="h-[20px] bg-[#ECE9D8] border-t border-[#D8D2BD] flex items-center px-2 text-[11px] text-[#444]">
                <span>1 object(s) selected</span>
            </div>
        </div>
    );
}
