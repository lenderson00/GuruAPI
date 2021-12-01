import { allowedMainStats } from "../../data/artifact/utils/combinations";
import { Type } from "../../data/artifact/utils/enums";
import { InvalidParamError } from "../../presentation/errors";
import { Validation } from "../../presentation/protocols";

export class isAllowedMainStatValidation implements Validation {
    validate (input: any): Error | null {
        if (!allowedMainStats[input.type as Type].includes(input.mainstat as never)) return new InvalidParamError('mainstat')
        return null
      }
}