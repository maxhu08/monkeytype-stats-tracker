import { writeFile, mkdir } from "fs/promises";

export const fetchData = async () => {
  const usersInput = await Bun.file("users.txt").text();
  const users = usersInput
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const date = new Date().toISOString();
  const dir = `results/data/${date}`;
  await mkdir(dir, { recursive: true });

  for (const user of users) {
    const res = await fetch(`https://api.monkeytype.com/users/${user}/profile`);
    const data = await res.json();

    const result = { fetchedAt: new Date().toISOString(), ...data };

    await writeFile(`${dir}/${user}.json`, JSON.stringify(result, null, 2));
    console.log(`Profile saved to ${dir}/${user}.json`);
  }

  return date;
};
