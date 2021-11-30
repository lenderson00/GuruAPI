import { ValidationComposite, RequiredFieldValidation } from '../../../validation/validators'
import { Validation } from '../../../presentation/protocols'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['set', 'type', 'level', 'mainstat', 'substats']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}