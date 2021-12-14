import { loadInput } from "../utils/utils";

type Point = [number, number];
type Axis = "x" | "y";
type Instruction = [Axis, number];

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

(() => {
    const input = loadInput("input");

    const { points, instructions } = parsePointsAndInstructions(input);

    const firstFold = foldPaper(points, instructions[0]).length;

    console.log(firstFold);
})();