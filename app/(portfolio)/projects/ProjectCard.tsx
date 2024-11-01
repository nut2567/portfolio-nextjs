// app/(portfolio)/projects/ProjectCard.tsx
import React from 'react';

export interface Project {
    id: string;
    name: string;
    targets: {
        production: {
            alias: string[];
            domain: string[];
        };
    };
    latestDeployments: {
        uid: string;
        state: string;
        url: string;
    }[];
}

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="border rounded-lg shadow p-4 relative bg-[#0000003d] shadow-[]"
            style={{ boxShadow: "rgba(0, 0, 0, 0.5) 0px -10px 60px inset" }}>
            {/* <div className="rounded-lg absolute bottom-0 left-0 h-[60%] w-full bg-gradient-to-b from-[rgba(0,116,224,0)] to-[#99aaba73]"></div> */}
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-gray-600">Aliases: </p>
            <p className="text-gray-600">Domain: </p>
            <p className="text-gray-500">Latest Deployment: {project.latestDeployments[0]?.state || 'No deployments'}</p>
            <a href={project.latestDeployments[0]?.url} className="text-blue-500 hover:underline">
                View Project
            </a>
        </div>
    );
};

export default ProjectCard