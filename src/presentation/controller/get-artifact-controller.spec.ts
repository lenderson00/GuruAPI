import { throwError } from "../../../tests/mocks/test-helper"
import { GetArtifact, GetArtifactResult } from "../../domain/artifact/usecases/crud-artifact"
import { InvalidParamError, MissingParamError, ServerError } from "../errors"
import { serverError } from "../helpers/http-helper"
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

describe ('Get Artifact Controller', () => {

    test('Should return 400 if no id is provided', async () => {
        const { sut } = makeSut();
        const httpRequest: Request = {}
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('id'));
    })

    test('Should call GetArtifact with correct data', async () => {
        const { sut, getArtifactStub } = makeSut();
        const delArtifactSpy = jest.spyOn(getArtifactStub, 'get')
        const httpRequest: Request = { id: 'any_id'}
        await sut.handle(httpRequest);
        expect(delArtifactSpy).toHaveBeenCalledWith({ id: httpRequest.id });
    })

    test('Should return 400 if id is invalid', async () => {
        const { sut, getArtifactStub } = makeSut();
        jest.spyOn(getArtifactStub, 'get').mockReturnValueOnce(new Promise((resolve) => resolve(false)))
        const httpRequest: Request = { id: 'invalid_id' }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.body).toEqual(new InvalidParamError('id'))
    })

    test('Should return 500 if GetArtifact throws', async () => {
        const { sut, getArtifactStub } = makeSut();
        jest.spyOn(getArtifactStub, 'get').mockImplementationOnce(throwError)
        const httpRequest: Request = { id: 'invalid_id' }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })
})