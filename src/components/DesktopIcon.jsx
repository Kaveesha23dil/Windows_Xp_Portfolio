import React from 'react';

export default function DesktopIcon({ label, icon, onClick, onDoubleClick, isSelected = false, className = '' }) {
    return (
        <div
            className={`w-20 flex flex-col items-center gap-1 group cursor-pointer p-1 rounded-sm select-none
                ${isSelected
                    ? 'bg-[#316AC5]/80 border border-[#316AC5] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]'
                    : 'border border-transparent hover:bg-[#316AC5]/40 hover:border-[#316AC5]/40'}
                ${className}
            `}
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
            }}
            onDoubleClick={(e) => {
                e.stopPropagation();
                if (onDoubleClick) onDoubleClick();
            }}
        >
            <div className="w-10 h-10 relative">
                {typeof icon === 'string' ? (
                    <img
                        src={icon}
                        alt={label}
                        className="w-full h-full object-contain pointer-events-none drop-shadow-md"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center pointer-events-none drop-shadow-md">
                        {icon}
                    </div>
                )}
            </div>
            <span className={`text-white text-xs text-center px-1 rounded-sm line-clamp-2 leading-tight ${
                isSelected ? 'bg-[#316AC5]' : 'group-hover:bg-[#316AC5]'
            }`}>
                {label}
            </span>
        </div>
    );
}
