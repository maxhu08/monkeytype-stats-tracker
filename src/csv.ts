import { mkdir, readdir, writeFile } from "fs/promises";

export const generateCSV = async (date: string) => {
  const folderPath = `results/data/${date}`;

  const dir = `results/csv`;
  await mkdir(dir, { recursive: true });

  const fileNames = await readdir(folderPath, { recursive: true });

  const csvLines = ["name,15s wpm,15s raw,60s wpm,60s raw,10w wpm"];

  const fileData = [];

  for (const fileName of fileNames) {
    const fileJson = await Bun.file(`results/data/${date}/${fileName}`).json();

    const name = fileName.replace(/\.json$/, "");
    const wpm15s = fileJson.data.personalBests.time["15"][0].wpm || "";
    const raw15s = fileJson.data.personalBests.time["15"][0].raw || "";
    const wpm60s = fileJson.data.personalBests.time["60"][0].wpm || "";
    const raw60s = fileJson.data.personalBests.time["60"][0].raw || "";
    const wpm10w = fileJson.data.personalBests.words["10"][0].wpm || "";

    fileData.push({ name, wpm15s, raw15s, wpm60s, raw60s, wpm10w });
  }

  // sort by 60s wpm
  fileData.sort((a, b) => b.wpm60s - a.wpm60s);

  for (const data of fileData) {
    csvLines.push(
      `${data.name},${data.wpm15s},${data.raw15s},${data.wpm60s},${data.raw60s},${data.wpm10w}`
    );
  }

  await writeFile(`results/csv/${date}.csv`, csvLines.join("\n"));

  console.log(`CSV saved to results/csv/${date}.csv`);
};
