import { InvalidParamError } from '../../presentation/errors'
import { Sets, Stats, Types } from '../../data/artifact/utils/enums'
import { isAllowedMainStatValidation } from './is-allowed-validation'

describe('isAllowedValidation', () => {
  
  describe('isAllowedMainStatValidation', () => {
    test('Should return a InvalidParamError if validation fails', () => {
      const sut = new isAllowedMainStatValidation()
      const error = sut.validate({
          type: Types.Flower,
          mainstat: Stats.Anemo
      })
      expect(error).toEqual(new InvalidParamError('mainstat'))
    })

    test('Should not return if validation succeeds', () => {
      const sut = new isAllowedMainStatValidation()
      const error = sut.validate({
        type: Types.Flower,
        mainstat: Stats.HPFlat
    })
      expect(error).toBeFalsy()
    })
  })
})