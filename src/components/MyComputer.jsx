import React from 'react';

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

const DriveItem = ({ label, type, totalSize, freeSpace, icon, onClick }) => (
    <div
        onClick={onClick}
        className="group w-[280px] h-[70px] flex items-center gap-3 p-1 border border-transparent hover:bg-[#316AC5]/10 hover:border-[#316AC5]/30 cursor-pointer rounded-sm"
    >
        <img src={icon} alt={label} className="w-10 h-10 object-contain ml-2" />
        <div className="flex flex-col">
            <span className="font-bold text-[11px] text-black leading-tight group-hover:text-[#316AC5]">{label}</span>
            <span className="text-[11px] text-gray-600">{type}</span>
            {totalSize && (
                <div className="mt-1 flex gap-2 text-[10px] text-gray-500">
                    <span>Total Size: {totalSize}</span>
                    <span>Free Space: {freeSpace}</span>
                </div>
            )}
        </div>
    </div>
);

const MyComputer = ({ onOpenWindow }) => {
    return (
        <div className="flex h-full font-[Tahoma,Verdana,sans-serif] bg-white select-none">
            {/* Left Sidebar */}
            <div className="w-[200px] h-full bg-[#6487DB] p-3 overflow-y-auto" style={{ background: 'linear-gradient(to bottom, #7BA2E7 0%, #6379D2 100%)' }}>
                <SidebarItem
                    title="System Tasks"
                    items={[
                        "View system information",
                        "Add or remove programs",
                        "Change a setting"
                    ]}
                />
                <SidebarItem
                    title="Other Places"
                    items={[
                        "My Network Places",
                        "My Documents",
                        "Shared Documents",
                        "Control Panel"
                    ]}
                />
                <SidebarItem
                    title="Details"
                    items={[
                        "My Computer",
                        "System Folder"
                    ]}
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white p-5 overflow-y-auto">
                {/* Hard Disk Drives */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2 border-b border-[#F0F0F0] pb-1">
                        <span className="font-bold text-[13px] text-[#003399]">Hard Disk Drives</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <DriveItem
                            label="Local Disk (C:)"
                            type="Local Disk"
                            totalSize="80.0 GB"
                            freeSpace="55.2 GB"
                            icon="/icons/my-computer.png" // Fallback
                            onClick={() => onOpenWindow('c-drive', 'Local Disk (C:)', <div className="p-4">Projects Folder Content Coming Soon...</div>)}
                        />
                        <DriveItem
                            label="Skills (D:)"
                            type="Local Disk"
                            totalSize="120.0 GB"
                            freeSpace="90.5 GB"
                            icon="/icons/my-computer.png" // Fallback
                            onClick={() => onOpenWindow('cmd', 'C:\\WINDOWS\\system32\\cmd.exe', null)} // Will trigger terminal
                        />
                    </div>
                </div>

                {/* Devices with Removable Storage */}
                <div>
                    <div className="flex items-center gap-2 mb-2 border-b border-[#F0F0F0] pb-1">
                        <span className="font-bold text-[13px] text-[#003399]">Devices with Removable Storage</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <DriveItem
                            label="Resume (E:)"
                            type="CD Drive"
                            totalSize="700 MB"
                            freeSpace="0 bytes"
                            icon="/icons/my-computer.png" // Fallback
                            onClick={() => onOpenWindow('resume', 'Resume', <iframe src="/resume.pdf" className="w-full h-full" title="Resume" />)}
                        />
                        <DriveItem
                            label="Contact (A:)"
                            type="3½-Inch Floppy Disk"
                            icon="/icons/my-computer.png" // Fallback
                            onClick={() => onOpenWindow('notepad', 'Contact.txt',
                                <div className="p-2 font-mono bg-white h-full text-black whitespace-pre-wrap">
                                    [CONTACT_INFO]
                                    Email: kaveesha@example.com
                                    Phone: +1 234 567 890
                                    LinkedIn: linkedin.com/in/kaveesha
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComputer;
