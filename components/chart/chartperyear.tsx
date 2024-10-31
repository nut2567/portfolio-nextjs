"use client";
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

import Loading from '@/app/(portfolio)/git/loading';
import ErrorComponent from '@/components/ErrorComponent';

ChartJS.register(...registerables);

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
            },
        ],
    });
    const [loading, setLoading] = useState(true);
    const [worldPopulation, setWorldPopulation] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [continentCountries, setContinentCountries] = useState<Record<string, string[]>>({});

    const [currentYearIndex, setCurrentYearIndex] = useState(0);
    const years = Array.from({ length: 72 }, (_, i) => 1950 + i); // ปี 1950-2020
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

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

    useEffect(() => {
        const fetchInitialData = async () => {
            const year = 1950;
            const initialData = await fetchPopulationData(year);
            updateChartData(initialData);
            setLoading(false);
        };

        if (Object.keys(continentCountries).length > 0) {
            fetchInitialData();
        }
    }, [continentCountries]);

    const fetchPopulationData = async (year: number): Promise<PopulationData[]> => {
        try {
            const res = await fetch(`/api/population?year=${year}`);
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

        const datasets = Object.keys(continentCountries).map(continent => {
            const countriesInContinent = continentCountries[continent] || [];
            return {
                label: `${continent} Population`,
                data: countriesInContinent.map(country => groupedData[country] || 0),
                backgroundColor: countriesInContinent.map((_, index) => `hsl(${index * 30}, 70%, 50%)`),
            };
        });

        setChartData({
            labels: Object.keys(groupedData),
            datasets: datasets,
        });
    };

    const startFetchingData = () => {
        if (!isRunning && currentYearIndex < years.length) {
            setIsRunning(true);
            const id = setInterval(async () => {
                const year = years[currentYearIndex];
                const data = await fetchPopulationData(year);
                updateChartData(data);

                setCurrentYearIndex((prevIndex) => {
                    if (prevIndex + 1 < years.length) {
                        return prevIndex + 1;
                    } else {
                        clearInterval(id);
                        setIsRunning(false);
                        return prevIndex;
                    }
                });
            }, 1000);
            setIntervalId(id);
        }
    };

    const stopFetchingData = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIsRunning(false);
        }
    };

    const options = {
        responsive: true,
        indexAxis: 'y' as const,
        animation: {
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

    if (loading) return <Loading />;
    if (error) return <ErrorComponent message={error} />;

    return (
        <div>
            <div className="bg-gray-800 text-white w-full p-6 rounded-lg text-xl mb-4">
                <h1 className="text-xl font-bold text-blue-400">
                    แสดงข้อมูล Population growth per country 1950 to 2021
                </h1>
            </div>
            <div style={{ position: 'relative' }}>
                <Bar data={chartData} options={options} />
                <div style={{ position: 'absolute', bottom: 250, right: 0, fontSize: '16px', fontWeight: 'bold', padding: '10px' }}>
                    World Population: {worldPopulation.toLocaleString()}
                </div>
                <div className="flex justify-between items-center mt-8 mx-4 border-t-2 border-dashed border-gray-400 pt-4">
                    {years.filter(year => year % 5 === 0).map((year) => (
                        <span key={year} className="text-xs text-gray-600">
                            {year}
                        </span>
                    ))}
                </div>
                <div className="mt-4">
                    {isRunning ? (
                        <button onClick={stopFetchingData} className="px-4 py-2 bg-red-500 text-white flex rounded items-center">
                            <i className="material-icons mr-2">stop_circle</i> หยุด
                        </button>
                    ) : (
                        <button onClick={startFetchingData} className="px-4 py-2 bg-green-500 text-white flex rounded items-center">
                            <i className="material-icons mr-2">play_circle</i> เริ่มต้น
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PopulationGrowthGraph;
