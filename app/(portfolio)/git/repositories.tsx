"use client";
type Repository = {
  name: string;
  stargazerCount: number;
  watchers: number;
  forkCount: number;
  url: string;
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
};

type Props = {
  repositoriesWithWatchers: Repository[];
};
export default function Repositories({ repositoriesWithWatchers }: Props) {
  console.log(repositoriesWithWatchers);

  return (
    <>
      <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 px-4 py-2 text-left">
              Repository Details
            </th>
          </tr>
        </thead>
        <tbody>
          {repositoriesWithWatchers.map((repo, Index) => {
            const totalCommits = repo.refs.nodes.reduce(
              (sum: number, branch) => {
                return (
                  sum +
                  (branch.target.history ? branch.target.history.totalCount : 0)
                );
              },
              0
            );

            return (
              <tr key={repo.name} className="bg-base-100 hover:bg-gray-600">
                <td className="border border-gray-300 px-4 py-4">
                  <div className="collapse collapse-plus w-full border  border-gray-300">
                    <input
                      type="checkbox"
                      id={`collapse-${repo.name}`}
                      className="peer hidden"
                    />
                    <label
                      htmlFor={`collapse-${repo.name}`}
                      className="collapse-title cursor-pointer flex items-center justify-between p-4 bg-base-200"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold">
                          {Index + 1}. - {repo.name}
                        </span>
                        <span>
                          ⭐ {repo.stargazerCount} | 👁️ {repo.watchers} watchers
                          | 🍴 {repo.forkCount} forks
                        </span>
                        <span>Total Commits: {totalCommits}</span>
                      </div>
                      <span className="text-blue-500">Details</span>
                    </label>

                    <div className="collapse-content bg-gray-400 p-4 text-gray-800">
                      <div className="grid smb:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 w-full">
                        {repo.refs.nodes.map((branch) => (
                          <div
                            key={branch.name}
                            className="flex flex-col items-start justify-start"
                          >
                            <p className="font-semibold ">
                              Branch: {branch.name}
                            </p>
                            <p>
                              {branch.target.history?.totalCount || 0} commits
                            </p>
                            <div
                              className="my-3 bg-green-600 h-3 rounded"
                              style={{
                                width: `${
                                  branch.target.history?.totalCount
                                    ? branch.target.history.totalCount * 10
                                    : 0
                                }px`,
                              }}
                            ></div>
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
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export function RepositoryTable({ repositoriesWithWatchers }: Props) {
  return (
    <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="border border-gray-300 px-4 py-2 text-left">
            Repository Details
          </th>
        </tr>
      </thead>
      <tbody>
        {repositoriesWithWatchers.map((repo) => {
          const totalCommits = repo.refs.nodes.reduce(
            (sum, branch) => sum + (branch.target.history?.totalCount || 0),
            0
          );

          return (
            <tr
              key={repo.name}
              className="bg-white hover:bg-gray-100 transition-colors"
            >
              <td className="border border-gray-300 px-4 py-4">
                <div className="collapse collapse-plus bg-gray-50 border border-gray-300">
                  <input
                    type="checkbox"
                    id={`collapse-${repo.name}`}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={`collapse-${repo.name}`}
                    className="collapse-title cursor-pointer flex items-center justify-between p-4"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">
                        {repo.name}
                      </span>
                      <span className="text-gray-600 text-sm">
                        ⭐ {repo.stargazerCount} | 👁️ {repo.watchers} watchers |
                        🍴 {repo.forkCount} forks
                      </span>
                      <span className="text-gray-500 text-sm">
                        Total Commits: {totalCommits}
                      </span>
                    </div>
                    <span className="text-blue-500 font-semibold">Details</span>
                  </label>

                  <div className="collapse-content bg-white p-4">
                    <div className="space-y-4">
                      {repo.refs.nodes.map((branch) => (
                        <div
                          key={branch.name}
                          className="flex flex-col items-start justify-start"
                        >
                          <p className="font-semibold text-gray-800">
                            Branch: {branch.name}
                          </p>
                          <p className="text-gray-600">
                            {branch.target.history?.totalCount || 0} commits
                          </p>
                          <div
                            className="my-3 bg-green-600 h-3 rounded"
                            style={{
                              width: `${
                                branch.target.history?.totalCount
                                  ? branch.target.history.totalCount * 10
                                  : 0
                              }px`,
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className="text-right mt-4">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      >
                        View Repository
                      </a>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
