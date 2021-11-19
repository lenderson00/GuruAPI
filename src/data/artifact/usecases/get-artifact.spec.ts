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
        const id = { id: "valid_id"}
        await sut.get(id)
        expect(gelArtifactSpy).toHaveBeenCalledWith(id)
    })
})