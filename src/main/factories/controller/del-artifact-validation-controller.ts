import { ValidationComposite, RequiredFieldValidation } from '../../../validation/validators'
import { Validation } from '../../../presentation/protocols'

export const makeDelArtifactValidation = (): ValidationComposite => {
  
  const validations: Validation[] = []
  for (const field of ['userid', 'dtAdded']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}