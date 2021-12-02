import { loadInput } from "../utils/utils";

type Move = "forward" | "up" | "down";
type Command = `${Move} ${number}`;
interface Position {
    h: number;
    d: number;
}

const performCommand = (comm: Command, { h, d }: Position) => {
    const [move, strStep] = comm.split(" ") as [Move, string];
    const step = parseInt(strStep);

    if(move === "forward") return { h: h + step, d };
    if(move === "up") return { h, d: d - step };
    if(move === "down") return { h, d: d + step };

    return { h, d };
} 

const followCommands = (commands: Command[], startingPosition: Position = { h: 0, d: 0 }) => {
    const finalPosition = commands.reduce(
        (position, command) => performCommand(command, position),
        startingPosition
    );

    return finalPosition;
};

const calcPosition = ({ h, d }: Position) => h * d;

(() => {
    const input = loadInput("input") as Command[];
    
    const finalPosition = followCommands(input);
    const result = calcPosition(finalPosition)
    
    console.log(result);
})();