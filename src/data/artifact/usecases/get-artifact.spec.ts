import { throwError } from "../../../../tests/mocks/test-helper"
import { GetArtifactResults } from "../../../domain/artifact/usecases/crud-artifact"
import { upgradeTiers } from "../utils/chances"
import { Sets, Stats, Types } from "../utils/enums"
import { GetArtifactDB } from "./get-artifact"
import { getArtifactRepoSpy } from "./mock-artifact-db"

const makeSut = () => {
    const getArtifactRepoStub = new getArtifactRepoSpy()
    const sut = new GetArtifactDB(getArtifactRepoStub)
    return { sut, getArtifactRepoStub }
}

const makeFakeRepoResponse: GetArtifactResults = {
    found: [{
        id: 'valid_id',
        set: Sets.AP,
        type: Types.Flower,
        level: 0,
        mainstat: Stats.HPFlat,
        mainstatValue: 717,
        substats: [
            {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
            {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
            {substat: Stats.CD, value: upgradeTiers["CRIT DMG%"][0]}
        ],
        scoreDflt: 200
    }],
    notFound: []}

describe ('Get-Artifact-DB Usecase', () => {

    test('Should call GetArtifactRepo with correct values', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        const gelArtifactSpy = jest.spyOn(getArtifactRepoStub, 'get')
        const ids = { ids: ["valid_id"] }
        await sut.get(ids)
        expect(gelArtifactSpy).toHaveBeenCalledWith(ids)
    })

    test('Should throw if GetArtifactRepo throws', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        jest.spyOn(getArtifactRepoStub, 'get').mockImplementationOnce(throwError)
        const ids = { ids: ["valid_id"] }
        const promise = sut.get(ids)
        await expect(promise).rejects.toThrow()
    })

    test('Should return empty array on Found and id on notFound if no id was found', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        jest.spyOn(getArtifactRepoStub, 'get').mockImplementationOnce(async () => new Promise((res) => res([])))
        const ids = { ids: ["valid_id"] }
        const response = await sut.get(ids)
        expect(response).toEqual({found: [], notFound: ["valid_id"]})
    })

    test('Should return empty array on notFound and data on Found if id was found', async () => {
        const { sut } = makeSut()
        const ids = { ids: ["valid_id"] }
        const response = await sut.get(ids)
        expect(response).toEqual(makeFakeRepoResponse)
    })

    test('Should return correct data if just some ids were found', async () => {
        const { sut } = makeSut()
        const ids = { ids: ["invalid_id1","valid_id","invalid_id2"] }
        const response = await sut.get(ids)
        expect(response).toEqual({
            found: [{
                id: 'valid_id',
                set: Sets.AP,
                type: Types.Flower,
                level: 0,
                mainstat: Stats.HPFlat,
                mainstatValue: 717,
                substats: [
                    {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                    {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                    {substat: Stats.CD, value: upgradeTiers["CRIT DMG%"][0]}
                ],
                scoreDflt: 200
            }],
            notFound: ["invalid_id1","invalid_id2"]})
    })
})