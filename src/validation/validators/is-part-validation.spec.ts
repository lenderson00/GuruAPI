import { isArtifactLevelValidation, isArtifactMainStatValidation, isArtifactSetValidation, isArtifactSubStatValidation, isArtifactTypeValidation, isPartValidation } from './is-part-validation'
import { InvalidParamError } from '../../presentation/errors'
import { Sets, Stats, SubStat, Types } from '../../data/artifact/utils/enums'

const field = 'any_field'
const array = ['data1','data2', 'data3']

const makeSut = (): isPartValidation<string> => {
  return new isPartValidation(field, array)
}

describe('isPartValidation', () => {
  
  describe('General isPartValidation', () => {
    test('Should return a InvalidParamError if validation fails', () => {
      const sut = makeSut()
      const error = sut.validate({ [field]: 'data4' })
      expect(error).toEqual(new InvalidParamError(field))
    })

    test('Should not return if validation succeeds', () => {
      const sut = makeSut()
      const error = sut.validate({ [field]: 'data1' })
      expect(error).toBeFalsy()
    })
  })

  describe('is-artifact-set Validation', () => {
    test('Should return a InvalidParamError if validation fails', () => {
      const sut = new isArtifactSetValidation()
      const error = sut.validate({ set: 'invalid_set' })
      expect(error).toEqual(new InvalidParamError('set'))
    })

    test('Should not return if validation succeeds', () => {
      const sut = new isArtifactSetValidation()
      const error = sut.validate({ set: Sets.AP })
      expect(error).toBeFalsy()
    })
  })

  describe('is-artifact-type Validation', () => {
    test('Should return a InvalidParamError if validation fails', () => {
      const sut = new isArtifactTypeValidation()
      const error = sut.validate({ type: 'invalid_type' })
      expect(error).toEqual(new InvalidParamError('type'))
    })

    test('Should not return if validation succeeds', () => {
      const sut = new isArtifactTypeValidation()
      const error = sut.validate({ type: Types.Circlet })
      expect(error).toBeFalsy()
    })
  })

  describe('is-artifact-level Validation', () => {
    test('Should return a InvalidParamError if validation fails', () => {
      const sut = new isArtifactLevelValidation()
      const error = sut.validate({ level: 999 })
      expect(error).toEqual(new InvalidParamError('level'))
    })

    test('Should not return if validation succeeds', () => {
      const sut = new isArtifactLevelValidation()
      const error = sut.validate({ level: 20 })
      expect(error).toBeFalsy()
    })
  })

  describe('is-artifact-mainstat Validation', () => {
    test('Should return a InvalidParamError if validation fails', () => {
      const sut = new isArtifactMainStatValidation()
      const error = sut.validate({ mainstat: Stats.DEFFlat })
      expect(error).toEqual(new InvalidParamError('mainstat'))
    })

    test('Should not return if validation succeeds', () => {
      const sut = new isArtifactMainStatValidation()
      const error = sut.validate({ mainstat: Stats.DEF })
      expect(error).toBeFalsy()
    })
  })

  describe('is-artifact-substat Validation', () => {
    test('Should return a InvalidParamError if validation fails', () => {
      const sut = new isArtifactSubStatValidation()
      const error = sut.validate({ substats: [{ substat: Stats.Electro as SubStat, value: 7.8 }]})
      expect(error).toEqual(new InvalidParamError('substat'))
    })

    test('Should not return if validation succeeds', () => {
      const sut = new isArtifactSubStatValidation()
      const error = sut.validate({ substats: [{ substat: Stats.EM as SubStat, value: 28 }]})
      expect(error).toBeFalsy()
    })
  })
})