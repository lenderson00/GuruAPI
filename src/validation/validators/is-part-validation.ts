import { Validation } from '../../presentation/protocols'
import { InvalidParamError } from '../../presentation/errors'
import { Set, Type, Level, MainStat, SubStatSlot } from '../../data/artifact/utils/enums'
import { allSets, allTypes, allLevels, allMainStats, allSubStats } from '../../data/artifact/utils/combinations'

export class isPartValidation<T> implements Validation {
  constructor (private readonly fieldName: string, private readonly arrayName: Array<T>) {}

  validate (input: Record<string,any>): Error | null {
    if (!this.arrayName.includes(input[this.fieldName] as T)) return new InvalidParamError(this.fieldName)
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
  validate (input: { substats: SubStatSlot[]}): Error | null {
    let error: InvalidParamError | null = null
    input.substats.forEach(sub => {
      if (!allSubStats.includes(sub.substat)) error = error || new InvalidParamError('substat')
    })
    return error
  }
}