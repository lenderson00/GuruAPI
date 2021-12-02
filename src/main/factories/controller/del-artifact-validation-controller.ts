import { ValidationComposite, RequiredFieldValidation } from '../../../validation/validators'
import { Validation } from '../../../presentation/protocols'

export const makeDelArtifactValidation = (): ValidationComposite => {
  
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('id'))
  return new ValidationComposite(validations)
}