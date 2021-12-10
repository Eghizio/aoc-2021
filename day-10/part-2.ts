import { loadInput } from "../utils/utils";

type Line = string;
const bracketsOpening: { [key: string]: string } = {
    "<": ">",
    "(": ")",
    "[": "]",
    "{": "}",
};
const bracketsClosing: { [key: string]: string } = {
    ">": "<",
    ")": "(",
    "]": "[",
    "}": "{",
};

const getOpenedBrackets = (lines: Line[]) => {
    const openingBrackets = Object.values(bracketsClosing);

    const correctLines = lines.map(line => {
        const stack = [];

        for(const char of line){
            if(openingBrackets.includes(char)){
                stack.push(char);
                continue;
            }

            if(stack.pop() !== bracketsClosing[char]){
                return [];
            }
        }
        return stack;
    });

    return correctLines.filter(s => s.length);
};

const score: { [key: string]: number } = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
};

const calcScore = (closing: string[]) => closing.reduce((sum, b) => 5*sum+score[bracketsOpening[b]], 0);

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

    const openedBrackets = getOpenedBrackets(input);
    const scores = openedBrackets.map(brs => brs.reverse()).map(calcScore).sort((a,b) => b-a)
    const middleScore = scores[Math.floor(scores.length/2)];
    
    console.log(middleScore);
})();
