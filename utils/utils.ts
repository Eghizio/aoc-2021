import { readFileSync } from "fs";
import { join } from "path";

export const loadInput = (file: string = "input") => {
    const data = readFileSync(file, { encoding: "utf-8" });

    const input = data.split("\n");

    return input;
};