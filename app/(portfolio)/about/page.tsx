"use client";
import { Suspense, useEffect, useState } from "react";
import Loading from "../git/loading";
import Image from "next/image";
import Question from "./question";

const DownloadPdfButton: React.FC = () => {
  const handleDownload = async () => {
    const response = await fetch("/api/download-pdf");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Resume.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload} className="btn btn-primary mb-4">
      Download Resume PDF <i className="material-icons ">download</i>
    </button>
  );
};

export default function About() {
  const [repositories, setRepositories] = useState([]);

  return (
    <div className="grid items-center justify-items-center pb-12">
      <div className="">
        <DownloadPdfButton />
      </div>
      <div className=" w-3/4">
        <Suspense fallback={<Loading />}>
          <div
            className="text-white w-full rounded-lg text-sm md:text-xl mb-4"
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
                <h1 className="text-sm md:text-4xl font-bold">
                  Mr. Nutthawat Witdumrong
                </h1>

                <h1
                  className="text-sm md:text-4xl font-bold border-t border-lime-400 pt-2"
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
        </Suspense>
        <Question repositories={[]} />
      </div>
    </div>
  );
}
