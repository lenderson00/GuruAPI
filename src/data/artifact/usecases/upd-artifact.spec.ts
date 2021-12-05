import { throwError } from "../../../../tests/mocks/test-helper"
import { UpdArtifactParams } from "../../../domain/artifact/usecases/crud-artifact"
import { upgradeTiers } from "../utils/chances"
import { Sets, Types, Stats } from "../utils/enums"
import { getArtifactRepoSpy, updArtifactRepoSpy } from "./mock-artifact-db"
import { UpdArtifactDB } from "./upd-artifact"

const makeSut = () => {
    const updArtifactRepoStub = new updArtifactRepoSpy()
    const getArtifactRepoStub = new getArtifactRepoSpy()
    /* const validationStub = new ValidationSpy() */
    const sut = new UpdArtifactDB(updArtifactRepoStub, getArtifactRepoStub)
    return { sut, updArtifactRepoStub, getArtifactRepoStub }
}

const mockUpdArtifactParams = (): UpdArtifactParams => ({
    id: 'valid_id',
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

describe ('Upd-Artifact-DB Usecase', () => {
    test('Should call GetArtifactRepo with correct values', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        const getArtifactSpy = jest.spyOn(getArtifactRepoStub, 'get')
        await sut.update(mockUpdArtifactParams())
        expect(getArtifactSpy).toHaveBeenCalledWith({ ids: ['valid_id'] })
    })

    test('Should call UpdArtifactRepo with correct values', async () => {
        const { sut, updArtifactRepoStub } = makeSut()
        const updArtifactSpy = jest.spyOn(updArtifactRepoStub, 'update')
        await sut.update(mockUpdArtifactParams())
        expect(updArtifactSpy).toHaveBeenCalledWith({
            id: 'valid_id',
            level: 20,
            mainstatValue: 4780,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]*3},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]*2},
                {substat: Stats.CD, value: upgradeTiers["CRIT DMG%"][0]},
                {substat: Stats.CR, value: upgradeTiers["CRIT Rate%"][0]*2}
            ],
            scoreDflt: 451.79999999999995,
            scoreDfltLvl20Avg: 0,
            scoreDfltLvl20Max: 0,
            scoreDfltLvl20Min: 0,
            scoreDfltLvl20SD: 0,
            scoreDfltMainstat: 85,
            scoreDfltSubstats: 366.79999999999995,
            dtModified: (new Date()).toUTCString()
        })
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

    test('Should return true on success', async () => {
        const { sut } = makeSut()
        const isValid = await sut.update(mockUpdArtifactParams())
        expect(isValid).toBe(true)
    })

    test('Should return false if UpdArtifactRepo returns false', async () => {
        const { sut, updArtifactRepoStub } = makeSut()
        jest.spyOn(updArtifactRepoStub, 'update').mockImplementationOnce(async () => new Promise((res) => res(false)))
        const isValid = await sut.update(mockUpdArtifactParams())
        expect(isValid).toBe(false)
    })
})