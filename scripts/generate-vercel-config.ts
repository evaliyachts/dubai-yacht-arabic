import { writeFileSync } from "node:fs";
import { createVercelConfig } from "./vercel-config";

writeFileSync("vercel.json", JSON.stringify(createVercelConfig(), null, 2) + "\n");
console.log("Generated exact Vercel routes and image settings from the approved registries.");
