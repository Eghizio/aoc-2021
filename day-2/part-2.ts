import { loadInput } from "../utils/utils";

type Move = "forward" | "up" | "down";
type Command = `${Move} ${number}`;
interface Position {
    h: number;
    d: number;
    a: number;
}

/*
down X increases your aim by X units.
up X decreases your aim by X units.
forward X does two things:
    It increases your horizontal position by X units.
    It increases your depth by your aim multiplied by X.

*/

const performCommand = (comm: Command, { h, d, a }: Position) => {
    const [move, strStep] = comm.split(" ") as [Move, string];
    const step = parseInt(strStep);

    if(move === "down") return { h, d, a: a + step };
    if(move === "up") return { h, d, a: a - step };

    if(move === "forward") return { h: h + step, d: d + a*step, a };

    return { h, d, a };
} 

const followCommands = (commands: Command[], startingPosition: Position = { h: 0, d: 0, a: 0 }) => {
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