import { mkdir, readdir, writeFile } from "fs/promises";

const gencsv = async () => {
  const date = "2025-02-02T19:51:46.251Z";
  const folderPath = `results/data/${date}`;

  const dir = `results/csv`;
  await mkdir(dir, { recursive: true });

  const fileNames = await readdir(folderPath, { recursive: true });

  const csvLines = ["name,15s wpm,15s raw,60s wpm,60s raw,10w wpm"];

  for (const fileName of fileNames) {
    const fileJson = await Bun.file(`results/data/${date}/${fileName}`).json();

    const name = fileName.replace(/\.json$/, "");
    const wpm15s = fileJson.data.personalBests.time["15"][0].wpm || "";
    const raw15s = fileJson.data.personalBests.time["15"][0].raw || "";
    const wpm60s = fileJson.data.personalBests.time["60"][0].wpm || "";
    const raw60s = fileJson.data.personalBests.time["60"][0].raw || "";
    const wpm10w = fileJson.data.personalBests.words["10"][0].wpm || "";

    csvLines.push(`${name},${wpm15s},${raw15s},${wpm60s},${raw60s},${wpm10w}`);
  }

  await writeFile(`results/csv/${date}.csv`, csvLines.join("\n"));
};

gencsv().catch(console.error);
