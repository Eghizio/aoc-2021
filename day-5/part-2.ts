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

const isLineVertical = ([a, b]: Line) => a.x === b.x;
const isLineVerticalOrHorizontal = ([a, b]: Line) => isLineVertical([a, b]) || a.y === b.y;
const isLineDiagonal = ([a, b]: Line) => Math.abs(a.x - b.x) === Math.abs(a.y - b.y);

const filterLines = (lines: Line[]) => {
    return lines.filter(line => isLineVerticalOrHorizontal(line) || isLineDiagonal(line));
};

const getDiagonalLinePoints = ([p1, p2]: Line) => {
    const length = Math.abs(p1.x - p2.x) + 1;

    const [start, end] = p1.x <= p2.x ? [p1, p2] : [p2, p1];
    const yDirection =  start.y <= end.y ? 1 : -1;

    return Array.from({ length }, (_, i) => ({
        x: start.x + i,
        y: start.y + i * yDirection,
    }));
};

const getLinePoints = ([p1, p2]: Line): Point[] => {
    if(isLineDiagonal([p1, p2])) return getDiagonalLinePoints([p1, p2]);

    const key: keyof Point = isLineVertical([p1, p2]) ? "y" : "x";

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

    const lines = getLines(input);
    const filteredLines = filterLines(lines);
    
    const linePoints = drawLines(filteredLines);
    const heatmap = drawHeatmap(linePoints);

    const heatPoints = countHeatpoints(heatmap, 2);

    console.log(heatPoints);
})();
