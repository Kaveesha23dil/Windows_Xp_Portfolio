import React from 'react';

export default function ResumeDocumentIcon() {
    return (
        <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-md">
            {/* Document shadow */}
            <ellipse cx="22" cy="36" rx="10" ry="2" fill="rgba(0,0,0,0.2)"/>

            {/* Main document */}
            <g transform="translate(4, 2)">
                {/* White page with slight rotation for realism */}
                <rect
                    x="1"
                    y="1"
                    width="28"
                    height="34"
                    rx="1"
                    fill="white"
                    stroke="#c0c0c0"
                    strokeWidth="0.5"
                    transform="rotate(-2, 15, 18)"
                />

                {/* Folded corner (top-right) */}
                <path
                    d="M 26 3 L 28 3 L 28 9 Q 28 3 26 3"
                    fill="#f0f0f0"
                    stroke="#c0c0c0"
                    strokeWidth="0.5"
                />
                <line x1="26" y1="3" x2="28" y2="5" stroke="#c0c0c0" strokeWidth="0.5"/>
                <line x1="26" y1="4" x2="27" y2="5" stroke="#c0c0c0" strokeWidth="0.5"/>

                {/* Text lines (simulated) */}
                <rect x="6" y="8" width="16" height="1.5" fill="#666"/>
                <rect x="6" y="12" width="14" height="1" fill="#666"/>
                <rect x="6" y="14.5" width="12" height="1" fill="#666"/>
                <rect x="6" y="17" width="15" height="1" fill="#666"/>
                <rect x="6" y="20" width="10" height="1" fill="#666"/>
            </g>

            {/* PDF Badge (bottom-right corner, red with PDF text) */}
            <g transform="translate(26, 30)">
                <rect
                    x="0"
                    y="0"
                    width="10"
                    height="8"
                    rx="1.5"
                    fill="#d93025"
                    stroke="#a4261c"
                    strokeWidth="0.3"
                />
                <text
                    x="5"
                    y="5.5"
                    textAnchor="middle"
                    fill="white"
                    fontSize="5"
                    fontWeight="bold"
                    fontFamily="Arial, sans-serif"
                >
                    PDF
                </text>
            </g>
        </svg>
    );
}
