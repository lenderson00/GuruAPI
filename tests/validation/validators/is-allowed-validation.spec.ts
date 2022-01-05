import { InvalidParamError } from '@/presentation/errors'
import { Stats, Types } from '@/data/artifact/utils/enums'
import { isAllowedMainStatValidation, isAllowedSubStatValidation, isAllowedSubStatValueValidation } from '@/validation/validators'
import { upgradeTiers } from '@/data/artifact/utils/chances'

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

  describe('isAllowedSubStatValidation', () => {
    test('Should return a InvalidParamError if validation fails', () => {
      const sut = new isAllowedSubStatValidation()
      const error = sut.validate({
        mainstat: Stats.HPFlat,
        substats: [
          {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*2*10)/10},
          {substat: Stats.HPFlat, value: Math.round(upgradeTiers.HP[0]*3)},
          {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10},
          {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0]*2)},
        ]
      })
        expect(error).toEqual(new InvalidParamError('substat 2 (HP)'))
    })

    test('Should return a InvalidParamError if there is substat duplication', () => {
      const sut = new isAllowedSubStatValidation()
      const error = sut.validate({
        mainstat: Stats.HPFlat,
        substats: [
          {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*2*10)/10},
          {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.HP[0]*3)},
          {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10},
          {substat: Stats.DEF, value: Math.round(upgradeTiers.DEF[0]*2)},
        ]
      })
        expect(error).toEqual(new InvalidParamError('substat 4 (DEF%)'))
    })

    test('Should return a InvalidParamError if there are more than 4 substats', () => {
      const sut = new isAllowedSubStatValidation()
      const error = sut.validate({
        mainstat: Stats.HPFlat,
        substats: [
          {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*10)/10},
          {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.HP[0])},
          {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10},
          {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0])},
          {substat: Stats.CD, value: Math.round(upgradeTiers['CRIT DMG%'][0]*10)/10},
        ]
      })
        expect(error).toEqual(new InvalidParamError('cannot have more than 4 substats'))
    })

    test('Should not return if validation succeeds', () => {
      const sut = new isAllowedSubStatValidation()
      const error = sut.validate({
        mainstat: Stats.HPFlat,
        substats: [
          {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*2*10)/10},
          {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]*3)},
          {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10},
          {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0]*2)},
        ]
      })
      expect(error).toBeFalsy()
    })
  })

  describe('isAllowedSubStatValueValidation', () => {
    test('Should return a InvalidParamError if validation fails', () => {
      const sut = new isAllowedSubStatValueValidation()
      const error = sut.validate({
        level: 20,
        substats: [
          {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*2*10)/10},
          {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]*3)},
          {substat: Stats.CR, value: 7.7},
          {substat: Stats.HPFlat, value: Math.round(upgradeTiers.HP[0]*3)},
        ]
      })
        expect(error).toEqual(new InvalidParamError('substat 3 value (7.7 for CRIT Rate%)'))
    })

    test('Should return a InvalidParamError if substats values indicate more than max upgrade rolls', () => {
      const sut = new isAllowedSubStatValueValidation()
      const error = sut.validate({
        level: 6,
        substats: [
          {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*10)/10},
          {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]*2)},
          {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*2*10)/10},
          {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0])}
        ]
      })
        expect(error).toEqual(new InvalidParamError('Invalid # of upgrades: 2 (max: 1)'))
    })

    test('Should not return if validation succeeds', () => {
      const sut = new isAllowedSubStatValueValidation()
      const error = sut.validate({
        level: 20,
        substats: [
          {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*2*10)/10},
          {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]*3)},
          {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10},
          {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0]*2)},
        ]
      })
      expect(error).toBeFalsy()
    })
  })
})