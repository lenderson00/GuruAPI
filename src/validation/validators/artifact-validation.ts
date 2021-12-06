import { ValidationComposite, RequiredFieldValidation } from '.'
import { Validation } from '../../presentation/protocols'
import { isArtifactLevelValidation, isArtifactMainStatValidation, isArtifactSetValidation, isArtifactSubStatValidation, isArtifactTypeValidation } from './is-part-validation'
import { isAllowedMainStatValidation, isAllowedSubStatValidation, isAllowedSubStatValueValidation } from './is-allowed-validation'

export const makeArtifactValidation = (): ValidationComposite => {
  
  const validations: Validation[] = []
  for (const field of ['set', 'type', 'level', 'mainstat', 'substats']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new isArtifactSetValidation())
  validations.push(new isArtifactTypeValidation())
  validations.push(new isArtifactLevelValidation())
  validations.push(new isArtifactMainStatValidation())
  validations.push(new isArtifactSubStatValidation())

  validations.push(new isAllowedMainStatValidation())
  validations.push(new isAllowedSubStatValidation())
  validations.push(new isAllowedSubStatValueValidation())

  return new ValidationComposite(validations)
}