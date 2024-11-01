'use client'
export default function Repositories({
  repositories,
  contributionWeeks,
  viewer
}: {
  repositories: any
  contributionWeeks: any[]
  viewer: any
}) {
  console.log(repositories, contributionWeeks, viewer)

  return (
    <div className="flex items-center justify-center">
      <div className="contributions-grid rotate-180">
        {contributionWeeks.map((week: any, weekIndex: number) => (
          <div key={weekIndex} className="week-row">
            {week.contributionDays.map((day: any, dayIndex: number) => (
              <div
                key={dayIndex}
                className="day-cell"
                style={{ backgroundColor: day.color }}
                title={`${day.contributionCount} contributions on ${day.date}`}
              />
            ))}
          </div>
        ))}
        <style jsx>{`
        .contributions-grid {
          display: inline-grid;
          grid-template-columns: repeat(
            7,
            1fr
          ); /* 7 columns for 7 days of the week */
          grid-gap: 4px;
        }
        .week-row {
          display: contents;
        }
        .day-cell {
          width: 16px;
          height: 16px;
          border-radius: 2px;
          transition: background-color 0.3s;
        }
        .day-cell:hover {
          opacity: 0.8;
        }
      `}</style>
      </div>
    </div>
  )
}
