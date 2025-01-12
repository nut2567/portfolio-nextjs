import { Key, Suspense } from "react";
import Loading from "./loading";
import Image from "next/image";
import Repositories, { RepositoryTable } from "./repositories";
import ContributionWeeks from "./contributionWeeks";
import prettier from "prettier";

interface Repository {
  id: string;
  name: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  watchers: number;
  refs: {
    nodes: {
      name: string;
      target: {
        history?: {
          totalCount: number;
        };
      };
    }[];
  };
}

interface Viewer {
  login: string;
  avatarUrl: string;
  url: string;
  repositories: {
    nodes: Repository[];
  };
  contributionsCollection: {
    totalCommitContributions: number;
    totalIssueContributions: number;
    totalPullRequestContributions: number;
    totalPullRequestReviewContributions: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: {
        contributionDays: {
          date: string;
          contributionCount: number;
          color: string;
        }[];
      }[];
    };
  };
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
`;
  // Format the query using Prettier
  const formattedQuery = prettier.format(query, { parser: "graphql" });

  // เรียกใช้งาน GraphQL API
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // ใส่ Token ของคุณแทนที่ process.env.GITHUB_TOKEN
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  const viewer: Viewer = json.data.viewer;
  const repositories: Repository[] = viewer.repositories.nodes;
  const contributionsCollection = viewer.contributionsCollection;
  const contributionCalendar = contributionsCollection.contributionCalendar;
  const totalContributions = contributionCalendar.totalContributions;
  const contributionWeeks = contributionCalendar.weeks;

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
      );
      const repoData = await repoResponse.json();
      return {
        ...repo,
        watchers: repoData.watchers_count, // เพิ่ม watchers
      };
    })
  );

  return (
    <div className="rounded-lg md:px-12">
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
                style={{ width: "100%", height: "auto" }}
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
        <ContributionWeeks
          repositories={repositoriesWithWatchers}
          contributionWeeks={contributionWeeks}
          viewer={viewer}
        />
      </Suspense>
      <Suspense>
        <Repositories repositoriesWithWatchers={repositoriesWithWatchers} />
      </Suspense>
      <Suspense>
        {/* <RepositoryTable repositoriesWithWatchers={repositoriesWithWatchers} /> */}
      </Suspense>
    </div>
  );
}
