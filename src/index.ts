import { generateCSV } from "./csv";
import { fetchData } from "./fetch";

const date = await fetchData();
await generateCSV(date);
