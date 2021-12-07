import { loadInput } from "../utils/utils";

const parsePositions = (data: string[]) => data.flatMap(row => row.split(",").map(a => parseInt(a)));

const calculateFuelBurn = (distance: number) => Array(distance).fill(0).map((_, i) => i+1)
    .reduce((sum, s) => sum + s, 0);

const calculateFuelCost = (positions: number[], target: number) => positions.map(pos => Math.abs(target - pos))
    .map(calculateFuelBurn)
    .reduce((sum, dist) => sum + dist, 0);

const findCheapestPositionFuelCost = (positions: number[]) => {
    const [min, max] = [Math.min(...positions), Math.max(...positions)];
    
    return Array.from({ length: max-min+1 }, (_, i) => min+i).reduce((cheapestFuelCost, position) => {
        const fuelCost = calculateFuelCost(positions, position);
        return fuelCost < cheapestFuelCost ? fuelCost : cheapestFuelCost;
    }, Infinity);
};

(() => {
    const input = loadInput("input");

    const crabPositions = parsePositions(input);

    const fuel = findCheapestPositionFuelCost(crabPositions);

    console.log(fuel);
})();
