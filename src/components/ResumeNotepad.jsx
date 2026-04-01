import React, { useState, useEffect } from 'react';

const RESUME_TEXT = `KAVEE SHA DILSHAN
Software Developer
Email: kaveeshadilshankd23@gmail.com | Phone: +1 234 567 890
LinkedIn: linkedin.com/in/kaveesha-dilshan-6196a7274
GitHub: github.com/Kaveesha23dil
Behance: behance.net/kaveeshadilshan10

PROFESSIONAL SUMMARY
Full-stack developer with expertise in React, Node.js, Python, and modern web technologies.
Passionate about building retro interfaces and innovative applications with a focus on
user experience and clean code.

TECHNICAL SKILLS
• Frontend: React.js, HTML5, CSS3, TailwindCSS, JavaScript (ES6+), TypeScript
• Backend: Node.js, Express.js, Python, Django, REST APIs, GraphQL
• Databases: MongoDB, PostgreSQL, MySQL, SQLite
• Tools: Git, GitHub, VS Code, npm/yarn, Docker, CI/CD
• Other: UI/UX Design, Figma, Adobe Creative Suite

EXPERIENCE

Software Developer
Tech Innovations Inc. | 2024 - Present
• Developed responsive web applications using React and Node.js
• Implemented RESTful APIs and optimized database queries
• Collaborated with cross-functional teams using Agile methodologies
• Reduced page load times by 40% through code splitting and lazy loading

Personal Projects
Windows XP Portfolio (2025)
• Recreated classic Windows XP interface using React and TailwindCSS
• Implemented desktop icons, start menu, taskbar, and multiple applications
• Featured interactive Paint app, Command Prompt simulation, and project explorer

EXPERIMENTAL PROJECTS
• Matrix Rain Effect - Interactive canvas-based particle system
• Retro UI Component Library - Reusable React components with vintage styling
• CLI Task Manager - Command-line task tracking tool

EDUCATION
Bachelor of Science in Computer Science
University of Example | 2020 - 2024
• GPA: 3.8/4.0
• Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems
• President of Coding Club, organized hackathons and workshops

LANGUAGES
• English (Fluent)
• Spanish (Intermediate)
• Tamil (Native)
`;

export default function ResumeNotepad({ onClose }) {
    const [copied, setCopied] = useState(false);

    const handleCopyAll = async () => {
        try {
            await navigator.clipboard.writeText(RESUME_TEXT);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = RESUME_TEXT;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Resume - Kaveesha Dilshan</title>
                    <style>
                        body {
                            font-family: 'Courier New', monospace;
                            white-space: pre-wrap;
                            padding: 40px;
                            margin: 0;
                            background: white;
                            color: black;
                            line-height: 1.5;
                        }
                        @media print {
                            body { padding: 20px; }
                        }
                    </style>
                </head>
                <body>${RESUME_TEXT}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
            }, 250);
        } else {
            alert('Please allow popups for this site to print.');
        }
    };

    // Menu dropdown state
    const [openMenu, setOpenMenu] = useState(null); // 'file' | 'edit' | null

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const closeMenus = () => setOpenMenu(null);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClick = () => closeMenus();
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="flex flex-col h-full bg-white select-none" onClick={closeMenus}>
            {/* Menu Bar */}
            <div
                className="h-[24px] bg-[#ECE9D8] flex items-center px-2 border-b border-[#D8D2BD] text-xs text-black relative"
                onClick={e => e.stopPropagation()}
            >
                <div
                    className={`px-2 py-1 cursor-pointer hover:bg-[#316AC5] hover:text-white ${openMenu === 'file' ? 'bg-[#316AC5] text-white' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleMenu('file'); }}
                >
                    File
                </div>
                <div
                    className={`px-2 py-1 cursor-pointer hover:bg-[#316AC5] hover:text-white ${openMenu === 'edit' ? 'bg-[#316AC5] text-white' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleMenu('edit'); }}
                >
                    Edit
                </div>
                <div className="px-2 py-1 cursor-pointer hover:bg-[#316AC5] hover:text-white">View</div>
                <div className="px-2 py-1 cursor-pointer hover:bg-[#316AC5] hover:text-white">Format</div>
                <div className="px-2 py-1 cursor-pointer hover:bg-[#316AC5] hover:text-white">Help</div>

                {/* File Dropdown */}
                {openMenu === 'file' && (
                    <div className="absolute top-6 left-0 bg-white border border-[#888] shadow-lg text-xs z-20">
                        <div
                            className="px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer flex justify-between"
                            onClick={(e) => { e.stopPropagation(); handlePrint(); setOpenMenu(null); }}
                        >
                            <span>Print...</span>
                            <span className="text-[10px]">Ctrl+P</span>
                        </div>
                        <div className="border-t border-gray-300 my-0.5"></div>
                        <div
                            className="px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer"
                            onClick={(e) => { e.stopPropagation(); if (onClose) onClose(); setOpenMenu(null); }}
                        >
                            Exit
                        </div>
                    </div>
                )}

                {/* Edit Dropdown */}
                {openMenu === 'edit' && (
                    <div className="absolute top-6 left-0 bg-white border border-[#888] shadow-lg text-xs z-20">
                        <div
                            className="px-4 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer flex justify-between items-center"
                            onClick={(e) => { e.stopPropagation(); handleCopyAll(); setOpenMenu(null); }}
                        >
                            <span>Copy All</span>
                            {copied && <span className="text-green-600 ml-2">✓</span>}
                        </div>
                    </div>
                )}
            </div>

            {/* Text Content */}
            <div className="flex-1 overflow-auto bg-white p-4">
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap select-text">
                    {RESUME_TEXT}
                </pre>
            </div>

            {/* Custom Status Bar */}
            <div className="h-[20px] bg-[#ECE9D8] border-t border-[#D8D2BD] flex items-center px-2 text-[11px] text-[#444]">
                <span>{RESUME_TEXT.length} characters</span>
                {copied && (
                    <span className="ml-4 text-green-600 transition-opacity duration-300">
                        Copied to clipboard!
                    </span>
                )}
            </div>
        </div>
    );
}
