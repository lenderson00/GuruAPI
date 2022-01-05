import { ValidationSpy } from "@/tests/mocks/mock-validation"
import { throwError } from "@/tests/mocks/test-helper"
import { DelArtifactRepo } from "@/data/artifact/protocols/del-artifact-repo"
import { DelArtifactResult } from "@/domain/artifact/usecases/crud-artifact"
import { InvalidParamError, ServerError } from "@/presentation/errors"
import { serverError } from "@/presentation/helpers/http-helper"
import { DelArtifactController } from "@/presentation/controller/del-artifact-controller"

const makeSut = () => {
    const delArtifactStub: DelArtifactRepo = {
        del: async () => {
            return new Promise((res) => res(true as DelArtifactResult))
        }
    }
    const validationStub = new ValidationSpy()
    const sut = new DelArtifactController(delArtifactStub, validationStub)
    return { sut, delArtifactStub, validationStub }
}

describe ('Delete Artifact Controller', () => {

    test('Should call Validation with correct data', async () => {
        const { sut, validationStub } = makeSut();
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest: DelArtifactController.Request = { userid: 'any_id', dtAdded: 'any_date'}
        await sut.handle(httpRequest);
        expect(validateSpy).toHaveBeenCalledWith(httpRequest);
    })

    test('Should call DelArtifactRepo with correct data', async () => {
        const { sut, delArtifactStub } = makeSut();
        const delArtifactSpy = jest.spyOn(delArtifactStub, 'del')
        const httpRequest: DelArtifactController.Request = { userid: 'any_id', dtAdded: 'any_date'}
        await sut.handle(httpRequest);
        expect(delArtifactSpy).toHaveBeenCalledWith({ userid: httpRequest.userid, dtAdded: httpRequest.dtAdded });
    })

    test('Should return 400 if id is invalid', async () => {
        const { sut, delArtifactStub } = makeSut();
        jest.spyOn(delArtifactStub, 'del').mockReturnValueOnce(new Promise((resolve) => resolve(false)))
        const httpRequest: DelArtifactController.Request = { userid: 'invalid_id', dtAdded: 'any_date' }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.body).toEqual(new InvalidParamError('id'))
    })

    test('Should return 500 if DelArtifactRepo throws', async () => {
        const { sut, delArtifactStub } = makeSut();
        jest.spyOn(delArtifactStub, 'del').mockImplementationOnce(throwError)
        const httpRequest: DelArtifactController.Request = { userid: 'invalid_id', dtAdded: 'any_date' }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return 200 if successful', async () => {
        const { sut } = makeSut();
        const httpRequest = { userid: 'valid_id', dtAdded: 'valid_date' }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual(true);
    })
})