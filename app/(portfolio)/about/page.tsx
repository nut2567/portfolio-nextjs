'use client'
import { Key, Suspense, useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import Loading from '../git/loading'
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
                        <h1 className="text-xl font-bold text-blue-400">
                            Repositories for nut2567
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
