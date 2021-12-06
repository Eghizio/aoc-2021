import { loadInput, update, add } from "../utils/utils";

type Age = number;
type Census = [Age, Age, Age, Age, Age, Age, Age, Age, Age];

const parseAges = (data: string[]) => data.flatMap(line => line.split(",").map(a => parseInt(a)))
    .reduce<Census>((census, age) => update(age, add(1), census) as Census, [0,0,0,0,0,0,0,0,0]);

const day = (ages: Census) => {
    const [head, ...tail] = ages;
    return update(6, add(head), [...tail, head]) as Census;
};

const passDays = (ages: Census, days: number): Census => days > 0 ? passDays(day(ages), days-1) : ages;

const countPopulation = (ages: Census) => ages.reduce((sum, ageGroup) => sum + ageGroup, 0);

(() => {
    const input = loadInput("input");

    const initialCensus = parseAges(input);
    const census = passDays(initialCensus, 256);

    const lanternfishPopulation = countPopulation(census);
    
    console.log(lanternfishPopulation);
})();
