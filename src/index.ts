import { writeFile, mkdir } from "fs/promises";

const users = ["rocket", "fallenrelic", "saerith"];

await mkdir("result", { recursive: true });

for (const user of users) {
  const res = await fetch(`https://api.monkeytype.com/users/${user}/profile`);
  const data = await res.json();

  const timestamp = new Date().toISOString();
  const jsoncContent = `// fetched at ${timestamp}\n` + JSON.stringify(data, null, 2);

  await writeFile(`result/${user}.jsonc`, jsoncContent);
  console.log(`Profile saved to result/${user}.jsonc`);
}
