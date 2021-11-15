import { DelArtifactRepo } from "../../data/artifact/protocols/del-artifact-repo"
import { DelArtifactResult } from "../../domain/artifact/usecases/crud-artifact"
import { MissingParamError } from "../errors"
import { DelArtifactController, Request } from "./del-artifact-controller"

const makeSut = () => {
    const delArtifactStub: DelArtifactRepo = {
        del: async (data) => {
            return new Promise((res) => res(true as DelArtifactResult))
        }
    }
   
    const sut = new DelArtifactController(/* delArtifactStub */)
    return { sut, delArtifactStub }
}

describe ('Delete Artifact Controller', () => {

    test('Should return 400 if no id is provided', async () => {
        const { sut } = makeSut();
        const httpRequest: Request = { params: {} }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('id'));
    })

    test('Should return 200 if successful', async () => {
        const { sut } = makeSut();
        const httpRequest = { params: { id: 'valid_id' } }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual(true);
    })
})