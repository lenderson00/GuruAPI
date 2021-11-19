import { throwError } from "../../../../tests/mocks/test-helper"
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
        const id = { id: "valid_id" }
        await sut.get(id)
        expect(gelArtifactSpy).toHaveBeenCalledWith(id)
    })

    test('Should throw if GetArtifactRepo throws', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        jest.spyOn(getArtifactRepoStub, 'get').mockImplementationOnce(throwError)
        const id = { id: "valid_id" }
        const promise = sut.get(id)
        await expect(promise).rejects.toThrow()
    })
})