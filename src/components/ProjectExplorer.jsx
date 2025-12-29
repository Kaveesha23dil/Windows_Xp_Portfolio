import React from 'react';

// Sample Project Data - in a real app this might come from an API or separate file
const PROJECTS = [
    {
        id: 'modern-bar',
        title: 'Modern Bar Website',
        icon: '/icons/folder.png',
        image: '/projects/barwebsite.png',
        description: 'A stunning, modern luxury bar website with a dark moody aesthetic, elegant typography, and gold accents. Features a professional UI design with a hero section showcasing signature cocktails.',
        github: 'https://github.com/Kaveesha23dil/cocltails_website',
        tech: ['React', 'TailwindCSS', 'GSAP']
    },
    {
        id: 'project-1',
        title: '3D City Portfolio',
        icon: '/icons/folder.png',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop',
        description: 'A 3D interactive portfolio featuring a navigable city environment built with React, Three.js, and TailwindCSS.',
        github: 'https://github.com/kaveesha/city-portfolio',
        tech: ['React', 'Three.js', 'Tailwind']
    },
    {
        id: 'project-2',
        title: 'E-Commerce Platform',
        icon: '/icons/folder.png',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2670&auto=format&fit=crop',
        description: 'A full-stack e-commerce solution with cart functionality, payment processing, and admin dashboard.',
        github: 'https://github.com/kaveesha/ecommerce',
        tech: ['Next.js', 'Stripe', 'MongoDB']
    },
    {
        id: 'project-3',
        title: 'Task Manager App',
        icon: '/icons/folder.png',
        image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=2532&auto=format&fit=crop',
        description: 'A productivity application for managing daily tasks and team collaboration with real-time updates.',
        github: 'https://github.com/kaveesha/task-manager',
        tech: ['React', 'Firebase', 'Redux']
    },
    {
        id: 'project-4',
        title: 'Weather Dashboard',
        icon: '/icons/folder.png',
        image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2670&auto=format&fit=crop',
        description: 'Real-time weather tracking application using OpenWeatherMap API with data visualization.',
        github: 'https://github.com/kaveesha/weather-app',
        tech: ['Vue.js', 'Chart.js', 'API']
    }
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

const ProjectItem = ({ project, onClick }) => (
    <div
        onClick={() => onClick(project)}
        className="group w-[100px] flex flex-col items-center p-2 border border-transparent hover:bg-[#316AC5]/10 hover:border-[#316AC5]/30 cursor-pointer rounded-sm"
    >
        <img src={project.icon} alt={project.title} className="w-12 h-12 object-contain mb-1" />
        <span className="text-[11px] text-center text-black leading-tight group-hover:text-[#316AC5] line-clamp-2">
            {project.title}
        </span>
    </div>
);

const ProjectExplorer = ({ onOpenProject }) => {
    return (
        <div className="flex h-full font-[Tahoma,Verdana,sans-serif] bg-white select-none">
            {/* Left Sidebar */}
            <div className="w-[200px] h-full bg-[#6487DB] p-3 overflow-y-auto" style={{ background: 'linear-gradient(to bottom, #7BA2E7 0%, #6379D2 100%)' }}>
                <SidebarItem
                    title="Project Tasks"
                    items={[
                        "View project details",
                        "Visit GitHub repo",
                        "View live demo"
                    ]}
                />
                <SidebarItem
                    title="Other Places"
                    items={[
                        "My Computer",
                        "My Documents",
                        "Desktop"
                    ]}
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white p-5 overflow-y-auto">
                <div className="mb-2 border-b border-[#F0F0F0] pb-1">
                    <span className="font-bold text-[13px] text-[#003399]">Projects</span>
                </div>

                <div className="flex flex-wrap gap-4 content-start">
                    {PROJECTS.map(project => (
                        <ProjectItem
                            key={project.id}
                            project={project}
                            onClick={onOpenProject}
                        />
                    ))}
                </div>

                <div className="mt-8 mb-2 border-b border-[#F0F0F0] pb-1">
                    <span className="font-bold text-[13px] text-[#003399]">Details</span>
                </div>
                <div className="text-[11px] text-gray-600 px-2">
                    Select a project to view its details.
                </div>
            </div>
        </div>
    );
};

export default ProjectExplorer;
