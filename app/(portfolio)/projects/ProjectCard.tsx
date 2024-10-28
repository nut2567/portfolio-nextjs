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
        <div className="border rounded-lg shadow p-4">
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