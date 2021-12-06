import { loadInput } from "../utils/utils";

type Age = number;

const parseAges = (data: string[]) => data.flatMap(row => row.split(",").map(a => parseInt(a))) as Age[];

const day = (ages: Age[]) => ages.flatMap(age => age ? age - 1 : [6, 8]);

const passDays = (ages: Age[], days: number): Age[] => days > 0 ? passDays(day(ages), days-1) : ages;

(() => {
    const input = loadInput("input");

    const initialAges = parseAges(input);
    const ages = passDays(initialAges, 80);

    const lanternfishPopulation = ages.length;
    
    console.log(lanternfishPopulation);
})();
