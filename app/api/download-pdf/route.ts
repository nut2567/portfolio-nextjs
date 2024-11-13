import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // ตรวจสอบ path ของไฟล์ PDF
    const filePath = path.resolve(process.cwd(), 'files/Resume.pdf');

    // ตรวจสอบว่าไฟล์มีอยู่จริงหรือไม่
    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 });
    }

    // อ่านข้อมูลของไฟล์ PDF
    const fileBuffer = fs.readFileSync(filePath);

    // สร้าง response พร้อมตั้งค่า header สำหรับการดาวน์โหลด PDF
    const response = new NextResponse(fileBuffer);
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set('Content-Disposition', 'attachment; filename="Resume.pdf"');

    return response;
  } catch (error) {
    console.error('Error downloading PDF:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
