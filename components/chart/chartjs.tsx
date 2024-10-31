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

    const groupedData = data.reduce((acc, row) => {
        acc[row.Country] = (acc[row.Country] || 0) + row.Population;
        return acc;
    }, {} as Record<string, number>);

    const sortedCountries = Object.entries(groupedData)
        .sort(([, a], [, b]) => b - a)
        .filter(([country]) => country !== "World")
        .slice(0, 12)
        .map(([country]) => country);

    const alternateColors = ["#3b82f6", "#f87171", "#10b981", "#fbbf24", "#6366f1"]; // ตัวอย่างสีสลับกัน
    const chartData = {
        labels: sortedCountries,
        datasets: [
            {
                label: 'Total Population',
                data: sortedCountries.map(country => groupedData[country]),
                backgroundColor: sortedCountries.map((_, index) => alternateColors[index % alternateColors.length]), // สีสลับตามลำดับ
            },
        ],
    };

    const options: any = {
        responsive: true,
        indexAxis: 'y' as const,
        animation: {
            onComplete: () => {
                // code สำหรับสิ่งที่คุณต้องการทำเมื่อ animation เสร็จสิ้น
            },
            delay: (context: any) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default') {
                    delay = context.dataIndex * 300; // ตั้งค่า delay ตาม index ของข้อมูล
                }
                return delay;
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Population',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Country',
                },
            },
        },
    };

    return (
        <div>

            <div className="bg-gray-800 text-white w-full p-6 rounded-lg text-xl mb-4">
                <ul className="list-none space-y-2">
                    <h1 className="text-xl font-bold text-blue-400">
                        แสดงข้อมูล Total population growth country 1950 to 2021
                    </h1>
                </ul>
            </div>

            <div style={{ position: 'relative' }} className='mb-20'>
                <h2>Top 12 Countries by Population</h2>
                <Bar data={chartData} options={options} />
                <div style={{ position: 'absolute', bottom: 150, right: 0, fontSize: '16px', fontWeight: 'bold', padding: '10px' }}>
                    <h1>World Population: {groupedData["World"]?.toLocaleString() || 'N/A'}</h1>
                    <h1>1950-2021</h1>
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
