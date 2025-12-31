import React from 'react';

const PictureViewer = ({ image, onClose }) => {
    return (
        <div className="flex flex-col h-full bg-[#ECE9D8] select-none">
            {/* Toolbar Top (Standard Windows Toolbar Simulation) */}
            <div className="h-8 bg-[#ECE9D8] border-b border-gray-400 flex items-center px-2 gap-2 shadow-sm">
                <div className="w-6 h-6 rounded hover:bg-white/50 flex items-center justify-center p-1 cursor-pointer">
                    <img src="/icons/folder-open.png" alt="Open" className="w-full h-full" />
                </div>
                <div className="w-6 h-6 rounded hover:bg-white/50 flex items-center justify-center p-1 cursor-pointer">
                    <img src="/icons/printer.png" alt="Print" className="w-full h-full" />
                </div>
                <div className="flex-1"></div>
                <div className="w-6 h-6 rounded hover:bg-white/50 flex items-center justify-center p-1 cursor-pointer">
                    <img src="/icons/help.png" alt="Help" className="w-full h-full" />
                </div>
            </div>

            {/* Main Image Area */}
            <div className="flex-1 overflow-auto flex items-center justify-center bg-[#F0F0F0] p-4 border border-[#8B8B8B] inset-0 m-1">
                {/* Shadow box effect for image */}
                <div className="bg-white p-1 shadow-lg border border-gray-500 inline-block">
                    <img
                        src={image.src}
                        alt={image.title}
                        className="max-h-[calc(100vh-200px)] max-w-full object-contain block"
                    />
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="h-12 bg-[#ECE9D8] border-t border-white flex items-center justify-center gap-4">
                <button className="w-10 h-10 rounded-full hover:bg-white/50 flex items-center justify-center border border-transparent hover:border-gray-400 active:bg-gray-200 transition-all" title="Previous">
                    <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[10px] border-r-[#316AC5]"></div>
                </button>

                <div className="w-10 h-10 rounded-full hover:bg-white/50 flex items-center justify-center border border-transparent hover:border-gray-400 cursor-pointer" title="Zoom In">
                    <img src="/icons/search.png" alt="Zoom" className="w-6 h-6" />
                </div>

                <button className="w-10 h-10 rounded-full hover:bg-white/50 flex items-center justify-center border border-transparent hover:border-gray-400 active:bg-gray-200 transition-all" title="Next">
                    <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-[#316AC5]"></div>
                </button>
            </div>
        </div>
    );
};

export default PictureViewer;
