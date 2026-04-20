"use client";

import { motion, type Variants, useInView } from "framer-motion";
import { useRef } from "react";

type RepositoryBranch = {
  name: string;
  target: {
    history?: {
      totalCount: number;
    };
  };
};

type Repository = {
  name: string;
  stargazerCount: number;
  watchers: number;
  forkCount: number;
  url: string;
  refs: {
    nodes: RepositoryBranch[];
  };
};

type Props = {
  repositoriesWithWatchers: Repository[];
};

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const RepositoryRow = ({
  index,
  repo,
}: {
  index: number;
  repo: Repository;
}) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const isInView = useInView(ref, { once: true });
  const totalCommits = repo.refs.nodes.reduce((sum, branch) => {
    return sum + (branch.target.history?.totalCount ?? 0);
  }, 0);

  return (
    <tr
      key={repo.name}
      className="bg-base-100 hover:bg-gray-600 flex flex-col md:table-row"
    >
      <td
        className="border border-gray-300 px-4 py-4 md:flex md:items-center"
        ref={ref}
      >
        <motion.div
          className="collapse collapse-plus w-full"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{
            duration: 0.5,
            delay: index * 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <input
            type="checkbox"
            id={`collapse-${repo.name}`}
            className="peer hidden"
          />
          <label className="collapse-title cursor-pointer flex flex-col md:flex-row items-start justify-between p-4 bg-base-200">
            <div style={{ width: "70%" }}>
              <label className="font-bold break-words">
                {index + 1}. {repo.name}
              </label>
              <p>
                Stars {repo.stargazerCount} | Watchers {repo.watchers} | Forks{" "}
                {repo.forkCount}
              </p>
              <p>Total Commits: {totalCommits}</p>
            </div>
            <label
              htmlFor={`collapse-${repo.name}`}
              className="text-blue-500 mt-auto cursor-pointer"
            >
              More Details
            </label>
          </label>

          <div className="collapse-content bg-gray-400 p-4 text-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {repo.refs.nodes.map((branch) => (
                <div key={branch.name} className="flex flex-col border-t pt-2">
                  <p className="font-semibold">Branch: {branch.name}</p>
                  <p>{branch.target.history?.totalCount || 0} commits</p>
                  <div
                    className="my-2 bg-green-600 h-3 rounded"
                    style={{
                      width: `${
                        branch.target.history?.totalCount
                          ? branch.target.history.totalCount * 10
                          : 0
                      }px`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="text-right mt-4">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View Repository
              </a>
            </div>
          </div>
        </motion.div>
      </td>
    </tr>
  );
};

export default function Repositories({ repositoriesWithWatchers }: Props) {
  return (
    <div className="w-full">
      <table className="table-auto w-full border-collapse border border-gray-300 mt-6 text-sm md:text-base">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Repository Details
            </th>
          </tr>
        </thead>
        <tbody>
          {repositoriesWithWatchers.map((repo, index) => (
            <RepositoryRow key={repo.name} repo={repo} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
