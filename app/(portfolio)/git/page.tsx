import { Key, Suspense } from 'react'
import Loading from './loading'
import Image from 'next/image'
import Repositories from './repositories'
import prettier from 'prettier'

interface Repository {
  id: string
  name: string
  url: string
  stargazerCount: number
  forkCount: number
  watchers: number
  refs: {
    nodes: {
      name: string
      target: {
        history?: {
          totalCount: number
        }
      }
    }[]
  }
}

interface Viewer {
  login: string
  avatarUrl: string
  url: string
  repositories: {
    nodes: Repository[]
  }
  contributionsCollection: {
    totalCommitContributions: number
    totalIssueContributions: number
    totalPullRequestContributions: number
    totalPullRequestReviewContributions: number
    contributionCalendar: {
      totalContributions: number
      weeks: {
        contributionDays: {
          date: string
          contributionCount: number
          color: string
        }[]
      }[]
    }
  }
}

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
          forkCount
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
  const viewer: Viewer = json.data.viewer
  const repositories: Repository[] = viewer.repositories.nodes
  const contributionsCollection = viewer.contributionsCollection
  const contributionCalendar = contributionsCollection.contributionCalendar
  const totalContributions = contributionCalendar.totalContributions
  const contributionWeeks = contributionCalendar.weeks

  // ดึงข้อมูล watchers สำหรับแต่ละ repository
  const repositoriesWithWatchers = await Promise.all(
    repositories.map(async (repo) => {
      const repoResponse = await fetch(
        `https://api.github.com/repos/${viewer.login}/${repo.name}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        }
      )
      const repoData = await repoResponse.json()
      return {
        ...repo,
        watchers: repoData.watchers_count, // เพิ่ม watchers
      }
    })
  )

  return (
    <div className="rounded-lg ">
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
                style={{ width: '100%', height: 'auto' }}
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
        <Repositories
          repositories={repositoriesWithWatchers}
          contributionWeeks={contributionWeeks}
          viewer={viewer}
        />
      </Suspense>
      <Suspense>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repositoriesWithWatchers.map((repo) => {
            const totalCommits = repo.refs.nodes.reduce(
              (sum: number, branch) => {
                return (
                  sum +
                  (branch.target.history ? branch.target.history.totalCount : 0)
                )
              },
              0
            )

            return (
              <div key={repo.name} className="m-5">
                <div className="card bg-base-100 w-96 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>

                    <div>
                      - ⭐ {repo.stargazerCount} - 👁️ {repo.watchers} watchers -
                      🍴 {repo.forkCount} forks
                      <h2>{repo.name}</h2>
                      <p>Total Commits: {totalCommits}</p>
                      {repo.refs.nodes.map((branch) => (
                        <div
                          key={branch.name}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <p>{branch.name}</p>
                          <p>{branch.target.history?.totalCount} commits</p>
                          <div
                            style={{
                              width: `${branch.target.history?.totalCount ? branch.target.history.totalCount * 10 : 0}px`,
                              height: '10px',
                              backgroundColor: 'green',
                              marginLeft: '8px',
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className="card-actions justify-end">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="btn btn-primary">View</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Suspense>
    </div>
  )
}
