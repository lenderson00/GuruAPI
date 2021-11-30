import { isPartValidation } from './is-part-validation'
import { InvalidParamError } from '../../presentation/errors'

const field = 'any_field'
const array = ['data1','data2', 'data3']

const makeSut = (): isPartValidation<string> => {
  return new isPartValidation(field, array)
}

describe('isPartValidation Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'data4' })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: 'data1' })
    expect(error).toBeFalsy()
  })
})