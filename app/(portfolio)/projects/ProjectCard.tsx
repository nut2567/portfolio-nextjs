// app/(portfolio)/projects/ProjectCard.tsx
import React from "react";

export interface Project {
  id: string;
  name: string;
  framework: string;
  createdAt: number;
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
    alias: string[];
  }[];
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div
      className="border rounded-lg shadow p-4 relative bg-[#0000003d] gap-3 grid"
      style={{ boxShadow: "rgba(0, 0, 0, 0.5) 0px -10px 60px inset" }}
    >
      {/* <div className="rounded-lg absolute bottom-0 left-0 h-[60%] w-full bg-gradient-to-b from-[rgba(0,116,224,0)] to-[#99aaba73]"></div> */}
      <h2 className="text-xl font-semibold">{project.name}</h2>
      <p className="text-gray-400">Framework: {project.framework}</p>
      <p className="text-gray-300">
        Domain: {project.latestDeployments[0]?.alias[0]}
      </p>

      <p className="text-gray-100">
        Latest Deployment:{" "}
        {new Date(project.createdAt).toLocaleDateString("th-TH", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
      {project.latestDeployments?.length != 0 ? (
        <>
          <button className="btn btn-primary mt-4">
            <a
              href={`https://${project.latestDeployments[0]?.alias[0]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </a>
          </button>
        </>
      ) : (
        "No deployments"
      )}
    </div>
  );
};

export default ProjectCard;
