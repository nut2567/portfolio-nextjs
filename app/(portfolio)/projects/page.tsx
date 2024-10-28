import { Key, Suspense } from 'react'
import Loading from '../git/loading'
import Image from 'next/image'
import Repositories from './repositories'
import ProjectCard, { Project } from './ProjectCard';

const fetchProjects = async () => {
    let projects = [];

    try {
        const response = await fetch(`https://api.vercel.com/v9/projects`, {
            headers: {
                Authorization: `Bearer ${process.env.vercel_token}`,
            },
        });
        const data = await response.json();
        projects = data.projects || []; // ตรวจสอบว่า data.projects มีอยู่ไหม
    } catch (error) {
        console.error("Error fetching projects:", error);
    }

    return projects;
};

const ProjectList = async () => {
    const projects = await fetchProjects();

    if (!projects.length) {
        return <div className="text-center">No projects found.</div>; // แสดงข้อความเมื่อไม่มีโปรเจกต์
    }
}

export default async function Git() {
    const res = await fetch('https://api.github.com/user/repos', {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`, // ใส่ Token ของคุณแทนที่ YOUR_PERSONAL_ACCESS_TOKEN
        },
    })

    const repositories = await res.json()



    const vercelProjects = async () => {
        try {
            const response = await fetch(`https://api.vercel.com/v9/projects`, {
                headers: {
                    Authorization: `Bearer ${process.env.vercel_token}`,
                },
            });
            const data = await response.json();
            console.log("vercelProjectsData >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
            return data;
        } catch (error) {
            console.error("Error:", error);
            return null; // คืนค่า null ในกรณีที่มี error
        }
    };


    const vercelProjectsData = await vercelProjects();

    const projects = await fetchProjects();

    if (!projects.length) {
        return <div className="text-center">No projects found.</div>; // แสดงข้อความเมื่อไม่มีโปรเจกต์
    }


    return (
        <div>
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
                                style={{ width: "100%", height: "auto" }}  // กำหนดให้ความสูงปรับตามสัดส่วนของภาพ
                                priority // ใช้ให้ Next.js โหลดภาพนี้เป็น priority
                            />
                        </div>
                        <h1 className="text-xl font-bold text-blue-400">
                            Repositories for nut2567
                        </h1>
                        <h1> {repositories.length} repositories</h1>
                    </ul>
                </div>
                <Repositories repositories={repositories}
                    data={vercelProjectsData}
                    projects={projects} />
                <ul>
                    {repositories.map(
                        (repo: { id: Key; html_url: string; name: string }) => (
                            <li key={repo.id}>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {repo.name}
                                </a>
                            </li>
                        )
                    )}
                </ul>
            </Suspense>

            <Suspense>
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-4">Projects</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project: Project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </Suspense>
        </div>
    )
}
