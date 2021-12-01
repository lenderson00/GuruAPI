import { allowedMainStats, allowedSubStats } from "../../data/artifact/utils/combinations";
import { MainStat, Stats, SubStat, SubStats, Type } from "../../data/artifact/utils/enums";
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
        input.substats.forEach((substat: { substat: SubStat; }) => {
            if (!allowedSubStats[input.mainstat as MainStat].includes(substat.substat)) {
                result =  new InvalidParamError('substat')
            }
        });
        return result
      }
}