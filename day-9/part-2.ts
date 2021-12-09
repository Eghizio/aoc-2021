import { loadInput } from "../utils/utils";

const parseHeightmap = (data: string[]) => data.map(row => row.split("").map(n => parseInt(n)));

const transpose = <T>(arr: T[][]) => arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));

const up    = (x: number, y: number, arr: number[][]) => arr[y-1] && arr[y-1][x];
const down  = (x: number, y: number, arr: number[][]) => arr[y+1] && arr[y+1][x];
const left  = (x: number, y: number, arr: number[][]) => arr[y] && arr[y][x-1];
const right = (x: number, y: number, arr: number[][]) => arr[y] && arr[y][x+1];

const getAdjacent = (x: number, y: number, arr: number[][]) => {
    return [
        up(x,y, arr),
        down(x,y, arr),
        left(x,y, arr),
        right(x,y, arr),
    ].filter(point => point !== undefined);
};

const getLows = (arr: number[][]) => {
    const lows: number[] = [];

    for(let y=0; y<arr.length; y++){
        for(let x=0; x<arr[y].length; x++){
            const point = arr[y][x];
            if(getAdjacent(x, y, arr).every(a => a > point)){
                lows.push(point);
            }
        }
    }

    return lows;
};

const calculateRiskLevelsSum = (lows: number[]) => lows.reduce((sum, height) => sum+height+1, 0);

type Point = { x: number; y: number; };
type HeightPoint = Point & { height: number; };
const findBasinRoots = (arr: number[][]) => {
    const lows: HeightPoint[] = [];

    for(let y=0; y<arr.length; y++){
        for(let x=0; x<arr[y].length; x++){
            const point = arr[y][x];
            if(getAdjacent(x, y, arr).every(a => a > point)){
                lows.push({ x, y, height: point });
            }
        }
    }

    return lows;
};


const getAdjacentPoints = (x: number, y: number, arr: number[][]): HeightPoint[] => {
    return [
        { height: up(x,y, arr),     x,      y: y-1  },
        { height: down(x,y, arr),   x,      y: y+1  },
        { height: left(x,y, arr),   x: x-1, y       },
        { height: right(x,y, arr),  x: x+1, y       },
    ].filter(point => point.height !== undefined);
};

const serializePoint = ({ x, y }: Point) => `${x}-${y}`;

const getBasin = (root: HeightPoint, arr: number[][]) => {
    const basin: string[] = [];
    const queue: HeightPoint[] = [root];

    while(queue.length){
        const node = queue.shift();
        if(!node) break;
        
        const serialized = serializePoint(node);
        if(basin.includes(serialized)) continue;

        basin.push(serialized);

        const adjacents = getAdjacentPoints(node.x, node.y, arr).filter(p => p.height !== 9);
        queue.push(...adjacents);
    }

    return basin;
};

const calculateLargestBasinsArea = (basins: string[][]) => basins.map(b => b.length).sort((a, b) => b-a)
    .slice(0,3).reduce((area, len) => area*len, 1);

// const getAdjacent = (xs: any[], i: number) => [xs[i-1], xs[i+1]].filter(a => a !== undefined);


// const isLowPoint = ({ value, adjacent }: FloorPoint) => adjacent.every(a => a > value);

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`.split("\n");

(() => {
    const input = loadInput("input");

    const heightmap = parseHeightmap(input);
    
    // // -- Part 1 --
    // const lows = getLows(heightmap);
    // const riskLevelSum = calculateRiskLevelsSum(lows);
    // console.log(riskLevelSum);

    // -- Part 2 --
    const basinRoots = findBasinRoots(heightmap);
    // console.log(basinRoots)
    const basins = basinRoots.map(rootPoint => getBasin(rootPoint, heightmap));
    console.log(basins);
    
    const largestBasinsArea = calculateLargestBasinsArea(basins);
    console.log(largestBasinsArea);
})();
