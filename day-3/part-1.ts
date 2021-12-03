import { loadInput } from "../utils/utils";

const scoreBit = (bit: string) => bit === "1" ? 1 : -1;
const rateBit = (score: number) => score < 0 ? "0" : "1";

const getMostCommonBits = (data: string[]) => {
    const bitsScoreboard = data.reduce<number[]>((board, bits) => {
        const bitScore = bits.split("").map(scoreBit);
        const squashedScore = bitScore.map((score, i) => score + (board[i] ?? 0));

        return squashedScore;
    }, []);

    const mostCommonBits = bitsScoreboard.map(rateBit);

    return mostCommonBits.join("");
};

const invert = (binary: string) => binary.split("").map(b => b==="1" ? "0" : "1").join("");

const binToDec = (binary: string) => parseInt(binary, 2);

(() => {
    const input = loadInput("input");

    const gamma = getMostCommonBits(input);
    const epsilon = invert(gamma);
    const powerConsumption = binToDec(gamma) * binToDec(epsilon);

    console.log(powerConsumption);
})();