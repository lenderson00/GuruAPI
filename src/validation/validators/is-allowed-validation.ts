/* eslint-disable @typescript-eslint/no-explicit-any */
import { allowedMainStats, allowedSubStats } from "../../data/artifact/utils/combinations";
import substatsValues from "../../data/artifact/utils/gen-substat-values-possibilities.json"
import { MainStat, SubStat, SubStats, Type } from "../../data/artifact/utils/enums";
import { InvalidParamError } from "../../presentation/errors";
import { Validation } from "../../presentation/protocols";

export class isAllowedMainStatValidation implements Validation {
    validate (input: any): Error | null {
        if (!allowedMainStats[input.type as Type].includes(input.mainstat as never)) return new InvalidParamError('mainstat')
        return null
      }
}

export class isAllowedSubStatValidation implements Validation {
    validate (input: any): Error | null {
        let result = null
        const subs = input.substats.map((x:{ substat: SubStat; }) => x.substat)
        subs.forEach((sub: SubStat, index: number)  => {
            if (!allowedSubStats[input.mainstat as MainStat].includes(sub)) { // Error if substat is now allowed due to mainstat
                result =  new InvalidParamError(`substat ${index+1} (${sub})`)
            }
            if (subs.indexOf(sub) != index) { // Error if there is substat duplication
                result =  new InvalidParamError(`substat ${index+1} (${sub})`)
            }
            if (sub.length > 4) result =  new InvalidParamError('cannot have more than 4 substats')
        });
        return result
      }
}

export class isAllowedSubStatValueValidation implements Validation {
    validate (input: any): Error | null {
        const sv: { [key: string]: { [key2: number|string]: any} } = substatsValues;
        let upgrades = 0;
        let result = null

        input.substats.forEach((sub: { substat: SubStat; value: number; }, index: number) => {
            let found: number|undefined = undefined;
            rollLoop: for (let i = 1; i < 7; i++) {
                found = sv[sub.substat][i].includes(sub.value) || found
                if (found) {
                    upgrades += i-1;
                    break rollLoop;
                }
            }
            if (!found) result = new InvalidParamError(`substat ${index+1} value (${sub.value} for ${sub.substat})`)
        })
        const maxUpgradeRolls = Math.ceil(input.level/4)
        if (upgrades > maxUpgradeRolls) result = new InvalidParamError(`Invalid # of upgrades: ${upgrades} (max: ${maxUpgradeRolls})`)

        return result
      }
}