import { Suspense } from "react";
import Image from "next/image";
import Repositories from "./repositories";
import ContributionWeeks from "./contributionWeeks";
import GitProfileHeader from "./GitProfileHeader"; // New component

// Interface for the raw repository data from GraphQL
interface RawRepositoryNode {
  id: string;
  name: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  isPrivate: boolean;
  primaryLanguage?: {
    name: string;
    color: string;
  };
  updatedAt: string;
  createdAt: string;
  licenseInfo?: {
    name: string;
  };
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
  watchers: {
    // Added from GraphQL
    totalCount: number;
  };
}

// Updated Repository interface for processed data
interface Repository {
  id: string;
  name: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  watchers: number; // Transformed from RawRepositoryNode.watchers.totalCount
  isPrivate: boolean;
  primaryLanguage?: {
    name: string;
    color: string;
  };
  updatedAt: string;
  createdAt: string;
  licenseInfo?: {
    name: string;
  };
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
    nodes: RawRepositoryNode[]; // Use RawRepositoryNode here
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
          watchers { # Added watchers here
            totalCount
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

  // เรียกใช้งาน GraphQL API
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // ใส่ Token ของคุณแทนที่ process.env.GITHUB_TOKEN
    },
    next: { revalidate: 3600 }, // Add revalidation
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  const viewer: Viewer | undefined = json?.data?.viewer;

  const rawRepositories: RawRepositoryNode[] | undefined =
    viewer?.repositories?.nodes;
  const contributionsCollection = viewer?.contributionsCollection;
  const contributionCalendar = contributionsCollection?.contributionCalendar;
  const totalContributions = contributionCalendar?.totalContributions;
  const contributionWeeks = contributionCalendar?.weeks;

  const processedRepositories: Repository[] = rawRepositories
    ? rawRepositories.map((repo) => ({
        ...repo,
        watchers: repo.watchers.totalCount,
      }))
    : [];

  return (
    <div className="rounded-lg md:px-12 px-2">
      <GitProfileHeader
        login={viewer?.login}
        avatarUrl={viewer?.avatarUrl}
        repositoriesCount={processedRepositories.length}
        totalContributions={totalContributions}
      />
      <ContributionWeeks contributionWeeks={contributionWeeks ?? []} />
      <Suspense>
        <Repositories repositoriesWithWatchers={processedRepositories} />
      </Suspense>
      <Suspense>
        {/* <RepositoryTable repositoriesWithWatchers={repositoriesWithWatchers} /> */}
      </Suspense>
    </div>
  );
}
