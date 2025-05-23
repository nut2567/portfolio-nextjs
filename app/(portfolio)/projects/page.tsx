import {
  unstable_ViewTransition as ViewTransition,
  Key,
  Suspense,
} from "react";
import Image from "next/image";
import Repositories from "./repositories";
import ProjectCard, { Project } from "./ProjectCard";
import type { Project as ProjectProp } from "@/types/project";
import OnProject from "./onProject";
import vercelProjects from "./vercelProjects";

export default async function Git() {
  const projects = await vercelProjects();

  const data: ProjectProp[] = [
    {
      name: "Dashboard Total Population Growth",
      Libraries: "Chartjs",
      key: "dashboard",
      link: "/projects/chart",
      randomdelay: Math.random() * 0.5,
      randomdirection: Math.random() > 0.5 ? -100 : 100,
    },
    {
      name: "Motions",
      Libraries: "motion/react",
      key: "motions",
      link: "/projects/motion",
      randomdelay: Math.random() * 0.5,
      randomdirection: Math.random() > 0.5 ? -100 : 100,
    },
    {
      name: "Coding",
      Libraries: "ChatGPT",
      key: "coding",
      link: "/projects/code",
      randomdelay: Math.random() * 0.5,
      randomdirection: Math.random() > 0.5 ? -100 : 100,
    },
  ];

  return (
    <div>
      <div className="bg-gray-800 text-white w-full py-6 rounded-lg text-xl mb-4">
        <ul className="list-none space-y-2 flex items-center gap-4">
          <div className="mx-5">
            <ViewTransition name={`nutimage`}>
              <Image
                className="rounded-full"
                src="/images/nut.jpg"
                alt="me"
                height={0} // ปล่อยค่า height เป็น auto โดย Next.js จะจัดการเอง
                width={150}
                priority // ใช้ให้ Next.js โหลดภาพนี้เป็น priority
              />
            </ViewTransition>
          </div>
          <h1 className="text-3xl font-bold mb-4">Projects</h1>
        </ul>
      </div>
      <div className="container mx-auto p-4">
        <div className=" flex">
          <h1 className="text-xl font-bold text-blue-200 mb-5">
            Project on this {data.length} projects
          </h1>
        </div>
      </div>
      <Suspense>
        <OnProject data={data} />
        <div className="container mx-auto p-4">
          <div className="container mx-auto p-4">
            <div className=" flex">
              <h1 className="text-xl font-bold text-blue-200 mb-5">
                Project other Environment on Vercel {projects.length} projects
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {!projects.length ? (
              <div className="text-center">No projects found.</div>
            ) : (
              projects.map((project: Project, index: number) => {
                project.directionx = Math.random() > 0.5 ? -100 : 100;
                project.directiony = Math.random() > 0.5 ? -100 : 100;
                project.index = index;
                return <ProjectCard key={project.name} project={project} />;
              })
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
