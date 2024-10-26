"use client";
export default function Repositories({ repositories, contributionWeeks }: { repositories: any; contributionWeeks: any[] }) {
    console.log(repositories, contributionWeeks);

    return (
        <div className="contributions-grid">
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
                    display: grid;
                    grid-template-columns: repeat(7, 1fr); /* 7 columns for 7 days of the week */
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
    );
}
