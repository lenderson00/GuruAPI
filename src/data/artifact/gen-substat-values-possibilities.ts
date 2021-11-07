import { writeFile } from "fs";
import { BaseN } from "js-combinatorics";
import { upgradeTiers } from "./chances";
import { SubStats } from "./enums";

const subPossible: { [key: string]: { [key2: number]: number[]} } = {};

for (const key in upgradeTiers) {
    if (Object.prototype.hasOwnProperty.call(upgradeTiers, key)) {
        const element = upgradeTiers[key as SubStats];
        subPossible[key] = {};
        for (let index = 1; index < 7; index++) {
            subPossible[key][index] = new BaseN(element, index).toArray()  // Calculate all probabilities n times
                .map(x => Math.round(x.reduce((p,c) => p+c)*100)/100)  // Sum all rolls, round them on 2nd decimal
                    .filter((item: number, index: number, array: number[]) => array.findIndex((t: number) => t === item) === index);  // and remove duplicates
        }
        
    }
}

writeFile('./src/data/artifact/gen-substat-values-possibilities.json', JSON.stringify(subPossible, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file');
});