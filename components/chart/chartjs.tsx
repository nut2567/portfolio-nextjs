"use client"
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Loading from '@/app/(portfolio)/git/loading';
import ErrorComponent from '@/components/ErrorComponent';

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
                const res = await fetch('/api/readExcel');
                const jsonData = await res.json();

                if (res.ok) {
                    setData(jsonData);
                } else {
                    setError(jsonData.error);
                }
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const uniqueYears = Array.from(new Set(data.map(row => row.Year))).sort((a, b) => a - b);
        setYears(uniqueYears);
    }, [data]);

    if (loading) return <Loading />;
    if (error) return <div><ErrorComponent message={error} /></div>;

    // จัดกลุ่มข้อมูลตามประเทศและรวมประชากร, กรอง World ออก
    const groupedData = data.reduce((acc, row) => {
        if (row.Country === "World") return acc; // ข้าม World
        acc[row.Country] = (acc[row.Country] || 0) + row.Population;
        return acc;
    }, {} as Record<string, number>);


    // ดึงข้อมูลประชากรของ World ออกมาแยกต่างหาก
    const worldPopulation = data.find(row => row.Country === "World")?.Population || 0;


    const sortedCountries = Object.entries(groupedData)
        .sort(([, a], [, b]) => b - a) // เรียงจากมากไปน้อย
        .slice(0, 12) // เอาแค่ 12 อันดับแรก
        .map(([country]) => country); // ดึงชื่อประเทศ

    const chartData = {
        labels: sortedCountries,
        datasets: [
            {
                label: 'Total Population',
                data: sortedCountries.map(country => groupedData[country]),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };


    const options = {
        indexAxis: 'y' as const, // กำหนดให้แกน X เป็นแนวนอน
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Population', // แสดงชื่อแกน X
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Country', // แสดงชื่อแกน Y
                },
            },
        },
    };


    return (
        <div style={{ position: 'relative' }}>
            <h2>Top 12 Countries by Population</h2>
            <Bar data={chartData} options={options} />
            <div style={{ position: 'absolute', bottom: 150, right: 0, fontSize: '16px', fontWeight: 'bold', padding: '10px' }}>
                World Population: {worldPopulation.toLocaleString()}
            </div>
            {/* เส้นไทม์ไลน์ที่แสดงทุก 5 ปี */}
            <div className="flex justify-between items-center mt-8 mx-4 border-t-2 border-dashed border-gray-400 pt-4">
                {years.filter(year => year % 5 === 0).map((year) => (
                    <span key={year} className="text-xs text-gray-600">
                        {year}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ChartComponent;
