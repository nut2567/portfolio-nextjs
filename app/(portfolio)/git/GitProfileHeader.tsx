import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";

interface GitProfileHeaderProps {
  login?: string;
  avatarUrl?: string;
  repositoriesCount: number;
  totalContributions?: number;
}

export default function GitProfileHeader({
  login,
  avatarUrl,
  repositoriesCount,
  totalContributions,
}: GitProfileHeaderProps) {
  return (
    <div className="bg-gray-800 text-white w-full py-6 rounded-lg text-xl mb-4">
      <ul className="list-none flex flex-col md:flex-row items-center gap-4">
        <div className="mx-5">
          {avatarUrl && (
            <ViewTransition name={`nutimage`}>
              <Image
                className="rounded-full"
                src={avatarUrl}
                alt={login || "User avatar"}
                width={150}
                height={150} // Explicit height
                priority
              />
            </ViewTransition>
          )}
        </div>
        <div>
          {login && (
            <h1 className="text-xl font-bold text-blue-400">
              Repositories for {login}
            </h1>
          )}
          <h1>{repositoriesCount} repositories</h1>
          {totalContributions !== undefined && (
            <h1>{totalContributions} contributions this year</h1>
          )}
        </div>
      </ul>
    </div>
  );
}
