import { throwError } from "../../../../tests/mocks/test-helper"
import { GetArtifactParams, GetArtifactResults } from "../../../domain/artifact/usecases/crud-artifact"
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
        userid: 'valid_userid',
        dtAdded: 'valid_date',
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
    notFound: []
}

const validKeys: GetArtifactParams = {
    keys: [{ userid: "valid_userid", dtAdded: 'valid_date' }]
}

describe ('Get-Artifact-DB Usecase', () => {

    test('Should call GetArtifactRepo with correct values', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        const gelArtifactSpy = jest.spyOn(getArtifactRepoStub, 'get')
        const ids = { keys: [{ userid: "valid_userid", dtAdded: 'valid_date'}]}
        await sut.get(ids)
        expect(gelArtifactSpy).toHaveBeenCalledWith(ids)
    })

    test('Should throw if GetArtifactRepo throws', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        jest.spyOn(getArtifactRepoStub, 'get').mockImplementationOnce(throwError)
        const promise = sut.get(validKeys)
        await expect(promise).rejects.toThrow()
    })

    test('Should return empty array on Found and id on notFound if no id was found', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        jest.spyOn(getArtifactRepoStub, 'get').mockImplementationOnce(async () => new Promise((res) => res([])))
        const response = await sut.get(validKeys)
        expect(response).toEqual({found: [], notFound: [{ userid: "valid_userid", dtAdded: 'valid_date' }]})
    })

    test('Should return empty array on notFound and data on Found if id was found', async () => {
        const { sut } = makeSut()
        const response = await sut.get(validKeys)
        expect(response).toEqual(makeFakeRepoResponse)
    })

    test('Should return correct data if just some ids were found', async () => {
        const { sut } = makeSut()
        const ids = { keys: [
            { userid: "valid_userid", dtAdded: 'invalid_date1' },
            { userid: "valid_userid", dtAdded: 'valid_date' },
            { userid: "valid_userid", dtAdded: 'invalid_date2' }
        ]}
        const response = await sut.get(ids)
        expect(response).toEqual({
            found: [{
                userid: 'valid_userid',
                dtAdded: 'valid_date',
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
            notFound: [
                { userid: "valid_userid", dtAdded: 'invalid_date1' },
                { userid: "valid_userid", dtAdded: 'invalid_date2' }
            ]}
        )
    })
})