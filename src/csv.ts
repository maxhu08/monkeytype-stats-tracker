import { readdir } from "node:fs/promises";

const gencsv = async () => {
  const folderPath = "result/2025-02-02T19:33:25.260Z";

  const fileNames = await readdir(folderPath, { recursive: true });

  for (const fileName of fileNames) {
    console.log(fileName);
  }
};

gencsv().catch(console.error);
