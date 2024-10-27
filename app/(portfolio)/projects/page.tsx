import { Key, Suspense } from 'react'
import Loading from '../git/loading'
import Image from 'next/image'
import Repositories from './repositories'
export default async function Git() {
    const res = await fetch('https://api.github.com/user/repos', {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`, // ใส่ Token ของคุณแทนที่ YOUR_PERSONAL_ACCESS_TOKEN
        },
    })

    const repositories = await res.json()

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
                                style={{ height: 'auto' }} // กำหนดให้ความสูงปรับตามสัดส่วนของภาพ
                                priority // ใช้ให้ Next.js โหลดภาพนี้เป็น priority
                            />
                        </div>
                        <h1 className="text-xl font-bold text-blue-400">
                            Repositories for nut2567
                        </h1>
                        <h1> {repositories.length} repositories</h1>
                    </ul>
                </div>
                <Repositories repositories={repositories} />
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
        </div>
    )
}
