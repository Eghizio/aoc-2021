import { readFileSync } from "fs";
import { join } from "path";

// const sample = [100, 101, 105, 106, 103, 104, 106, 108, 112, 123]; // expected 8

const getSlidingWindowsSums = (data: number[], windowSize = 3) => {
    const measurements = [...data];

    const windowSums = [];

    for(let i=0; i<data.length; i++){
        const window = measurements.slice(i, i + windowSize);

        if(window.length === windowSize){
            const sum = window.reduce((sum, m) => sum + m, 0);
            windowSums.push(sum);
        }
    }

    return windowSums;
};

const getMeasurementsIncrease = (measurements: number[]) => {
    if(measurements.length === 0) throw new Error("Measurements are empty.");

    let increase = 0;
    let prev = measurements[0];
    
    for(const measurement of measurements){
        if(measurement > prev) increase++;
        prev = measurement;
    }
    
    return increase;
};

const loadInput = (file: string) => {
    const data = readFileSync(file, { encoding: "utf-8" });

    const input = data.split("\n").map(row => parseInt(row));

    return input;
};


(() => {
    const inputFile = join(__dirname, "input");

    const input = loadInput(inputFile);
    const slidingWindowsSums = getSlidingWindowsSums(input, 3);
    const result = getMeasurementsIncrease(slidingWindowsSums);

    console.log(result);
})();
