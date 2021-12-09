import { loadInput } from "../utils/utils";


type FloorPoint = { value: number; adjacent: number[]; };
const parseHeightmap = (data: string[]): FloorPoint[][] => data.map(row => row.split("").map(n => ({ value: parseInt(n), adjacent: [] })));

const transpose = (arr: any[][]) => arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));

const getAdjacent = (xs: any[], i: number) => [xs[i-1], xs[i+1]].filter(a => a !== undefined);

const mapAdjacent = (arr: FloorPoint[][]) => arr.map(row => row.map(({ value, adjacent }, i) => ({
    value,
    adjacent: [...adjacent, ...getAdjacent(row.map(r => r.value), i)]
})));

const isLowPoint = ({ value, adjacent }: FloorPoint) => adjacent.every(a => a > value);

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`.split("\n");

(() => {
    const input = loadInput("input");

    const heightmap = parseHeightmap(input);
    const adjacent = mapAdjacent(transpose(mapAdjacent(heightmap)));

    const lowMatrix = adjacent.map(row => row.map(p => ({
        ...p,
        isLow: isLowPoint(p)
    })));
    console.log(lowMatrix)

    const riskLevels = lowMatrix.flat().filter(({isLow}) => isLow).reduce((sum, p) => sum+p.value+1, 0);
    console.log(riskLevels)
})();
