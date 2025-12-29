import React from 'react';

const ProjectDetail = ({ project }) => {
    if (!project) return <div>No project selected</div>;

    return (
        <div className="flex flex-col h-full bg-[#ECE9D8] font-[Tahoma,Verdana,sans-serif] p-2">
            <div className="bg-white border text-sm border-[#7F9DB9] p-4 flex-1 overflow-y-auto">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-24 h-24 bg-gray-100 border border-gray-300 flex items-center justify-center shrink-0">
                        {/* Placeholder or actual project logo/thumb */}
                        <img src={project.icon} alt="icon" className="w-16 h-16 object-contain" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-black mb-1">{project.title}</h1>
                        <div className="text-xs text-gray-500 mb-2">My Projects / {project.title}</div>
                        <div className="flex gap-2">
                            {project.tech.map((t, i) => (
                                <span key={i} className="px-2 py-[2px] bg-[#E1EAF7] text-[#003399] border border-[#AABCCF] rounded text-[10px]">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#D6D3CE] pt-4 mb-4">
                    <img
                        src={project.image}
                        alt="Project screenshot"
                        className="w-full max-w-[600px] border border-gray-400 shadow-sm mb-4 block"
                    />
                    <h3 className="font-bold text-sm mb-2 text-[#003399]">Description</h3>
                    <p className="text-sm text-black leading-relaxed mb-4">
                        {project.description}
                    </p>

                    <h3 className="font-bold text-sm mb-2 text-[#003399]">Links</h3>
                    <div className="flex gap-4">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline text-[#0000FF] text-sm"
                        >
                            <img src="/icons/github.png" alt="" className="w-4 h-4" />
                            View on GitHub
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-2 gap-2">
                <button className="px-4 py-1 bg-[#ECE9D8] border border-gray-400 shadow-[inset_-1px_-1px_1px_#404040,inset_1px_1px_1px_white] active:shadow-[inset_1px_1px_1px_#404040] text-black text-sm">
                    OK
                </button>
            </div>
        </div>
    );
};

export default ProjectDetail;
