import { NextResponse } from 'next/server';
import { inMemoryData, initializeInMemoryData, allowedCountries, PopulationData } from '../populationData';

export async function GET(request: Request) {
  try {
    // อ่านปีจาก query parameters
    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get('year') || '');

    if (isNaN(year)) {
      return NextResponse.json({ error: 'Invalid year parameter' }, { status: 400 });
    }
    if (!inMemoryData) {
      await initializeInMemoryData(); // เริ่มต้นข้อมูลใหม่
    }
    // ดึงข้อมูลที่ต้องการและกรองตาม allowedCountries
    const formattedData = inMemoryData
      .filter(row => allowedCountries.includes(row["Country name"]) && row.Year === year) // กรองชื่อประเทศและปีที่ต้องการ
      .map(row => ({
        Country: row["Country name"],
        Year: row.Year,
        Population: row.Population,
      }))
      .sort((a, b) => b.Population - a.Population) // เรียงลำดับประชากรจากมากไปน้อย
      .slice(0, 13); // เลือกเฉพาะ 12 อันดับแรก

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error reading CSV file:', error);
    return NextResponse.json({ error: 'Failed to read CSV file' }, { status: 500 });
  }
}
