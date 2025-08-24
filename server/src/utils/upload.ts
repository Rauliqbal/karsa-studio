import { writeFile } from "fs/promises";
import path from "path";

export async function saveFile(file: File, folder = "public/uploads") {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), folder, fileName);

  await writeFile(filePath, buffer);

  // return relative url
  return `/uploads/${fileName}`;
}
