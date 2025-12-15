import React, { useState, useRef, useEffect } from 'react';

export default function PaintApp() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState('pencil');
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(1);
    const [fillColor, setFillColor] = useState('#FFFFFF'); // For secondary color/fill
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const snapshotRef = useRef(null);
    const historyRef = useRef([]);
    const [historyStep, setHistoryStep] = useState(-1);

    // XP Paint Palette Colors
    const colors = [
        '#000000', '#783B00', '#005300', '#005888', '#000078', '#530058', '#535300', '#003838', '#583800', '#385300', '#003853', '#003878', '#380038', '#383800',
        '#FFFFFF', '#B8B8B8', '#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#B8B800', '#00B8B8', '#0000B8', '#B800B8', '#B85800', '#787878'
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        // Initial setup
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.lineCap = 'round';
        contextRef.current = ctx;

        // Save initial blank state
        saveHistory();
    }, []);

    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = color;
            contextRef.current.fillStyle = color; // For fill tools
            contextRef.current.lineWidth = lineWidth;
        }
    }, [color, lineWidth]);

    // Handle Undo (Ctrl+Z)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                undo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [historyStep]);

    const saveHistory = () => {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;
        if (!canvas || !ctx) return;

        // Note: In a real heavy app, we might limit stack size
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Truncate future history if we were in the middle
        const newHistory = historyRef.current.slice(0, historyStep + 1);
        newHistory.push(imageData);
        historyRef.current = newHistory;
        setHistoryStep(newHistory.length - 1);
    };

    const undo = () => {
        if (historyStep > 0) {
            const newStep = historyStep - 1;
            setHistoryStep(newStep);
            const imageData = historyRef.current[newStep];
            contextRef.current.putImageData(imageData, 0, 0);
        }
    };

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;

        if (tool === 'bucket') {
            floodFill(offsetX, offsetY, color);
            saveHistory(); // Bucket is instant action
            return;
        }

        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        setStartPos({ x: offsetX, y: offsetY });

        // Save snapshot for shape preview
        snapshotRef.current = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const finishDrawing = () => {
        if (!isDrawing) return;
        contextRef.current.closePath();
        setIsDrawing(false);
        saveHistory(); // Save state after stroke/shape
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        const ctx = contextRef.current;

        if (tool === 'pencil' || tool === 'brush') {
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        } else if (tool === 'eraser') {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = lineWidth * 2; // Eraser slightly bigger
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
            ctx.strokeStyle = color; // Reset
            ctx.lineWidth = lineWidth;
        } else if (['line', 'rect', 'ellipse'].includes(tool)) {
            // Restore snapshot to clear previous drag frame
            ctx.putImageData(snapshotRef.current, 0, 0);
            drawShape(ctx, startPos.x, startPos.y, offsetX, offsetY, tool);
        }
    };

    const drawShape = (ctx, x1, y1, x2, y2, toolType) => {
        ctx.beginPath();
        if (toolType === 'line') {
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        } else if (toolType === 'rect') {
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
            return; // strokeRect draws immediately
        } else if (toolType === 'ellipse') { // Simple circle/ellipse approximation
            const radiusX = Math.abs((x2 - x1) / 2);
            const radiusY = Math.abs((y2 - y1) / 2);
            const centerX = Math.min(x1, x2) + radiusX;
            const centerY = Math.min(y1, y2) + radiusY;
            ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        }
        ctx.stroke();
    };

    const floodFill = (startX, startY, newColorHex) => {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const width = canvas.width;
        const height = canvas.height;

        // Parse new color
        const r = parseInt(newColorHex.slice(1, 3), 16);
        const g = parseInt(newColorHex.slice(3, 5), 16);
        const b = parseInt(newColorHex.slice(5, 7), 16);
        const a = 255;

        // Get target color
        const startPos = (startY * width + startX) * 4;
        const startR = data[startPos];
        const startG = data[startPos + 1];
        const startB = data[startPos + 2];
        const startA = data[startPos + 3];

        if (startR === r && startG === g && startB === b && startA === a) return;

        const pixelStack = [[startX, startY]];

        const matchStartColor = (pos) => {
            return data[pos] === startR && data[pos + 1] === startG && data[pos + 2] === startB && data[pos + 3] === startA;
        };

        const colorPixel = (pos) => {
            data[pos] = r;
            data[pos + 1] = g;
            data[pos + 2] = b;
            data[pos + 3] = a;
        };

        while (pixelStack.length) {
            const newPos = pixelStack.pop();
            const x = newPos[0];
            let y = newPos[1];

            let pixelPos = (y * width + x) * 4;

            while (y-- >= 0 && matchStartColor(pixelPos)) {
                pixelPos -= width * 4;
            }
            pixelPos += width * 4;
            ++y;

            let reachLeft = false;
            let reachRight = false;

            while (y++ < height - 1 && matchStartColor(pixelPos)) {
                colorPixel(pixelPos);

                if (x > 0) {
                    if (matchStartColor(pixelPos - 4)) {
                        if (!reachLeft) {
                            pixelStack.push([x - 1, y]);
                            reachLeft = true;
                        }
                    } else if (reachLeft) {
                        reachLeft = false;
                    }
                }

                if (x < width - 1) {
                    if (matchStartColor(pixelPos + 4)) {
                        if (!reachRight) {
                            pixelStack.push([x + 1, y]);
                            reachRight = true;
                        }
                    } else if (reachRight) {
                        reachRight = false;
                    }
                }

                pixelPos += width * 4;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveHistory();
        // Reset color because fillStyle changed
        ctx.fillStyle = color;
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#BFBFBF]">
            {/* Menu Bar */}
            <div className="flex gap-2 px-1 py-0.5 text-sm border-b border-gray-400 bg-[#ECE9D8]">
                <div className="relative group">
                    <span className="cursor-default hover:bg-[#316AC5] hover:text-white px-1">File</span>
                    <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-500 shadow-md w-32 z-50">
                        <div className="p-1 hover:bg-[#316AC5] hover:text-white cursor-pointer" onClick={clearCanvas}>New</div>
                    </div>
                </div>
                <div className="relative group">
                    <span className="cursor-default hover:bg-[#316AC5] hover:text-white px-1">Edit</span>
                    <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-500 shadow-md w-32 z-50">
                        <div className="p-1 hover:bg-[#316AC5] hover:text-white cursor-pointer" onClick={undo}>Undo (Ctrl+Z)</div>
                    </div>
                </div>
                <span className="cursor-default hover:bg-[#316AC5] hover:text-white px-1">View</span>
                <span className="cursor-default hover:bg-[#316AC5] hover:text-white px-1">Image</span>
                <span className="cursor-default hover:bg-[#316AC5] hover:text-white px-1">Colors</span>
                <span className="cursor-default hover:bg-[#316AC5] hover:text-white px-1">Help</span>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Tools Panel */}
                <div className="w-[50px] flex flex-wrap content-start gap-1 p-1 border-r border-gray-400 bg-[#ECE9D8]">
                    {/* Tool Buttons */}
                    {[
                        { id: 'star', label: '★' }, // Free Select
                        { id: 'select', label: '□' }, // Select
                        { id: 'eraser', label: '▧' },
                        { id: 'bucket', label: '🪣' },
                        { id: 'picker', label: '💉' },
                        { id: 'magnifier', label: '🔍' },
                        { id: 'pencil', label: '✏️' },
                        { id: 'brush', label: '🖌️' },
                        { id: 'spray', label: '💨' },
                        { id: 'text', label: 'A' },
                        { id: 'line', label: '📏' },
                        { id: 'curve', label: '〰️' },
                        { id: 'rect', label: '▭' },
                        { id: 'polygon', label: '⬠' },
                        { id: 'ellipse', label: '⚪' },
                        { id: 'rounded', label: '▢' },
                    ].map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTool(t.id)}
                            className={`w-10 h-10 border flex items-center justify-center text-lg
                            ${tool === t.id ? 'border-b-white border-r-white border-t-gray-600 border-l-gray-600 bg-white' : 'border-t-white border-l-white border-b-gray-600 border-r-gray-600'}`}
                            title={t.id}
                        >
                            {t.label}
                        </button>
                    ))}

                    {/* Tool Options Area */}
                    <div className="w-full h-16 border border-gray-400 mt-1 bg-white flex flex-col items-center justify-center gap-1">
                        <div className="flex flex-col gap-1">
                            <button onClick={() => setLineWidth(1)} className={`flex items-center gap-2 px-1 w-full ${lineWidth === 1 ? 'bg-[#316AC5] text-white' : 'hover:bg-blue-200'}`}><div className={`w-full h-[1px] ${lineWidth === 1 ? 'bg-white' : 'bg-black'}`}></div></button>
                            <button onClick={() => setLineWidth(3)} className={`flex items-center gap-2 px-1 w-full ${lineWidth === 3 ? 'bg-[#316AC5] text-white' : 'hover:bg-blue-200'}`}><div className={`w-full h-[3px] ${lineWidth === 3 ? 'bg-white' : 'bg-black'}`}></div></button>
                            <button onClick={() => setLineWidth(5)} className={`flex items-center gap-2 px-1 w-full ${lineWidth === 5 ? 'bg-[#316AC5] text-white' : 'hover:bg-blue-200'}`}><div className={`w-full h-[5px] ${lineWidth === 5 ? 'bg-white' : 'bg-black'}`}></div></button>
                        </div>
                    </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 bg-[#808080] p-4 overflow-auto relative">
                    <canvas
                        ref={canvasRef}
                        width={600}
                        height={400}
                        className="bg-white cursor-crosshair shadow-[2px_2px_5px_rgba(0,0,0,0.5)]"
                        onMouseDown={startDrawing}
                        onMouseUp={finishDrawing}
                        onMouseMove={draw}
                        onMouseLeave={finishDrawing}
                    />
                    {/* Resize handles */}
                    <div className="absolute right-0 bottom-0 w-1 h-1 bg-blue-500"></div>
                </div>
            </div>

            {/* Colors Palette */}
            <div className="h-[46px] bg-[#ECE9D8] border-t border-gray-400 flex p-1">
                <div className="w-[30px] h-[30px] border border-gray-600 relative bg-white mr-2">
                    <div className="absolute top-1 left-1 w-[15px] h-[15px] z-10 border border-gray-400" style={{ backgroundColor: color }}></div>
                    <div className="absolute bottom-1 right-1 w-[15px] h-[15px] border border-gray-400" style={{ backgroundColor: fillColor }}></div>
                </div>

                <div className="flex flex-wrap w-[250px] gap-[1px]">
                    {colors.map(c => (
                        <button
                            key={c}
                            className="w-[15px] h-[15px] border border-gray-500 hover:border-white"
                            style={{ backgroundColor: c }}
                            onClick={() => setColor(c)}
                            onContextMenu={(e) => { e.preventDefault(); setFillColor(c); }}
                            title={c}
                        />
                    ))}
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-[20px] bg-[#ECE9D8] border-t border-gray-400 flex items-center px-2 text-xs text-gray-600 gap-4">
                <span className="flex-1">For Help, click Help Topics on the Help Menu.</span>
                <span className="border-l border-gray-400 px-2">{tool}</span>
                <span className="border-l border-gray-400 px-2">{historyStep + 1} states</span>
            </div>
        </div>
    );
}
