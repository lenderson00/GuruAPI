/* eslint-disable @typescript-eslint/no-explicit-any */
import { Validation } from '../../presentation/protocols'
import { InvalidParamError } from '../../presentation/errors'
import { Set, Type, Level, MainStat, SubStat } from '../../data/artifact/utils/enums'
import { allSets, allTypes, allLevels, allMainStats, allSubStats } from '../../data/artifact/utils/combinations'

export class isPartValidation<T> implements Validation {
  constructor (private readonly fieldName: string, private readonly arrayName: Array<T>) {}

  validate (input: any): Error | null {
    if (!this.arrayName.includes(input[this.fieldName])) return new InvalidParamError(this.fieldName)
    return null
  }
}

export class isArtifactSetValidation extends isPartValidation<Set> {
  constructor () { super('set', allSets) }
}
export class isArtifactTypeValidation extends isPartValidation<Type> {
  constructor () { super('type', allTypes) }
}
export class isArtifactLevelValidation extends isPartValidation<Level> {
  constructor () { super('level', allLevels) }
}
export class isArtifactMainStatValidation extends isPartValidation<MainStat> {
  constructor () { super('mainstat', allMainStats) }
}
export class isArtifactSubStatValidation implements Validation {
  validate (input: { substats: { substat: SubStat, value: number }[]}): Error | null {
    let error: InvalidParamError | null = null
    input.substats.forEach(sub => {
      if (!allSubStats.includes(sub.substat)) error = error || new InvalidParamError('substat')
    })
    return error
  }
}