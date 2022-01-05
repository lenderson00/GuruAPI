import { Artifact } from '@/data/artifact/utils/artifact'
import { upgradeTiers } from '@/data/artifact/utils/chances'
import { Sets, Stats, Types } from '@/data/artifact/utils/enums'
import { makeArtifactValidation } from '@/validation/validators/artifact-validation'
import { MissingParamError } from '@/presentation/errors'
import { ValidationComposite } from '@/validation/validators'

describe('Artifact Util', () => {
  let sut: Artifact
  let validation: ValidationComposite

  beforeAll(() => {
    sut = new Artifact()
    sut.import({
      userid: 'any_userid',
      set: Sets.AP,
      type: Types.Flower,
      level: 20,
      mainstat: Stats.HPFlat,
      substats: [
        { substat: Stats.ATK, value: upgradeTiers['ATK%'][0] * 3 },
        { substat: Stats.ATKFlat, value: upgradeTiers.ATK[0] * 2 },
        { substat: Stats.CD, value: upgradeTiers['CRIT DMG%'][0] },
        { substat: Stats.CR, value: upgradeTiers['CRIT Rate%'][0] * 2 }
      ]
    })
    validation = makeArtifactValidation()
  })
  describe('Validate', () => {
    test('Should call Validation Composite with correct value', () => {
      const validationSpy = jest.spyOn(validation, 'validate')
      sut.validate(validation)
      expect(validationSpy).toHaveBeenCalledWith(sut)
    })

    test('Should return null on success', () => {
      const isInvalid = sut.validate(validation)
      expect(isInvalid).toBeNull()
    })

    test('Should return an error if Validation Composite returns an Error', () => {
      jest.spyOn(validation, 'validate').mockReturnValueOnce(new Error('any_error'))
      const isInvalid = sut.validate(validation)
      expect(isInvalid).toEqual(new Error('any_error'))
    })
  })

  describe('createRepoData', () => {
    test('Should throw MissingParamError if basic param is missing', async () => {
      sut.set = undefined
      const promise = sut.createRepoData()
      await expect(promise).rejects.toThrowError(new MissingParamError('set'))
    })

    test('Should return AddArtifactRepoParams on success', async () => {
      const result = await sut.createRepoData()
      expect(result.userid).not.toBeUndefined()
      expect(result.set).not.toBeUndefined()
      expect(result.type).not.toBeUndefined()
      expect(result.level).not.toBeUndefined()
      expect(result.mainstat).not.toBeUndefined()
      expect(result.mainstatValue).not.toBeUndefined()
      expect(result.substats).not.toBeUndefined()
      expect(result.scoreDflt).not.toBeUndefined()
      expect(result.scoreDfltMainstat).not.toBeUndefined()
      expect(result.scoreDfltSubstats).not.toBeUndefined()
      expect(result.scoreDfltLvl20Min).not.toBeUndefined()
      expect(result.scoreDfltLvl20Avg).not.toBeUndefined()
      expect(result.scoreDfltLvl20Max).not.toBeUndefined()
      expect(result.scoreDfltLvl20SD).not.toBeUndefined()
      expect(result.dtAdded).not.toBeUndefined()
      expect(result.dtModified).not.toBeUndefined()
    })
  })
})
