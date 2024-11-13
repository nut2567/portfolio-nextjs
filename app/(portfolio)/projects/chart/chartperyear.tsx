"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ErrorComponent from "@/components/layouts/ErrorComponent";

ChartJS.register(...registerables, ChartDataLabels);

interface PopulationData {
  Country: string;
  Year: number;
  Population: number;
}

const PopulationGrowthGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Population Growth",
        data: [] as number[],
        backgroundColor: [] as string[],
        borderColor: [] as string[],
        borderWidth: 1,
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [worldPopulation, setWorldPopulation] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [strikedKeys, setStrikedKeys] = useState<string[]>([]);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const years = Array.from({ length: 72 }, (_, i) => 1950 + i); // ปี 1950-2020
  const [isRunning, setIsRunning] = useState(false);
  const [legend, setLegend] = useState([] as string[]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const [continentCountries, setContinentCountries] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchContinents = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countries = await response.json();

        const continentData: Record<string, string[]> = {};

        countries.forEach((country: any) => {
          const continent = country.region;
          const countryName = country.name.common;

          if (continent) {
            if (!continentData[continent]) {
              continentData[continent] = [];
            }
            continentData[continent].push(countryName);
          }
        });
        console.log(continentData);
        // ตรวจสอบประเทศที่ถูกตีตรา
        //  const excludedCountries = {
        //     : [],
        //     : [],
        //     : []
        // };
        continentData["Asia"] = [
          ...continentData["Asia"],
          "East Timor",
          "Macao",
        ];
        continentData["Americas"] = [...continentData["Americas"], "Curacao"];
        continentData["Africa"] = [...continentData["Africa"], "Saint Helena"];
        setContinentCountries(continentData);
      } catch (err) {
        console.error("Error fetching continent data:", err);
      }
    };

    fetchContinents();
  }, []);

  const fetchPopulationData = async (
    year: number,
    steb: number
  ): Promise<PopulationData[]> => {
    try {
      const res = await fetch(`/api/population?year=${year}&steb=${steb}`);
      const jsonData = await res.json();
      return res.ok ? jsonData : [];
    } catch (err) {
      setError("Failed to fetch data");
      return [];
    }
  };

  const updateChartData = (data: PopulationData[]) => {
    const groupedData = data.reduce(
      (acc, row) => {
        if (row.Country !== "World") {
          acc[row.Country] = (acc[row.Country] || 0) + row.Population;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    setWorldPopulation(
      data.find((row) => row.Country === "World")?.Population || 0
    );

    const sortedCountries = Object.entries(groupedData)
      .sort(([, a], [, b]) => b - a)
      .map(([country]) => country)
      .filter((row) => {
        // ฟิลเตอร์ประเทศที่ไม่มีอยู่ในทวีป
        return !Object.keys(continentCountries).some((key) => {
          if (strikedKeys.includes(key)) {
            // เช็คว่า key ถูกตีตราหรือไม่

            // ถ้าคีย์ถูกตีตรา ให้ตรวจสอบชื่อประเทศ
            return (
              continentCountries[key]?.includes(row) ||
              continentCountries[key].includes(row)
            );
          }
          return false; // ถ้าไม่ถูกตีตราให้ไม่ฟิลเตอร์
        });
      })
      .slice(0, 12);

    setChartData({
      labels: sortedCountries,
      datasets: [
        {
          label: "Total Population",
          data: sortedCountries.map((country) => groupedData[country]),
          backgroundColor: sortedCountries.map(
            (_, index) => `hsl(${index * 30}, 50%, 50%)`
          ),
          borderColor: [],
          borderWidth: 1,
        },
      ],
    });
  };
  useEffect(() => {
    const year = years[currentYearIndex];
    // console.log('year', year, currentYearIndex);
    // setTimeout(() => {
    //     fetchPopulationData(year, 4)
    //         .then((data) => {
    //             updateChartData(data);
    //         })
    // }, 250);
    // setTimeout(() => {
    //     fetchPopulationData(year, 3)
    //         .then((data) => {
    //             updateChartData(data);
    //         })
    // }, 500);
    // setTimeout(() => {
    //     fetchPopulationData(year, 2)
    //         .then((data) => {
    //             updateChartData(data);
    //         })
    // }, 750);
    // setTimeout(() => {
    fetchPopulationData(year, 1).then((data) => {
      updateChartData(data);
    });
    // }, 1000);
  }, [currentYearIndex, strikedKeys]);

  const startFetchingData = () => {
    if (!isRunning && currentYearIndex < years.length) {
      setIsRunning(true);
      const id = setInterval(async () => {
        setCurrentYearIndex((prevIndex) => {
          if (prevIndex + 1 < years.length) {
            return prevIndex + 1;
          } else {
            // clearInterval(id);
            // setIsRunning(false);
            return 0;
          }
        });
      }, 200);
      setIntervalId(id);
    }
  };

  const stopFetchingData = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIsRunning(false);
    }
  };

  // ฟังก์ชันการจัดการเมื่อเลื่อนเส้นเวลา
  const handleTimelineChange = (event: any) => {
    const index = years.indexOf(parseInt(event.target.value));
    console.log(index); // ผลลัพธ์จะเป็น 50
    setCurrentYearIndex(index);
  };

  const options: any = {
    responsive: true,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "#FFF", // สีของตัวเลข
        font: {
          weight: "bold",
          size: 20,
        },
        anchor: "end", // ตำแหน่ง anchor ของ label
        align: "center", // จัดตำแหน่ง label ให้ด้านบนของแท่ง
        offset: -50, // เพิ่ม offset ให้ขยับเข้าไปใกล้ตรงกลาง (ค่าติดลบขยับไปด้านในแท่ง)
        formatter: (value: number) => value.toLocaleString(), // ฟอร์แมตตัวเลข
      },
    },
    animation: {
      onComplete: () => {
        // code สำหรับสิ่งที่คุณต้องการทำเมื่อ animation เสร็จสิ้น
      },
      delay: (context: any) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default") {
          delay = context.dataIndex * 300; // ตั้งค่า delay ตาม index ของข้อมูล
        }
        return delay;
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Population",
        },

        grid: {
          display: true,
          color: "rgba(100, 100, 100, 0.5)", // สีของเส้นแนวตั้ง (เส้นไม้บรรทัด)
          lineWidth: 1,
        },
        ticks: {
          callback: (value: number) => value.toLocaleString(), // แสดงจำนวนในรูปแบบคั่นด้วยลูกน้ำ
        },
      },
      y: {
        title: {
          display: true,
          text: "Country",
        },
      },
    },
  };

  const handleClick = (key: string) => {
    setStrikedKeys(
      (prevStrikedKeys) =>
        prevStrikedKeys.includes(key)
          ? prevStrikedKeys.filter((k) => k !== key) // Remove key if it already exists
          : [...prevStrikedKeys, key] // Add key if it doesn't exist
    );
  };

  if (error)
    return (
      <div>
        <ErrorComponent message={error} />
      </div>
    );

  return (
    <div>
      <div className="bg-gray-800 text-white w-full p-6 rounded-lg text-xl mb-4">
        <ul className="list-none space-y-2">
          <h1 className="text-xl font-bold text-blue-400">
            แสดงข้อมูล Population growth per country 1950 to 2021
          </h1>
        </ul>
      </div>
      <div className="flex gap-5 mr-6 items-center justify-center">
        <p className="font-bold">Region</p>
        {Object.keys(continentCountries).map((key, index) => (
          <div
            key={index}
            className={`flex items-center cursor-pointer p-4 inline-block ${
              strikedKeys.includes(key) ? "line-through" : ""
            }`}
            onClick={() => handleClick(key)}
          >
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: `hsl(${index * 30}, 50%, 50%)`,
                marginRight: 8,
              }}
            />
            <span className="text-gray-700">{key}</span>
          </div>
        ))}
      </div>
      <div style={{ position: "relative" }}>
        <Bar data={chartData} options={options} />
        <div
          style={{
            position: "absolute",
            bottom: 250,
            right: 0,
            fontWeight: "bold",
            padding: "10px",
          }}
        >
          <h1 style={{ fontSize: "24px" }}>
            World Population: {worldPopulation.toLocaleString() || "N/A"}
          </h1>
          <h1 style={{ fontSize: "44px" }}>{years[currentYearIndex]}</h1>
        </div>

        {/* เส้นไทม์ไลน์ที่แสดงทุก 5 ปี */}
        <div className="flex justify-between items-center mt-8 border-t-2 border-dashed border-gray-400 pt-4"></div>
        <div className="flex justify-between items-center -ml-2 pr-3">
          {years
            .filter((year) => year % 5 === 0)
            .map((year) => (
              <span key={year} className="text-xs text-gray-600">
                {year}
              </span>
            ))}
        </div>

        {/* เส้น Timeline */}
        <input
          type="range"
          min={years[0]}
          max={years[years.length - 1]}
          value={years[currentYearIndex]}
          onChange={handleTimelineChange}
          style={{ width: "100%", marginTop: "20px" }}
        />

        <div className="mt-4">
          {isRunning ? (
            <button
              onClick={stopFetchingData}
              className="px-4 py-2 font-bold bg-red-500 text-white flex rounded-lg items-center shadow-lg transition-transform transform hover:scale-110"
            >
              <i className="material-icons  mr-2">stop_circle</i> หยุด
            </button>
          ) : (
            <button
              onClick={startFetchingData}
              className="px-4 py-2 bg-green-500 text-white flex rounded items-center shadow-lg transition-transform transform hover:scale-110"
            >
              <i className="material-icons mr-2">play_circle</i> เริ่มต้น
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopulationGrowthGraph;
