import { GetArtifact, GetArtifactResult } from "../../domain/artifact/usecases/crud-artifact"
import { MissingParamError } from "../errors"
import { GetArtifactController, Request } from "./get-artifact-controller"

const makeSut = () => {
    const getArtifactStub: GetArtifact = {
        get: async () => {
            return new Promise((res) => res({} as GetArtifactResult))
        }
    }
   
    const sut = new GetArtifactController(getArtifactStub)
    return { sut, getArtifactStub }
}

describe ('Delete Artifact Controller', () => {

    test('Should return 400 if no id is provided', async () => {
        const { sut } = makeSut();
        const httpRequest: Request = {}
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('id'));
    })
})