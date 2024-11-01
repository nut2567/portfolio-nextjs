"use client";
import { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Loading from '@/app/(portfolio)/git/loading';
import ErrorComponent from '@/components/ErrorComponent';

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
                label: 'Population Growth',
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
    const chartRef = useRef(null); // สร้าง ref สำหรับกราฟ
    const [currentYearIndex, setCurrentYearIndex] = useState(0);
    const years = Array.from({ length: 72 }, (_, i) => 1950 + i);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const [continentCountries, setContinentCountries] = useState<Record<string, string[]>>({});

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        const fetchContinents = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
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
                setContinentCountries(continentData);
            } catch (err) {
                console.error("Error fetching continent data:", err);
            }
        };

        fetchContinents();
    }, []);

    const fetchPopulationData = async (year: number, step: number): Promise<PopulationData[]> => {
        try {
            const res = await fetch(`/api/population?year=${year}&step=${step}`);
            const jsonData = await res.json();
            return res.ok ? jsonData : [];
        } catch (err) {
            setError('Failed to fetch data');
            return [];
        }
    };

    const updateChartData = (data: PopulationData[]) => {
        const groupedData = data.reduce((acc, row) => {
            if (row.Country !== "World") {
                acc[row.Country] = (acc[row.Country] || 0) + row.Population;
            }
            return acc;
        }, {} as Record<string, number>);

        setWorldPopulation(data.find(row => row.Country === "World")?.Population || 0);

        const sortedCountries = Object.entries(groupedData)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 12)
            .map(([country]) => country);

        setChartData({
            labels: sortedCountries,
            datasets: [
                {
                    label: 'Total Population',
                    data: sortedCountries.map(country => groupedData[country]),
                    backgroundColor: sortedCountries.map((_, index) => `hsl(${index * 30}, 50%, 50%)`),
                    borderColor: [],
                    borderWidth: 1,
                },
            ],
        });
    };

    useEffect(() => {
        const year = years[currentYearIndex];
        fetchPopulationData(year, 1)
            .then((data) => {
                updateChartData(data);
            });
    }, [currentYearIndex]);

    const startFetchingData = () => {
        if (!isRunning && currentYearIndex < years.length) {
            setIsRunning(true);
            const id = setInterval(async () => {
                setCurrentYearIndex((prevIndex) => {
                    if (prevIndex + 1 < years.length) {
                        return prevIndex + 1;
                    } else {
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

    const handleTimelineChange = (event: any) => {
        const index = years.indexOf(parseInt(event.target.value));
        setCurrentYearIndex(index);
    };

    const options: any = {
        responsive: true,
        indexAxis: 'y' as const,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: true,
                color: '#FFF',
                font: {
                    weight: 'bold',
                    size: 20
                },
                anchor: 'end',
                align: 'center',
                offset: -50,
                formatter: (value: number) => value.toLocaleString(), // ฟอร์แมตตัวเลข                
            },
            // Custom plugin เพื่อวาดรูปธงบนแท่งกราฟ
            flagImages: {
                flags: [
                    '/images/nut.jpg',
                ],
            },
        },
        animation: {
            onComplete: () => {
            },
            delay: (context: any) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default') {
                    delay = context.dataIndex * 300;
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
    // รายการรูปธงที่ตั้งของแต่ละประเทศ
    const flags = ['/images/nut.jpg'];

    // สร้าง plugin เพื่อเพิ่มรูปธงข้างแท่งกราฟ
    const customFlagPlugin = {
        id: 'customFlagPlugin',
        afterDatasetsDraw(chart: any) {
            const { ctx, chartArea: { left }, scales: { x, y } } = chart;

            // วาดรูปธงข้างแต่ละแท่งกราฟ
            chart.data.datasets[0].data.forEach((value: string, index: number) => {
                const xPosition = x.getPixelForValue(value) + 10; // ตำแหน่งปลายแท่งกราฟ + offset
                const yPosition = y.getPixelForValue(chart.data.labels[index]) - 10;

                const img = new Image();
                img.src = flags[0];
                if (img.complete) {
                    // วาดรูปธงในกรณีที่รูปโหลดเสร็จแล้ว
                    ctx.drawImage(img, xPosition, yPosition, 30, 20); // ปรับขนาดของรูปธง
                } else {
                    // รอให้รูปโหลดเสร็จแล้วค่อยวาดใหม่
                    img.onload = () => {
                        chart.draw();
                    };
                }
            });

        }
    };

    if (loading) return <Loading />;
    if (error) return <div><ErrorComponent message={error} /></div>;

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
                <p>legend</p>
                {Object.keys(continentCountries).map((key, index) => (
                    <div key={index} className="flex items-center">
                        <div
                            style={{
                                width: 16,
                                height: 16,
                                backgroundColor: "#3b82f6",
                                marginRight: 8,
                            }}
                        />
                        <span className="text-gray-700">{key}</span>
                    </div>
                ))}
            </div>
            <div style={{ position: 'relative' }}>
                <Bar data={chartData} options={options} plugins={[customFlagPlugin]} />
                <div style={{ position: 'absolute', bottom: 250, right: 0, fontWeight: 'bold', padding: '10px' }}>
                    <h1 style={{ fontSize: '24px' }}>World Population: {worldPopulation.toLocaleString() || 'N/A'}</h1>
                    <h1 style={{ fontSize: '44px' }}>{years[currentYearIndex]}</h1>
                </div>

                <input
                    type="range"
                    min={years[0]}
                    max={years[years.length - 1]}
                    value={years[currentYearIndex]}
                    onChange={handleTimelineChange}
                    style={{ width: '100%', marginTop: '20px' }}
                />

                <div className="mt-4">
                    {isRunning ? (
                        <button
                            onClick={stopFetchingData}
                            className="px-4 py-2 bg-red-500 text-white flex rounded items-center"
                        >
                            <i className="material-icons  mr-2">stop_circle</i> หยุด
                        </button>
                    ) : (
                        <button
                            onClick={startFetchingData}
                            className="px-4 py-2 bg-green-500 text-white flex rounded items-center"
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
