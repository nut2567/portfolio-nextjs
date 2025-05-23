"use client";

import { motion } from "framer-motion";

export default function ContributionWeeks({
  contributionWeeks,
}: {
  contributionWeeks: any[];
}) {
  return (
    <div
      className="border rounded-lg shadow p-4 relative bg-[#0000003d] flex  flex-col items-start"
      style={{
        boxShadow: "#233549 0px 5px 60px inset ",
      }}
    >
      <div className="flex max-w-full overflow-auto">
        <ul>
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <div className="flex flex-col items-start mt-1 ml-3">
          <div className="grid grid-rows-7 grid-flow-col gap-1">
            {contributionWeeks.map((week: any, weekIndex: number) => (
              <div key={weekIndex} className="contents">
                {week.contributionDays.map((day: any, dayIndex: number) => (
                  <motion.div
                    key={dayIndex}
                    className="w-5 h-5 rounded-sm transition-opacity duration-300"
                    style={{ backgroundColor: day.color }}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: weekIndex * 0.1 + dayIndex * 0.05,
                      duration: 0.3,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 gap-4">
        <h1>Less</h1>
        <div
          className="w-28 h-4"
          style={{
            background:
              "linear-gradient(90deg, #fff 0%, #39d353 25%, #26a641  50%, #006d32 75%, #0e4429)",
          }}
        />
        <h1>More</h1>
      </div>
    </div>
  );
}
