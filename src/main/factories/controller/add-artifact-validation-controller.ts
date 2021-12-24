import { ValidationComposite, RequiredFieldValidation } from '../../../validation/validators'
import { Validation } from '../../../presentation/protocols'
import { isArtifactLevelValidation, isArtifactSetValidation, isArtifactTypeValidation } from '../../../validation/validators/is-part-validation'
import { isAllowedMainStatValidation, isAllowedSubStatValidation, isAllowedSubStatValueValidation } from '../../../validation/validators/is-allowed-validation'

export const makeAddArtifactValidation = (): ValidationComposite => {
  
  const validations: Validation[] = []
  for (const field of ['userid','set', 'type', 'level', 'mainstat', 'substats']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new isArtifactSetValidation())
  validations.push(new isArtifactTypeValidation())
  validations.push(new isArtifactLevelValidation())

  validations.push(new isAllowedMainStatValidation())
  validations.push(new isAllowedSubStatValidation())
  validations.push(new isAllowedSubStatValueValidation())

  return new ValidationComposite(validations)
}