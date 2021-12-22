import { ValidationComposite, RequiredFieldValidation } from '../../../validation/validators'
import { Validation } from '../../../presentation/protocols'
import { isArtifactLevelValidation } from '../../../validation/validators/is-part-validation'
import { isAllowedSubStatValidation, isAllowedSubStatValueValidation } from '../../../validation/validators/is-allowed-validation'

export const makeUpdArtifactValidation = (): ValidationComposite => {
  
  const validations: Validation[] = []
  for (const field of ['userid', 'dtAdded']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new isArtifactLevelValidation())
  validations.push(new isAllowedSubStatValidation())
  validations.push(new isAllowedSubStatValueValidation())

  return new ValidationComposite(validations)
}