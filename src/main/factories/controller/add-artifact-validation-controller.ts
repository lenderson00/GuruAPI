import { ValidationComposite, RequiredFieldValidation } from '../../../validation/validators'
import { Validation } from '../../../presentation/protocols'
import { isArtifactLevelValidation, isArtifactSetValidation, isArtifactTypeValidation } from '../../../validation/validators/is-part-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  
  const validations: Validation[] = []
  for (const field of ['set', 'type', 'level', 'mainstat', 'substats']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new isArtifactSetValidation())
  validations.push(new isArtifactTypeValidation())
  validations.push(new isArtifactLevelValidation())

  return new ValidationComposite(validations)
}