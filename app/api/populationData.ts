// populationData.ts (อาจแยกเป็นไฟล์เพื่อให้จัดการง่ายขึ้น)
import fs from 'fs';
import path from 'path';

export interface PopulationData {
    "Country name": string;
    Year: number;
    Population: number;
}

export let allowedCountries: string[] = [];
export let inMemoryData: PopulationData[];

function parseCSV(content: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let value = '';
    let inQuotes = false;

    for (let i = 0; i < content.length; i += 1) {
        const char = content[i];
        const nextChar = i + 1 < content.length ? content[i + 1] : '';

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                value += '"';
                i += 1;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (!inQuotes && char === ',') {
            row.push(value);
            value = '';
            continue;
        }

        if (!inQuotes && (char === '\n' || char === '\r')) {
            if (char === '\r' && nextChar === '\n') {
                i += 1;
            }
            row.push(value);
            value = '';
            if (row.length > 1 || row[0] !== '') {
                rows.push(row);
            }
            row = [];
            continue;
        }

        value += char;
    }

    row.push(value);
    if (row.length > 1 || row[0] !== '') {
        rows.push(row);
    }

    return rows;
}

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
        const content = fs.readFileSync(filePath, 'utf8');
        const rows = parseCSV(content);
        if (rows.length === 0) {
            console.error('No rows found in CSV');
            return { error: 'No rows found in CSV' };
        }

        const headers = rows[0];
        const countryIndex = headers.indexOf('Country name');
        const yearIndex = headers.indexOf('Year');
        const populationIndex = headers.indexOf('Population');

        if (countryIndex === -1 || yearIndex === -1 || populationIndex === -1) {
            console.error('Required CSV headers not found');
            return { error: 'Required CSV headers not found' };
        }

        const data: PopulationData[] = [];
        for (const row of rows.slice(1)) {
            const country = row[countryIndex]?.trim();
            const year = Number(row[yearIndex]);
            const population = Number(row[populationIndex]);

            if (!country || !Number.isFinite(year) || !Number.isFinite(population)) {
                continue;
            }

            data.push({
                "Country name": country,
                Year: year,
                Population: population,
            });
        }

        return data;
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
