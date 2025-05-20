"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ErrorComponent from "@/components/layouts/ErrorComponent";
import Link from "next/link";
Chart.register(...registerables);

interface PopulationData {
  Country: string;
  Year: number;
  Population: number;
}

const ChartComponent = () => {
  const [data, setData] = useState<PopulationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/readExcel");
        const jsonData = await res.json();

        if (res.ok) {
          setData(jsonData);
        } else {
          setError(jsonData.error);
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const uniqueYears = Array.from(new Set(data.map((row) => row.Year))).sort(
      (a, b) => a - b
    );
    setYears(uniqueYears);
  }, [data]);

  if (error)
    return (
      <div>
        <ErrorComponent message={error} />
      </div>
    );

  const groupedData = data.reduce(
    (acc, row) => {
      acc[row.Country] = (acc[row.Country] || 0) + row.Population;
      return acc;
    },
    {} as Record<string, number>
  );

  const sortedCountries = Object.entries(groupedData)
    .sort(([, a], [, b]) => b - a)
    .filter(([country]) => country !== "World")
    .slice(0, 12)
    .map(([country]) => country);

  const alternateColors = [
    "#3b82f6",
    "#f87171",
    "#10b981",
    "#fbbf24",
    "#6366f1",
  ]; // ตัวอย่างสีสลับกัน
  const chartData = {
    labels: sortedCountries,
    datasets: [
      {
        label: "Total Population",
        data: sortedCountries.map((country) => groupedData[country]),
        backgroundColor: sortedCountries.map(
          (_, index) => alternateColors[index % alternateColors.length]
        ), // สีสลับตามลำดับ
      },
    ],
  };

  const options: any = {
    responsive: true,
    indexAxis: "y" as const,
    plugins: {
      datalabels: {
        display: true,
        color: "#FFF",
        font: {
          weight: "bold",
          size: 20,
        },
        anchor: "end",
        align: "center",
        offset: -50,
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

  return (
    <div>
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
          World Population: {groupedData["World"]?.toLocaleString() || "N/A"}
        </h1>
        <h1 style={{ fontSize: "44px" }}>
          {years[0]} - {years[years.length - 1]}
        </h1>
      </div>
    </div>
  );
};

export default ChartComponent;
