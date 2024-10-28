import { Key, Suspense } from 'react'
import Loading from './loading'
import Image from 'next/image'
import Repositories from './repositories'
import prettier from 'prettier'

export default async function Git() {
    // สร้าง GraphQL query
    const query = `
  query {
    viewer {
      login
      avatarUrl
      url
      repositories(first: 20) {
        nodes {
          id
          name
          url
          stargazerCount
          forkCount // ดึงข้อมูล forkCount
          isPrivate
          primaryLanguage {
            name
            color
          }
          updatedAt
          createdAt
          licenseInfo {
            name
          }
          refs(refPrefix: "refs/heads/", first: 10) {
            nodes {
              name
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`
    // Format the query using Prettier
    const formattedQuery = prettier.format(query, { parser: 'graphql' })

    // เรียกใช้งาน GraphQL API
    const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // ใส่ Token ของคุณแทนที่ process.env.GITHUB_TOKEN
        },
        body: JSON.stringify({ query }),
    })

    const json = await res.json()
    const viewer = json.data.viewer
    const repositories = viewer.repositories.nodes
    const contributionsCollection = viewer.contributionsCollection
    const contributionCalendar = contributionsCollection.contributionCalendar
    const totalContributions = contributionCalendar.totalContributions
    const contributionWeeks = contributionCalendar.weeks

    // ดึงข้อมูล watchers สำหรับแต่ละ repository
    const repositoriesWithWatchers = await Promise.all(repositories.map(async (repo: any) => {
        const repoResponse = await fetch(`https://api.github.com/repos/${viewer.login}/${repo.name}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        });
        const repoData = await repoResponse.json();
        return {
            ...repo,
            watchers: repoData.watchers_count, // เพิ่ม watchers
        };
    }));

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
                                width={50}
                                height={0}
                                style={{ height: 'auto' }}
                                priority
                            />
                        </div>
                        <h1 className="text-xl font-bold text-blue-400">
                            Repositories for {viewer.login}
                        </h1>
                        <h1>{repositoriesWithWatchers.length} repositories</h1>
                        <h1>{totalContributions} contributions this year</h1>
                    </ul>
                </div>
                <ul>
                    {repositoriesWithWatchers.map(
                        (repo: any) => (
                            <li key={repo.id}>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {repo.name} - ⭐ {repo.stargazerCount} - 👁️ {repo.watchers} watchers - 🍴 {repo.forkCount} forks
                                </a>
                            </li>
                        )
                    )}
                </ul>
                <Repositories
                    repositories={repositoriesWithWatchers}
                    contributionWeeks={contributionWeeks}
                    viewer={viewer}
                />
            </Suspense>

            <h1>{`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`}</h1>
            <Suspense>
                <div>
                    {repositoriesWithWatchers.map((repo: any) => {
                        const totalCommits = repo.refs.nodes.reduce((sum: number, branch: any) => {
                            return sum + (branch.target.history ? branch.target.history.totalCount : 0);
                        }, 0);

                        return (
                            <div key={repo.name}>- ⭐ {repo.stargazerCount} - 👁️ {repo.watchers} watchers - 🍴 {repo.forkCount} forks
                                <h2>{repo.name}</h2>
                                <p>Total Commits: {totalCommits}</p>
                                {repo.refs.nodes.map((branch: any) => (
                                    <div key={branch.name} style={{ display: 'flex', alignItems: 'center' }}>
                                        <p>{branch.name}</p>
                                        <p>{branch.target.history.totalCount} commits</p>
                                        <div style={{
                                            width: `${branch.target.history.totalCount * 10}px`,
                                            height: '10px',
                                            backgroundColor: 'green',
                                            marginLeft: '8px'
                                        }}></div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </Suspense>
        </div>
    )
}
