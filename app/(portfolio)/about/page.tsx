'use client'
import { Suspense, useEffect, useState } from 'react'
import Loading from '../git/loading'
import Image from 'next/image';
async function getRepositories() {

}
export default function About() {
    const [repositories, setRepositories] = useState([])

    const initRepositories = async () => {
        try {
            const res = await getRepositories()
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        initRepositories()
    }, [])

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <div className="bg-gray-800 text-white w-full p-6 rounded-lg text-xl mb-4">
                    <ul className="list-none space-y-2">
                        <div className="mx-5">
                            <Image
                                className="rounded-full"
                                src="/images/nut.jpg"
                                alt="me"
                                width={50}
                                height={0}
                                style={{ width: "100%", height: "auto" }}
                                priority
                            />
                        </div>
                        <h1 className="text-xl font-bold text-blue-400">
                            Content commingsoon.......
                        </h1>
                    </ul>
                </div>
                <ul>
                    {/* {repositories.map((repo: { id: Key, html_url: string; name: string; }) => (
                        <li key={repo.id}>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                {repo.name}
                            </a>
                        </li>
                    ))} */}
                </ul>
            </Suspense>
        </div>
    )
}
