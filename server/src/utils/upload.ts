import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

export async function saveFile(file: File, filename?: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = filename || `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.promises.writeFile(filePath, buffer);

  // return URL
  return `/uploads/${fileName}`;
}
