import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  // อ่านไฟล์ JSON
  const filePath = path.join(process.cwd(), "files/all.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const products = JSON.parse(fileContent);

  // ส่งข้อมูลกลับ
  return NextResponse.json(products);
}
