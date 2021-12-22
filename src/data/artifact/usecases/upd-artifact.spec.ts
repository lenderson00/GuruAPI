import { throwError } from "../../../../tests/mocks/test-helper"
import { UpdArtifactParams } from "../../../domain/artifact/usecases/crud-artifact"
import { Artifact } from "../utils/artifact"
import { upgradeTiers } from "../utils/chances"
import { Stats } from "../utils/enums"
import { getArtifactRepoSpy, updArtifactRepoSpy } from "./mock-artifact-db"
import { UpdArtifactDB } from "./upd-artifact"

const makeSut = () => {
    const updArtifactRepoStub = new updArtifactRepoSpy()
    const getArtifactRepoStub = new getArtifactRepoSpy()
    const artifactStub = new Artifact()
    /* const validationStub = new ValidationSpy() */
    const sut = new UpdArtifactDB(updArtifactRepoStub, getArtifactRepoStub, artifactStub)
    return { sut, updArtifactRepoStub, getArtifactRepoStub, artifactStub }
}

const mockUpdArtifactParams = (): UpdArtifactParams => ({
    userid: 'valid_userid',
    dtAdded: 'valid_date',
    /* set: Sets.AP, */
    /* type: Types.Flower, */
    level: 20,
    /* mainstat: Stats.HPFlat, */
    substats: [
        {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]*3},
        {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]*2},
        {substat: Stats.CD, value: upgradeTiers["CRIT DMG%"][0]},
        {substat: Stats.CR, value: upgradeTiers["CRIT Rate%"][0]*2}
    ]
})

describe ('Upd-Artifact-DB Usecase', () => {
    test('Should call GetArtifactRepo with correct values', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        const getArtifactSpy = jest.spyOn(getArtifactRepoStub, 'get')
        await sut.update(mockUpdArtifactParams())
        expect(getArtifactSpy).toHaveBeenCalledWith({ keys: [{ userid: 'valid_userid', dtAdded: 'valid_date' }] })
    })

    test('Should call UpdArtifactRepo with correct values', async () => {
        const { sut, updArtifactRepoStub } = makeSut()
        const updArtifactSpy = jest.spyOn(updArtifactRepoStub, 'update')
        await sut.update(mockUpdArtifactParams())
        expect(updArtifactSpy).toHaveBeenCalledWith({
            userid: 'valid_userid',
            dtAdded: 'valid_date',
            level: 20,
            mainstatValue: 4780,
            substats: [
                {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*3*10)/10},
                {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]*2)},
                {substat: Stats.CD, value: Math.round(upgradeTiers["CRIT DMG%"][0]*10)/10},
                {substat: Stats.CR, value: Math.round(upgradeTiers["CRIT Rate%"][0]*2*10)/10}
            ],
            scoreDflt: 451.79999999999995,
            scoreDfltLvl20Avg: 0,
            scoreDfltLvl20Max: 0,
            scoreDfltLvl20Min: 0,
            scoreDfltLvl20SD: 0,
            scoreDfltMainstat: 85,
            scoreDfltSubstats: 366.79999999999995,
            dtModified: (new Date()).toISOString()
        })
    })

    test('Should call Artifact import', async () => {
        const { sut, artifactStub } = makeSut()
        const artifactSpy = jest.spyOn(artifactStub, 'import')
        await sut.update(mockUpdArtifactParams())
        expect(artifactSpy).toHaveBeenCalled()
    })

    test('Should call Artifact validate', async () => {
        const { sut, artifactStub } = makeSut()
        const artifactSpy = jest.spyOn(artifactStub, 'validate')
        await sut.update(mockUpdArtifactParams())
        expect(artifactSpy).toHaveBeenCalled()
    })

    test('Should call Artifact updateRepoData', async () => {
        const { sut, artifactStub } = makeSut()
        const artifactSpy = jest.spyOn(artifactStub, 'updateRepoData')
        await sut.update(mockUpdArtifactParams())
        expect(artifactSpy).toHaveBeenCalled()
    })

    test('Should throw if GetArtifactRepo throws', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        jest.spyOn(getArtifactRepoStub, 'get').mockImplementationOnce(throwError)
        const promise = sut.update(mockUpdArtifactParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should throw if UpdArtifactRepo throws', async () => {
        const { sut, updArtifactRepoStub } = makeSut()
        jest.spyOn(updArtifactRepoStub, 'update').mockImplementationOnce(throwError)
        const promise = sut.update(mockUpdArtifactParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should throw if Artifact import throws', async () => {
        const { sut, artifactStub } = makeSut()
        jest.spyOn(artifactStub, 'import').mockImplementationOnce(throwError)
        const promise = sut.update(mockUpdArtifactParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should throw if Artifact validate throws', async () => {
        const { sut, artifactStub } = makeSut()
        jest.spyOn(artifactStub, 'validate').mockImplementationOnce(throwError)
        const promise = sut.update(mockUpdArtifactParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should throw if Artifact updateRepoData throws', async () => {
        const { sut, artifactStub } = makeSut()
        jest.spyOn(artifactStub, 'updateRepoData').mockImplementationOnce(throwError)
        const promise = sut.update(mockUpdArtifactParams())
        await expect(promise).rejects.toThrow()
    })

    /* test('Should return InvalidParamError if set is different from DB', async () => {
        const { sut } = makeSut()
        const params = mockUpdArtifactParams()
        params.set = Sets.BC
        const result = await sut.update(params)
        expect(result).toEqual(new InvalidParamError('set'))
    }) */

    /* test('Should return InvalidParamError if type is different from DB', async () => {
        const { sut } = makeSut()
        const params = mockUpdArtifactParams()
        params.type = Types.Sands
        const result = await sut.update(params)
        expect(result).toEqual(new InvalidParamError('type'))
    }) */

    /* test('Should return InvalidParamError if mainstat is different from DB', async () => {
        const { sut } = makeSut()
        const params = mockUpdArtifactParams()
        params.mainstat = Stats.EM
        const result = await sut.update(params)
        expect(result).toEqual(new InvalidParamError('mainstat'))
    }) */

    test('Should return false if UpdArtifactRepo returns false', async () => {
        const { sut, updArtifactRepoStub } = makeSut()
        jest.spyOn(updArtifactRepoStub, 'update').mockImplementationOnce(async () => new Promise((res) => res(false)))
        const isValid = await sut.update(mockUpdArtifactParams())
        expect(isValid).toBe(false)
    })

    test('Should return true on success', async () => {
        const { sut } = makeSut()
        const isValid = await sut.update(mockUpdArtifactParams())
        expect(isValid).toBe(true)
    })
})