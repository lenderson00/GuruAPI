import { throwError } from "../../../../tests/mocks/test-helper"
import { GetArtifactRepoParams } from "../protocols/get-artifact-repo"
import { GetArtifactDB } from "./get-artifact"
import { getArtifactRepoSpy } from "./mock-artifact-db"

const makeSut = () => {
    const getArtifactRepoStub = new getArtifactRepoSpy()
    const sut = new GetArtifactDB(getArtifactRepoStub)
    return { sut, getArtifactRepoStub }
}

describe ('Get-Artifact-DB Usecase', () => {

    test('Should call GetArtifactRepo with correct values', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        const gelArtifactSpy = jest.spyOn(getArtifactRepoStub, 'get')
        const ids = { ids: ["valid_id"], fields: ['set', 'type', 'level', 'mainstat', 'mainstatValue', 'substats', 'score'] }
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

    test('Should return empty object if id was not found', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        jest.spyOn(getArtifactRepoStub, 'get').mockImplementationOnce(async (id: GetArtifactRepoParams) => new Promise((res) => res({})))
        const ids = { ids: ["valid_id"] }
        const response = await sut.get(ids)
        expect(response).toStrictEqual({})
    })
})