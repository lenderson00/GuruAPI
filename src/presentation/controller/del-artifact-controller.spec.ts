import { throwError } from "../../../tests/mocks/test-helper"
import { DelArtifactRepo } from "../../data/artifact/protocols/del-artifact-repo"
import { DelArtifactResult } from "../../domain/artifact/usecases/crud-artifact"
import { InvalidParamError, MissingParamError, ServerError } from "../errors"
import { serverError } from "../helpers/http-helper"
import { DelArtifactController, Request } from "./del-artifact-controller"

const makeSut = () => {
    const delArtifactStub: DelArtifactRepo = {
        del: async () => {
            return new Promise((res) => res(true as DelArtifactResult))
        }
    }
   
    const sut = new DelArtifactController(delArtifactStub)
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

    test('Should call DelArtifactRepo with correct data', async () => {
        const { sut, delArtifactStub } = makeSut();
        const delArtifactSpy = jest.spyOn(delArtifactStub, 'del')
        const httpRequest: Request = { params: {id: 'any_id'} }
        await sut.handle(httpRequest);
        expect(delArtifactSpy).toHaveBeenCalledWith({ id: httpRequest.params.id });
    })

    test('Should return 400 if id is invalid', async () => {
        const { sut, delArtifactStub } = makeSut();
        jest.spyOn(delArtifactStub, 'del').mockReturnValueOnce(new Promise((resolve, reject) => resolve(false)))
        const httpRequest: Request = { params: {id: 'invalid_id'} }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.body).toEqual(new InvalidParamError('id'))
    })

    test('Should return 500 if DelArtifactRepo throws', async () => {
        const { sut, delArtifactStub } = makeSut();
        jest.spyOn(delArtifactStub, 'del').mockImplementationOnce(throwError)
        const httpRequest: Request = { params: {id: 'invalid_id'} }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return 200 if successful', async () => {
        const { sut } = makeSut();
        const httpRequest = { params: { id: 'valid_id' } }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual(true);
    })
})