import React from 'react';

export default function DesktopIcon({ label, icon, onClick, className = '' }) {
    return (
        <div
            className={`w-20 flex flex-col items-center gap-1 group cursor-pointer p-1 border border-transparent hover:bg-[#316AC5]/40 hover:border-[#316AC5]/40 rounded-sm ${className}`}
            onClick={onClick}
        >
            <div className="w-10 h-10 relative">
                <img
                    src={icon}
                    alt={label}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-md"
                />
            </div>
            <span className="text-white text-xs text-center drop-shadow-[1px_1px_1px_rgba(0,0,0,1)] group-hover:bg-[#316AC5] px-1 rounded-sm line-clamp-2 leading-tight">
                {label}
            </span>
        </div>
    );
}
