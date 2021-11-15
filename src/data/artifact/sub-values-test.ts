
import substatsValues from "./gen-substat-values-possibilities.json"
import { allSubStats } from "./combinations";
import { Stats } from "./enums";

const sv: { [key: string]: { [key2: string]: number[]} } = substatsValues;

const gameValues = {
    [Stats.HPFlat]: [807,777,747,657,598,568,538,508,478,448,418,299,269,239,209,],
    [Stats.HP]: [26.8,16.9,14.6,14,11.7,11.1,9.9,9.3,8.7,8.2,5.8,],
    [Stats.ATKFlat]: [54,53,51,49,47,45,43,39,37,35,33,31,29,27,19,],
    [Stats.ATK]: [21,16.9,16.3,15.7,15.2,14.6,14,13.4,11.7,11.1,10.5,9.9,9.3,8.7,5.8,],
    [Stats.DEFFlat]: [65,60,58,56,46,44,42,39,37,35,32,23,],
    [Stats.DEF]: [24.1,22.6,21.1,20.4,19.7,18.2,13.9,13.1,12.4,11.7,10.9,7.3,],
    [Stats.CR]: [19.1,13.2,12.4,10.9,10.5,10.1,9.7,9.3,8.6,7.8,7.4,7,6.6,6.2,5.8,3.9,],
    [Stats.CD]: [33.4,31.1,28.8,28,27.2,25.6,24.9,22.5,21.8,21,20.2,19.4,18.7,17.9,17.1,15.5,14.8,14,13.2,12.4,11.7,10.9,7.8,],
    [Stats.ER]: [22.7,22,20.1,19.4,18.8,18.1,17.5,16.8,16.2,15.5,14.9,13,12.3,11.7,11,10.4,9.7,6.5,],
    [Stats.EM]: [89,72,61,58,54,51,49,47,44,42,40,37,35,33,23,],
}

for (const sub of allSubStats) {  
    for (const value of gameValues[sub]) {
        let found: boolean|undefined = undefined;
        for (let i = 1; i < 7; i++) {
            found = sv[sub][i].includes(value) || found
        }
        if (!found) console.log(`Error in: ${sub} | Value: ${value}`)
    }        
}