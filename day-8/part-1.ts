import { loadInput } from "../utils/utils";

const parseEntries = (data: string[]) => data.map(row => row.split(" | ").map(part => part.split(" ")));

const uniqueLength = [2, 3, 4, 7]; // 1, 4, 7, 8
const countUnique = (sequence: string[]) => {
    return sequence.reduce((sum, seq) => uniqueLength.includes(seq.length) ? sum+1 : sum, 0);
};

(() => {
    const input = loadInput("input");

    const entries = parseEntries(input);
    const uniqueCount = entries.map(([_, output]) => countUnique(output));

    console.log(uniqueCount.reduce((sum, el) => sum+el, 0));
})();
