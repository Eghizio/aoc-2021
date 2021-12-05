import { loadInput } from "../utils/utils";

type Point = { x: number; y: number; };
type Line = [Point, Point];
type Coord = `${number}-${number}`;
type CoordHeatmap = { [key: Coord]: number; };

const getLines = (input: string[]) => {
    return input.map(row => row.split("->")
        .map(point => point.trim().split(",")
            .map(cord => parseInt(cord)))
            .map(([x,y]) => ({ x, y }))) as Line[];
};

const isVertical = (a: Point, b: Point) => a.x === b.x;
const isLineVerticalOrHorizontal = ([a, b]: Line) => isVertical(a, b) || a.y === b.y;

const getLinePoints = ([p1, p2]: Line): Point[] => {
    const key: keyof Point = isVertical(p1, p2) ? "y" : "x";

    const [start, end] = p1[key] <= p2[key] ? [p1, p2] : [p2, p1];
    const length = end[key] - start[key] + 1;
    
    return Array.from({ length }, (_,i) => ({
        ...start,
        [key]: start[key] + i
    }));
};

const drawLines = (lines: Line[]) => lines.flatMap(getLinePoints);

const parsePoint = ({ x, y }: Point) => `${x}-${y}` as Coord;

const drawHeatmap = (points: Point[]) => {
    return points.reduce<CoordHeatmap>((heatmap, point) => {
        const coord = parsePoint(point);

        heatmap[coord]
            ? heatmap[coord]++
            : heatmap[coord] = 1;

        return heatmap;
    }, {});
};

const countHeatpoints = (heatmap: CoordHeatmap, threshold: number) => {
    return Object.values(heatmap).filter(heat => heat >= threshold).length;
};

(() => {
    const input = loadInput("input");

    const filteredLines = getLines(input).filter(isLineVerticalOrHorizontal);
    
    const linePoints = drawLines(filteredLines);
    const heatmap = drawHeatmap(linePoints);
    
    const heatPoints = countHeatpoints(heatmap, 2);

    console.log(heatPoints);
})();
