import { Validation } from '../../presentation/protocols'
import { InvalidParamError } from '../../presentation/errors'

export class isPartValidation<T> implements Validation {
  constructor (private readonly fieldName: string, private readonly arrayName: Array<T>) {}

  validate (input: any): Error | null {
    if (!this.arrayName.includes(input[this.fieldName])) return new InvalidParamError(this.fieldName)
    return null
  }
}