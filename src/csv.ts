import { mkdir, readdir, writeFile } from "fs/promises";

const gencsv = async () => {
  const date = "2025-02-02T19:51:46.251Z";
  const folderPath = `results/data/${date}`;

  const dir = `results/csv`;
  await mkdir(dir, { recursive: true });

  const fileNames = await readdir(folderPath, { recursive: true });

  let csvContent = "";

  for (const fileName of fileNames) {
    csvContent += `${fileName}\n`;

    console.log(fileName);
  }

  await writeFile(`results/csv/${date}.csv`, csvContent);
};

gencsv().catch(console.error);
