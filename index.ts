import { GetArtifactDB } from "./src/data/artifact/usecases/get-artifact"
import { getArtifactRepoSpy } from "./src/data/artifact/usecases/mock-artifact-db"

const makeSut = () => {
    const getArtifactRepoStub = new getArtifactRepoSpy()
    const sut = new GetArtifactDB(getArtifactRepoStub)
    return { sut, getArtifactRepoStub }
}