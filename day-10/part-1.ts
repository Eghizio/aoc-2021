import { loadInput } from "../utils/utils";

type Line = string;
const brackets: { [key: string]: string } = {
    ">": "<",
    ")": "(",
    "]": "[",
    "}": "{",
};

const discardCorruptedLines = (lines: Line[]) => {
    const openingBrackets = Object.values(brackets);
    const firstIllegalCharacters: string[] = [];

    const correctLines = lines.filter(line => {
        const stack = [];

        for(const char of line){
            if(openingBrackets.includes(char)){
                stack.push(char);
                continue;
            }

            if(stack.pop() !== brackets[char]){
                firstIllegalCharacters.push(char);
                return false;
            }
        }
    });

    return firstIllegalCharacters;
};

const score: { [key: string]: number } = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

const input = `[({(<(())[]>[[{[]{<()<>>
    [(()[<>])]({[<{<<[]>>(
    {([(<{}[<>[]}>{[]{[(<()>
    (((({<>}<{<{<>}{[]{[]{}
    [[<[([]))<([[{}[[()]]]
    [{[{({}]{}}([{[{{{}}([]
    {<[[]]>}<{[{[{[]{()[[[]
    [<(<(<(<{}))><([]([]()
    <{([([[(<>()){}]>(<<{{
    <{([{{}}[<[[[<>{}]]]>[]]`.split("\n");

(() => {
    const input = loadInput("input");
    
    const goodLines = discardCorruptedLines(input);

    console.log(goodLines.reduce((sum, b) => score[b]+sum, 0))
})();
