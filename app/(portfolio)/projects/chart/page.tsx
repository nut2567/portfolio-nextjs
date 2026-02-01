import ChartComponent from "@/app/(portfolio)/projects/chart/chartjs";
import PopulationGrowthGraph from "@/app/(portfolio)/projects/chart/chartperyear";
import Chartlegend from "@/app/(portfolio)/projects/chart/chartlegend";
import React, { ViewTransition } from "react";
import Link from "next/link";

export default function PageChart() {
  return (
    <div>
      <div className="bg-gray-800 text-white w-full p-6 rounded-lg text-xl mb-4">
        <ul className="list-none space-y-2 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-400">
            แสดงข้อมูล Total population growth country 1950 to 2021
          </h1>
          <ViewTransition name={"dashboard"}>
            <Link href="/projects">
              <button title={`projects`} className="mt-4">
                <div className="btn btn-primary rounded ">ย้อนกลับ</div>
              </button>
            </Link>
          </ViewTransition>
        </ul>
      </div>
      <div style={{ position: "relative" }} className="mb-20">
        <h2>Top 12 Countries by Population</h2>
        <ChartComponent />
      </div>
      <PopulationGrowthGraph />
    </div>
  );
}
