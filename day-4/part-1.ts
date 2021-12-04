import { loadInput } from "../utils/utils";

type Board = number[][];
const BOARD_SIZE = 5;
const MARK = -1;

const parseBoard = (lines: string[]): Board => {
    const numbers = lines
        .map(line => line.split(" ")
            .filter(el => el)
            .map(el => parseInt(el))
        );
    
    return numbers;
};

const getSequenceAndBoards = (data: string[]) => {
    if(data.length === 0) throw new Error("Input is empty.");

    const sequence = data.splice(0, 1)[0].split(",").map(el => parseInt(el));

    const boards: Board[] = [];
    const rawBoards = data.filter(line => line);
    
    while(rawBoards.length){
        const board = parseBoard(rawBoards.splice(0, BOARD_SIZE));
        boards.push(board);
    }

    return { sequence, boards };
};

const markBoard = (board: Board, number: number): Board => {
    return board.map(lines => lines.map(num => num === number ? MARK : num));
};

const checkBoard = (board: Board) => {
    const rowChecked = board.map(row => row.every(num => num === MARK)).some(row => row);
    if(rowChecked) return rowChecked;

    
    for(let x=0; x<BOARD_SIZE; x++){
        let markAmount = 0;
        for(let y=0; y<BOARD_SIZE; y++){
            if(board[y][x] === MARK) markAmount++;
        }
        if(markAmount === BOARD_SIZE) return true;
    }
    return false;
};

const playGame = (boards: Board[], numbers: number[]) => {
    for(const num of numbers){
        boards = boards.map(board => markBoard(board, num));
        for(const board of boards){
            const isWinningBoard = checkBoard(board);
            if(isWinningBoard) return { board, num };
        }
    }

    return { board: [], num: MARK };
};

const calculateWinningScore = (board: Board, num: number) => {
    const boardRemainingSum = board.flat().filter(el => el !== MARK).reduce((sum, el) => sum+el, 0);
    return boardRemainingSum * num;
};

(() => {
    const input = loadInput("input");

    const { sequence, boards } = getSequenceAndBoards(input);
    const { board, num } = playGame(boards, sequence);

    const winningScore = calculateWinningScore(board, num);

    console.log(winningScore);
})();
