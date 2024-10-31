// populationData.ts (อาจแยกเป็นไฟล์เพื่อให้จัดการง่ายขึ้น)
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

export interface PopulationData {
    "Country name": string;
    Year: number;
    Population: number;
}

export let allowedCountries: string[] = [];
export let inMemoryData: PopulationData[];

// ดึงข้อมูลประเทศจาก REST Countries API
export async function fetchAllowedCountries() {

    const query = `
  {
    countries {
      code
      name
    }
  }
`;

    if (allowedCountries.length === 0) {
        const response = await fetch('https://countries.trevorblades.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
        const countries = await response.json();
        console.log(`Countries: ${countries}`);
        allowedCountries = ["World", ...countries.data.countries.map((country: any) => country.name)]; // เพิ่ม World ไว้ใน allowedCountries
    }
}

export function loadCSVData(): PopulationData[] | { error: string } {
    try {
        const filePath = path.join(process.cwd(), 'public', 'population-and-demography.csv');
        if (!fs.existsSync(filePath)) {
            console.error('File not found:', filePath);
            return { error: 'File not found' };
        }
        const fileBuffer = fs.readFileSync(filePath);
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        if (workbook.SheetNames.length === 0) {
            console.error('No sheets found in workbook');
            return { error: 'No sheets found in workbook' };
        }
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json<PopulationData>(sheet);
    } catch (error) {
        console.error('Error loading CSV data:', error);
        return { error: 'Failed to load CSV data' };
    }
}

export async function initializeInMemoryData() {
    await fetchAllowedCountries()
    if (!inMemoryData) {
        const data = loadCSVData();
        if (!('error' in data)) {
            inMemoryData = data;
        }
    }
}
