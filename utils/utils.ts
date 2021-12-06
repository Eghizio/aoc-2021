import { readFileSync } from "fs";
import { join } from "path";

export const loadInput = (file: string = "input") => {
    const data = readFileSync(file, { encoding: "utf-8" });

    const input = data.split("\n");

    return input;
};

export const add = (a: number) => (b: number) => a+b;

export const update = <T>(index: number, cb: (item: T) => T, arr: T[]) => {
    return arr.map((el, i) => i === index ? cb(el) : el);
}