import { Key, Suspense } from "react";
import Loading from "../git/loading";
import Image from "next/image";
import Repositories from "./repositories";
import ProjectCard, { Project } from "./ProjectCard";

const vercelProjects = async () => {
  let projects = [];

  try {
    const response = await fetch(`https://api.vercel.com/v9/projects`, {
      headers: {
        Authorization: `Bearer ${process.env.vercel_token}`,
      },
    });
    const data = await response.json();
    console.log(
      "vercelProjectsData >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      data
    );
    projects = data.projects || []; // ตรวจสอบว่า data.projects มีอยู่ไหม
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return projects;
};

export default async function Git() {
  const projects = await vercelProjects();

  if (!projects.length) {
    return <div className="text-center">No projects found.</div>; // แสดงข้อความเมื่อไม่มีโปรเจกต์
  }

  return (
    <div
      className="-m-12 p-12 h-dvh"
      style={{
        background:
          "linear-gradient(90deg, #001930 0%, #00488a 35%, #00488a 50%, #00488a 65%, #001930)",
      }}
    >
      <Suspense fallback={<Loading />}>
        <div className="bg-gray-800 text-white w-full py-6 rounded-lg text-xl mb-4">
          <ul className="list-none space-y-2 flex items-center gap-4">
            <div className="mx-5">
              <Image
                className="rounded-full"
                src="/images/nut.jpg"
                alt="me"
                width={50} // กำหนดความกว้างของรูปภาพ
                height={0} // ปล่อยค่า height เป็น auto โดย Next.js จะจัดการเอง
                style={{ width: "100%", height: "auto" }} // กำหนดให้ความสูงปรับตามสัดส่วนของภาพ
                priority // ใช้ให้ Next.js โหลดภาพนี้เป็น priority
              />
            </div>
            <h1 className="text-3xl font-bold mb-4">Projects</h1>
          </ul>
        </div>
        {/* <Repositories repositories={[]} data={[]} projects={projects} /> */}
        <ul></ul>
        <div className="container mx-auto p-4">
          <div className=" flex">
            <h1 className="text-xl font-bold text-blue-200 mb-5">
              Project other Environment on Vercel {projects.length} projects
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
