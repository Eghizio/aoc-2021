import { loadInput } from "../utils/utils";

const parsePositions = (data: string[]) => data.flatMap(row => row.split(",").map(a => parseInt(a)));

const findPosition = (positions: number[]) => positions.reduce((acc, el) => acc > el ? acc-1 : acc+1, 0);

const calculateFuelCost = (positions: number[], target: number) => positions.map(pos => Math.abs(target - pos))
    .reduce((sum, dist) => sum+dist, 0);

(() => {
    const input = loadInput("input");

    const crabPositions = parsePositions(input);
    const position = findPosition(crabPositions);

    const fuel = calculateFuelCost(crabPositions, position);
    
    console.log(fuel);
})();
