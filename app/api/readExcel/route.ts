import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

interface PopulationData {
  "Country name": string;
  Year: number;
  Population: number;
}

let allowedCountries: string[] = [];

// ดึงข้อมูลประเทศจาก REST Countries API
async function fetchAllowedCountries() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();
  allowedCountries = countries.map((country: any) => country.name.common); // ใช้ชื่อประเทศจาก JSON
}

export async function GET() {
  try {
    // ดึงข้อมูลประเทศก่อนเริ่มการทำงาน
    await fetchAllowedCountries();
    allowedCountries = ["World", ...allowedCountries];

    const filePath = path.join(process.cwd(), 'public', 'population-and-demography.csv');

    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    if (workbook.SheetNames.length === 0) {
      console.error('No sheets found in workbook');
      return NextResponse.json({ error: 'No sheets found in workbook' }, { status: 500 });
    }

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // อ่านข้อมูลจาก sheet และแปลงเป็น JSON
    const data: PopulationData[] = XLSX.utils.sheet_to_json(sheet);

    // ดึงข้อมูลที่ต้องการและกรองตาม allowedCountries
    const formattedData = data
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
