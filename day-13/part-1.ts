import { loadInput } from "../utils/utils";

type Point = [number, number];
type Axis = "x" | "y";
type Instruction = [Axis, number]
type Lines = { points: Point[]; instructions: Instruction[]; };
type Mark = "." | "#";
type Paper = Mark[][];

const parsePoint = (line: string) => line.split(",").map(c => parseInt(c)) as Point;

const parseInstruction = (line: string) => {
    const [axis, value] = line.replace("fold along ", "").split("=");
    return [axis, parseInt(value)] as Instruction;
};

const parsePointsAndInstructions = (data: string[]) => {
    return data.filter(l => l.trim().length).reduce<Lines>(({ points, instructions }, line) => {
        return line.startsWith("fold")
            ? { points, instructions: [...instructions, parseInstruction(line)] }
            : { instructions, points: [...points, parsePoint(line)] };
    }, { points: [], instructions: [] });
};

const constructPaper = (points: Point[]) => {
    const [xs, ys] = points.reduce<[number[], number[]]>(([xs, ys], [x, y]) => [[...xs, x], [...ys, y]], [[], []]);
    const [minX, maxX] = [0, Math.max(...xs)+1];
    const [minY, maxY] = [0, Math.max(...ys)+1];

    const paper: Paper = [];

    for(let y=minY; y<maxY; y++){
        const line: Mark[] = [];
        for(let x=minX; x<maxX; x++){
            const mark = points.find(([px, py]) => x === px && y === py) ? "#" : ".";
            line.push(mark);
        }
        paper.push(line);
    }

    return paper;
};
// [4,4], [2,1], [0,4]
// ["x", 2] ["y", 3]
const flipPoint = (point: Point, [axis, value]: Instruction): Point => {
    const i = axis === "x" ? 0 : 1; // [x, y] : [y, x];
    if(point[i] < value) return point;

    const distance = point[i] - value; // if dist < 0, out of paper
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

const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`.split("\n");

const test = () => {
    const points: Point[] = [[4,4], [2,1], [0,4]];
    const x: Instruction = ["x", 1];
    const y: Instruction = ["y", 3];

    return { points, flip: { x, y } };
};

const drawPaper = (points: Point[]) => console.log(constructPaper(points).map(line => line.join("")).join("\n"));

(() => {
    const input = loadInput("input");
    // const { points, flip } = test();

    const { points, instructions } = parsePointsAndInstructions(input);

    // const firstFold = foldPaper(points, flip.y);
    const firstFold = foldPaper(points, instructions[0]);


    const paper = instructions.reduce((paper, instruction) => foldPaper(paper, instruction), points);
    drawPaper(paper);
    console.log(`After first fold: ${firstFold.length}`);
})();