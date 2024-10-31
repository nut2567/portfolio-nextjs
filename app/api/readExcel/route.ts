import { NextRequest, NextResponse } from 'next/server';
import { inMemoryData, initializeInMemoryData, allowedCountries, PopulationData } from '../populationData';


export async function GET() {
  try {
    if (!inMemoryData) {
      await initializeInMemoryData(); // เริ่มต้นข้อมูลใหม่
    }
    // ดึงข้อมูลที่ต้องการและกรองตาม allowedCountries
    const formattedData = inMemoryData
      .filter(row => allowedCountries.includes(row["Country name"])) // กรองชื่อประเทศ
      .map(row => ({
        Country: row["Country name"],  // เปลี่ยนชื่อฟิลด์เป็น "Country name"
        Year: row.Year,
        Population: row.Population,
      }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error reading CSV file:', error);
    return NextResponse.json({ error: 'Failed to read CSV file' }, { status: 500 });
  }
}
