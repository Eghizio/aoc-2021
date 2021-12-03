import { loadInput } from "../utils/utils";

const scoreBit = (bit: string) => bit === "1" ? 1 : -1;

type RatingFunction = (score: number) => "0" | "1";
const rateBitOxygen: RatingFunction = (score) => score < 0 ? "0" : "1";
const rateBitCarbonDioxide: RatingFunction = (score) => score >= 0 ? "0" : "1";

const getMostCommonBits = (data: string[], rateFnc: RatingFunction) => {
    const bitsScoreboard = data.reduce<number[]>((board, bits) => {
        const bitScore = bits.split("").map(scoreBit);
        const squashedScore = bitScore.map((score, i) => score + (board[i] ?? 0));

        return squashedScore;
    }, []);

    const mostCommonBits = bitsScoreboard.map(rateFnc);

    return mostCommonBits.join("");
};

const filterByRating = (data: string[], rateFnc: RatingFunction, i: number) => {
    const mostCommonBits = getMostCommonBits(data, rateFnc);
    
    return data.filter(bits => bits[i] === mostCommonBits[i]);
};

const getRating = (data: string[], rateFnc: RatingFunction) => {
    let filteredData = data;

    for(let i=0; i<data[0].length; i++){
        filteredData = filterByRating(filteredData, rateFnc, i);
        if(filteredData.length === 1) return filteredData;
    }

    return filteredData;
};

const binToDec = (binary: string) => parseInt(binary, 2);

(() => {
    const input = loadInput("input");

    const oxygenRating = getRating(input, rateBitOxygen);
    const carbonDioxideRating = getRating(input, rateBitCarbonDioxide);
    const lifeSupportRating = binToDec(oxygenRating[0]) * binToDec(carbonDioxideRating[0]);

    console.log(lifeSupportRating);
})();
