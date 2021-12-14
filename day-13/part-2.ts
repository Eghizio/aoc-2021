import { loadInput } from "../utils/utils";

type Point = [number, number];
type Axis = "x" | "y";
type Instruction = [Axis, number];
type Mark = "." | "#";
type Paper = Mark[][];

const parsePoint = (line: string) => line.split(",").map(c => parseInt(c)) as Point;

const parseInstruction = (line: string) => {
    const [axis, value] = line.replace("fold along ", "").split("=");
    return [axis, parseInt(value)] as Instruction;
};

const parsePointsAndInstructions = (data: string[]) => {
    return data.filter(l => l.trim().length).reduce(({ points, instructions }, line) => {
        return line.startsWith("fold")
            ? { points, instructions: [...instructions, parseInstruction(line)] }
            : { instructions, points: [...points, parsePoint(line)] };
    }, { points: [] as Point[], instructions: [] as Instruction[] });
};

const constructPaper = (points: Point[]) => {
    const [maxX, maxY] = points.reduce(([xs, ys], [x, y]) => [Math.max(xs, x), Math.max(ys, y)], [0, 0]);

    const paper: Paper = Array.from({ length: maxY + 1 }, (_, y) => {
        return Array.from({ length: maxX + 1 }, (_, x) => {
            return !!points.find(([px, py]) => x === px && y === py) ? "#" : ".";
        });
    });

    return paper;
};

const flipPoint = (point: Point, [axis, value]: Instruction): Point => {
    const i = axis === "x" ? 0 : 1;
    if(point[i] < value) return point;

    const distance = point[i] - value;
    const shifted = point[i] - distance*2;

    return i ? [point[0], shifted] : [shifted, point[1]];
};

const foldPaper = (points: Point[], instruction: Instruction) => {
    return points.reduce<Point[]>((paper, point) => {
        const [x, y] = flipPoint(point, instruction);
        const isPointAlreadyDrawn = !!paper.find(([px, py]) => x === px && y === py);
        return (x < 0 || y < 0) || isPointAlreadyDrawn ? paper : [...paper, [x, y]];
    }, []);
};

const drawPaper = (points: Point[]) => console.log(constructPaper(points).map(line => line.join("")).join("\n"));

(() => {
    const input = loadInput("input");

    const { points, instructions } = parsePointsAndInstructions(input);

    const paper = instructions.reduce((paper, instruction) => foldPaper(paper, instruction), points);

    drawPaper(paper);
})();