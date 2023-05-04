import path from "path";
import { fileURLToPath } from "url";

const Url = fileURLToPath(import.meta.url);
export const file = path.dirname(Url);
