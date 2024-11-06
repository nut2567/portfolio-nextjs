"use client";
import { Suspense, useEffect, useState } from "react";
import Loading from "../git/loading";
import Image from "next/image";
import Question from "./question";

async function getRepositories() {}
export default function About() {
  const [repositories, setRepositories] = useState([]);

  const initRepositories = async () => {
    try {
      const res = await getRepositories();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    initRepositories();
  }, []);

  return (
    <div className="flex items-center justify-center ">
      <div className=" -mr-12 w-3/4">
        <Suspense fallback={<Loading />}>
          <div
            className="text-white w-full rounded-lg text-xl mb-4"
            style={{ backgroundColor: "#2e2110", color: "#cac5be" }}
          >
            <ul className="list-none space-y-4 md:space-y-0 md:flex md:space-x-4">
              <div className="w-full md:w-1/3 max-w-72 ">
                <Image
                  className=""
                  src="/images/nut.jpg"
                  alt="me"
                  width={300}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
              </div>
              <div className="p-6 w-full md:w-2/3">
                <h1 className="text-4xl md:text-6xl font-bold">
                  Mr. Nutthawat Witdumrong
                </h1>

                <h1
                  className="text-2xl md:text-4xl font-bold border-t border-lime-400 pt-2"
                  style={{ color: "#5de8ec" }}
                >
                  Software Engineer
                </h1>

                <p className="text-sm md:text-base mt-2">
                  {
                    "I work on both front-end and back-end development, including database management. As a flexible software engineer, I am eager to learn new languages and technologies. I am seeking a challenging position where I can leverage my expertise and contribute to dynamic projects as a front-end or full-stack developer."
                  }
                </p>
              </div>
            </ul>
          </div>
          <Question repositories={[]} />
        </Suspense>
      </div>
    </div>
  );
}
