import { loadInput } from "../utils/utils";

type Sequence = string;
type Patterns = [Sequence, Sequence, Sequence, Sequence, Sequence, Sequence, Sequence, Sequence, Sequence, Sequence];
type Output = [Sequence, Sequence, Sequence, Sequence];
type Entry = [Patterns, Output];

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Decoded = { [sequence: Sequence]: Digit };

const parseEntries = (data: string[]) => {
    return data.map(row => row.split(" | ").map(part => part.split(" ").map(seq => [...seq].sort().join("")))) as Entry[];
};

const difference = (xs: string, ys: string) => [...xs].filter(x => !ys.includes(x)).concat([...ys].filter(y => !xs.includes(y)));
const contains = (xs: string, ys: string) => [...ys].every(y => xs.includes(y));

const getSequenceOfDigit = (digit: Digit, decoded: Decoded) => Object.keys(decoded).filter(seq => decoded[seq] === digit)[0];

const decodeNonUnique = (seq: Sequence, uniques: Decoded) => {
    const sequences = {
        1: getSequenceOfDigit(1, uniques),
        4: getSequenceOfDigit(4, uniques),
        7: getSequenceOfDigit(7, uniques),
        8: getSequenceOfDigit(8, uniques),
    };

    const a = difference(sequences[7], sequences[1])[0];
    const b_d = difference(sequences[4], sequences[1]);
    const e_g = difference(difference(sequences[8], sequences[4]).join(""), a);

    const has_e_g = contains(seq, e_g.join("")); // 0, 2, 6
    const has_b_d = contains(seq, b_d.join("")); // 5, 6, 9

    if(has_e_g && has_b_d) return 6;

    if(has_e_g){ // 0, 2
        return contains(seq, sequences[1]) ? 0 : 2;
    }
    if(has_b_d){ // 5, 9
        return contains(seq, sequences[1]) ? 9 : 5;
    }

    return 3;
};

const input = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf".split("\n");

(() => {
    const input = loadInput("input");

    const entries = parseEntries(input);

    type UniqueLengths = { [length: number]: Digit };
    const uniqueLength: UniqueLengths = { 2:1, 3:7, 4:4, 7:8 };

    let sum = 0;
    for(const [patterns, output] of entries){
        const uniques = patterns.reduce<Decoded>((uniques, seq) => {
            const decodedUnique = uniqueLength[seq.length];
            return decodedUnique ? { ...uniques, [seq]: decodedUnique } : uniques;
        }, {});
        
        const uniqueSequences = Object.keys(uniques);
        const nonUniquePatterns = patterns.filter(seq => !uniqueSequences.includes(seq));

        const nonUniques = nonUniquePatterns.reduce<Decoded>((nonUniques, seq) => {
            return { ...nonUniques, [seq]: decodeNonUnique(seq, uniques) };
        }, {});
        
        const decoded = { ...uniques, ...nonUniques };

        const outputValue = parseInt(output.map(seq => decoded[seq]).join(""));
        
        sum += outputValue;
    }
    
    console.log({ sum })
})();
