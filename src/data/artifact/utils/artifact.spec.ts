import { Artifact } from "./artifact"
import { upgradeTiers } from "./chances"
import { Sets, Stats, Types } from "./enums"
import { makeArtifactValidation } from '../../../validation/validators/artifact-validation'
import { MissingParamError } from "../../../presentation/errors"

const makeSut = () => {
    const sut = new Artifact()
    sut.import({
        userid: 'any_userid',
        set: Sets.AP,
        type: Types.Flower,
        level: 20,
        mainstat: Stats.HPFlat,
        substats: [
            {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]*3},
            {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]*2},
            {substat: Stats.CD, value: upgradeTiers["CRIT DMG%"][0]},
            {substat: Stats.CR, value: upgradeTiers["CRIT Rate%"][0]*2}
        ]
    })
    const validation = makeArtifactValidation()
    return { sut, validation }
}

describe ('Artifact Util', () => {
    describe ('Validate', () => {
        test('Should call Validation Composite with correct value', () => {
            const { sut, validation } = makeSut()
            const validationSpy = jest.spyOn(validation, 'validate')
            sut.validate(validation)
            expect(validationSpy).toHaveBeenCalledWith(sut)
        })

        test('Should return null on success', () => {
            const { sut, validation } = makeSut()
            const isInvalid = sut.validate(validation)
            expect(isInvalid).toBeNull()
        })

        test('Should return an error if Validation Composite returns an Error', () => {
            const { sut, validation } = makeSut()
            jest.spyOn(validation, 'validate').mockReturnValueOnce(new Error('any_error'))
            const isInvalid = sut.validate(validation)
            expect(isInvalid).toEqual(new Error('any_error'))
        })
    })

    describe ('createRepoData', () => {
        test('Should throw MissingParamError if basic param is missing', async () => {
            const { sut } = makeSut()
            sut.set = undefined
            const promise = sut.createRepoData()
            expect(promise).rejects.toThrowError(new MissingParamError('set'))
        })

        test('Should return AddArtifactRepoParams on success', async () => {
            const { sut } = makeSut()
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