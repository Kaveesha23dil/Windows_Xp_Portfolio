import React from 'react';

const IMAGES = [
    { id: 'hills', title: 'Blue Hills', src: '/photos/hills.png', size: '1.4 MB' },
    { id: 'sunset', title: 'Sunset', src: '/photos/sunset.png', size: '800 KB' },
    { id: 'winter', title: 'Winter', src: '/photos/winter.png', size: '1.2 MB' },
    { id: 'lilies', title: 'Water Lilies', src: '/photos/lilies.png', size: '950 KB' }
];

const SidebarItem = ({ title, items, icon }) => (
    <div className="mb-4 bg-[#D3E5FA] rounded-t-lg overflow-hidden border-2 border-white shadow-md">
        <div className="bg-gradient-to-r from-[#2257d6] to-[#4076e3] px-3 py-1 flex justify-between items-center cursor-pointer">
            <span className="text-white font-bold text-[11px]">{title}</span>
            <div className="w-4 h-4 rounded-full border border-white/50 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-white"></div>
            </div>
        </div>
        <div className="p-3 bg-[#D3E5FA] flex flex-col gap-1">
            {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 cursor-pointer hover:underline text-[#003399] text-[11px]">
                    {icon && <img src={icon} alt="" className="w-4 h-4" />}
                    <span>{item}</span>
                </div>
            ))}
        </div>
    </div>
);

const FileItem = ({ image, onClick }) => (
    <div
        onClick={() => onClick(image)}
        className="group w-[100px] flex flex-col items-center p-2 border border-transparent hover:bg-[#316AC5]/10 hover:border-[#316AC5]/30 cursor-pointer rounded-sm"
    >
        <div className="w-16 h-16 bg-white p-1 border border-gray-300 shadow-sm flex items-center justify-center mb-1 group-hover:border-[#316AC5]">
            <img src={image.src} alt={image.title} className="max-w-full max-h-full object-contain" />
        </div>
        <span className="text-[11px] text-center text-black leading-tight group-hover:text-[#316AC5] line-clamp-2">
            {image.title}
        </span>
    </div>
);

const MyPictures = ({ onOpenImage }) => {
    return (
        <div className="flex h-full font-[Tahoma,Verdana,sans-serif] bg-white select-none">
            {/* Left Sidebar */}
            <div className="w-[200px] h-full bg-[#6487DB] p-3 overflow-y-auto" style={{ background: 'linear-gradient(to bottom, #7BA2E7 0%, #6379D2 100%)' }}>
                <SidebarItem
                    title="Picture Tasks"
                    items={[
                        "View as a slide show",
                        "Order prints online",
                        "Print this picture",
                        "Set as Desktop Background"
                    ]}
                />
                <SidebarItem
                    title="File and Folder Tasks"
                    items={[
                        "Rename this file",
                        "Move this file",
                        "Copy this file",
                        "Publish this file to the Web",
                        "E-mail this file",
                        "Delete this file"
                    ]}
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white p-5 overflow-y-auto">
                <div className="mb-2 border-b border-[#F0F0F0] pb-1">
                    <span className="font-bold text-[13px] text-[#003399]">My Pictures</span>
                </div>

                <div className="flex flex-wrap gap-4 content-start">
                    {IMAGES.map(img => (
                        <FileItem
                            key={img.id}
                            image={img}
                            onClick={onOpenImage}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyPictures;
