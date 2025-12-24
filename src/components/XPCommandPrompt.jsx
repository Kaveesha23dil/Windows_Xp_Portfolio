import React, { useState, useEffect, useRef } from 'react';

export default function XPCommandPrompt() {
    const [history, setHistory] = useState([
        "Microsoft Windows XP [Version 5.1.2600]",
        "(C) Copyright 1985-2001 Microsoft Corp.",
        "",
        "Type 'HELP' to see available commands.",
        "Try 'SKILLS', 'CONTACT', 'ABOUT', or 'MATRIX'...",
        ""
    ]);
    const [currentLine, setCurrentLine] = useState('');
    const [textColor, setTextColor] = useState('#CCCCCC');
    const [isMatrixMode, setIsMatrixMode] = useState(false);

    const inputRef = useRef(null);
    const endRef = useRef(null);
    const containerRef = useRef(null);
    const matrixInterval = useRef(null);

    // Command Logic
    const handleCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const args = trimmedCmd.split(' ');
        const mainCommand = args[0];

        let newHistory = [...history, `C:\\Documents and Settings\\Kaveesha> ${cmd}`];

        switch (mainCommand) {
            case 'help':
                newHistory.push(
                    "SKILLS    - Show programming skills module",
                    "CONTACT   - Show contact information",
                    "ABOUT     - About the developer",
                    "COLOR     - Sets the default console foreground and background colors",
                    "PING      - Verifies IP-level connectivity to another TCP/IP computer",
                    "MATRIX    - Enter the Matrix",
                    "CLS       - Clear the screen",
                    "HELP      - Show this help message",
                    "EXIT      - Close the command prompt",
                    "DIR       - List directory contents"
                );
                break;
            case 'cls':
                setHistory([]);
                setCurrentLine('');
                return;
            case 'skills':
                runSkillsModule(newHistory);
                setCurrentLine('');
                return;
            case 'contact':
                newHistory.push(
                    "--------------------------------------------------",
                    "  CONTACT INFORMATION",
                    "--------------------------------------------------",
                    "  > Email:      kaveesha@example.com",
                    "  > GitHub:     github.com/kaveesha",
                    "  > LinkedIn:   linkedin.com/in/kaveesha",
                    "--------------------------------------------------"
                );
                break;
            case 'about':
                newHistory.push(
                    "",
                    "  Hello! I am Kaveesha, a Full Stack Developer.",
                    "  I love building retro interfaces and modern web apps.",
                    "  Welcome to my Windows XP Portfolio.",
                    ""
                );
                break;
            case 'color':
                if (args[1]) {
                    const colorMap = {
                        '0': '#000000', '1': '#000080', '2': '#008000', '3': '#008080',
                        '4': '#800000', '5': '#800080', '6': '#808000', '7': '#C0C0C0',
                        '8': '#808080', '9': '#0000FF', 'a': '#00FF00', 'b': '#00FFFF',
                        'c': '#FF0000', 'd': '#FF00FF', 'e': '#FFFF00', 'f': '#FFFFFF'
                    };
                    const colorCode = args[1].toLowerCase();
                    // CMD color is usually 2 chars (bg + fg), here simpler implementation for FG
                    // If user types 'color a' -> Green text
                    const fg = colorCode.length === 2 ? colorCode[1] : colorCode[0];
                    if (colorMap[fg]) {
                        setTextColor(colorMap[fg]);
                    } else {
                        newHistory.push("Sets the default console foreground and background colors.", "COLOR [attr]", "attr specifies color attribute of console output");
                    }
                } else {
                    setTextColor('#CCCCCC'); // Reset
                }
                break;
            case 'ping':
                if (args[1]) {
                    startPing(args[1], newHistory);
                    setCurrentLine('');
                    return;
                } else {
                    newHistory.push("Usage: ping [-t] target_name");
                }
                break;
            case 'matrix':
                setIsMatrixMode(true);
                setCurrentLine('');
                setHistory([]);
                return; // Mode switch
            case 'exit':
                newHistory.push("Closing session...");
                break;
            case 'dir':
                newHistory.push(
                    " Volume in drive C has no label.",
                    " Volume Serial Number is 1234-5678",
                    "",
                    " Directory of C:\\Documents and Settings\\Kaveesha",
                    "",
                    "01/01/2002  12:00 PM    <DIR>          .",
                    "01/01/2002  12:00 PM    <DIR>          ..",
                    "05/20/2024  09:30 AM    <DIR>          Desktop",
                    "05/20/2024  09:30 AM    <DIR>          My Documents",
                    "12/25/2025  01:15 AM           102,400 resume.pdf",
                    "               1 File(s)        102,400 bytes",
                    "               4 Dir(s)  15,234,456,789 bytes free"
                );
                break;
            case '':
                break;
            default:
                newHistory.push(`'${trimmedCmd}' is not recognized as an internal or external command,`, "operable program or batch file.");
        }

        setHistory(newHistory);
        setCurrentLine('');
    };

    const runSkillsModule = (currentHistory) => {
        const skills = [
            "--------------------------------------------------",
            "  LOADING SKILLS MODULE...",
            "--------------------------------------------------",
            "  > JavaScript..............100%",
            "  > React.js................95%",
            "  > HTML5/CSS3..............90%",
            "  > Node.js.................85%",
            "  > Python..................80%",
            "  > Git/GitHub..............90%",
            "--------------------------------------------------",
            "  MODULE LOADED SUCCESSFULLY."
        ];

        let index = 0;
        setHistory(currentHistory);

        const interval = setInterval(() => {
            if (index < skills.length) {
                setHistory(prev => [...prev, skills[index]]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 150);
    };

    const startPing = (target, currentHistory) => {
        setHistory([...currentHistory,
            "",
        `Pinging ${target} [127.0.0.1] with 32 bytes of data:`
        ]);

        let pings = 0;
        const interval = setInterval(() => {
            if (pings < 4) {
                setHistory(prev => [...prev, `Reply from 127.0.0.1: bytes=32 time<1ms TTL=128`]);
                pings++;
            } else {
                clearInterval(interval);
                setHistory(prev => [...prev,
                    "",
                `Ping statistics for ${target}:`,
                    "    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),",
                    "Approximate round trip times in milli-seconds:",
                    "    Minimum = 0ms, Maximum = 0ms, Average = 0ms"
                ]);
            }
        }, 1000);
    };

    // Matrix Logic
    useEffect(() => {
        if (isMatrixMode) {
            setTextColor('#00FF00');
            matrixInterval.current = setInterval(() => {
                const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                const randomStr = Array(50).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join(' ');
                setHistory(prev => [...prev.slice(-20), randomStr]); // Keep only last 20 lines to prevent memory overflow
            }, 50);
        } else {
            if (matrixInterval.current) clearInterval(matrixInterval.current);
        }

        return () => {
            if (matrixInterval.current) clearInterval(matrixInterval.current);
        }
    }, [isMatrixMode]);

    const handleKeyDown = (e) => {
        if (isMatrixMode) {
            // Any key to stop matrix
            setIsMatrixMode(false);
            setHistory([]);
            setTextColor('#CCCCCC'); // Reset color logic might need improvement to respect previous color
            return;
        }

        if (e.key === 'Enter') {
            handleCommand(currentLine);
        } else if (e.key === 'Backspace') {
            setCurrentLine(prev => prev.slice(0, -1));
        } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            setCurrentLine(prev => prev + e.key);
        }
    };

    // Keep focus
    useEffect(() => {
        const handleClick = () => inputRef.current?.focus();
        // Auto-focus on mount
        inputRef.current?.focus();

        // Add global click listener to container to keep focus
        const container = containerRef.current;
        if (container) container.addEventListener('click', handleClick);

        return () => {
            if (container) container.removeEventListener('click', handleClick);
        }
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, currentLine]);

    return (
        <div ref={containerRef} className="bg-black font-mono h-full w-full text-[13px] overflow-auto p-1 cursor-text select-text"
            style={{
                fontFamily: "'Lucida Console', Monaco, monospace",
                lineHeight: '1.2',
                color: textColor
            }}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {/* Hidden Input for Mobile/IME support */}
            <input
                ref={inputRef}
                type="text"
                className="opacity-0 absolute top-0 left-0 h-0 w-0"
                autoFocus
            />

            {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap min-h-[1.2em]">{line}</div>
            ))}

            {!isMatrixMode && (
                <div className="flex flex-wrap break-all">
                    <span className="whitespace-pre">C:\Documents and Settings\Kaveesha&gt; </span>
                    <span>{currentLine}</span>
                    <span className="animate-pulse w-2 h-[1em] inline-block align-text-bottom ml-[1px]" style={{ backgroundColor: textColor }}></span>
                </div>
            )}

            <div ref={endRef} />
        </div>
    );
}
