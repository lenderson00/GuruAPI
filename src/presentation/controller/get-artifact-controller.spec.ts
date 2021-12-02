import { ValidationSpy } from "../../../tests/mocks/mock-validation"
import { throwError } from "../../../tests/mocks/test-helper"
import { upgradeTiers } from "../../data/artifact/utils/chances"
import { Sets, Stats, Types } from "../../data/artifact/utils/enums"
import { GetArtifact, GetArtifactResults, GetFullArtifactResult } from "../../domain/artifact/usecases/crud-artifact"
import { InvalidParamError, ServerError } from "../errors"
import { serverError } from "../helpers/http-helper"
import { GetArtifactController, Request } from "./get-artifact-controller"

const makeSut = () => {
    const getArtifactStub: GetArtifact = {
        get: async () => {
            return new Promise((res) => res({found: [], notFound: []} as GetArtifactResults))
        },
        getFull: async () => {
            return new Promise((res) => res({found: [], notFound: []} as GetFullArtifactResult))
        }
    }
    const validationStub = new ValidationSpy()
    const sut = new GetArtifactController(getArtifactStub, validationStub)
    return { sut, getArtifactStub, validationStub }
}

describe ('Get Artifact Controller', () => {

    test('Should call Validation with correct data', async () => {
        const { sut, validationStub } = makeSut();
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest: Request = { ids: ['any_id']}
        await sut.handle(httpRequest);
        expect(validateSpy).toHaveBeenCalledWith(httpRequest);
    })
    
    test('Should call GetArtifact with correct data', async () => {
        const { sut, getArtifactStub } = makeSut();
        const getArtifactSpy = jest.spyOn(getArtifactStub, 'get')
        const httpRequest: Request = { ids: ['any_id']}
        await sut.handle(httpRequest);
        expect(getArtifactSpy).toHaveBeenCalledWith({ ids: httpRequest.ids });
    })

    test('Should return 400 if id is invalid', async () => {
        const { sut, getArtifactStub } = makeSut();
        jest.spyOn(getArtifactStub, 'get').mockReturnValueOnce(new Promise(resolve => resolve({found: [], notFound: ['invalid_id']})))
        const httpRequest: Request = { ids: ['invalid_id'] }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('ids'))
    })

    test('Should return 500 if GetArtifact throws', async () => {
        const { sut, getArtifactStub } = makeSut();
        jest.spyOn(getArtifactStub, 'get').mockImplementationOnce(throwError)
        const httpRequest: Request = { ids: ['invalid_id'] }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return 200 if successful', async () => {
        const { sut, getArtifactStub } = makeSut();
        const getResponse: GetArtifactResults = {
            found: [{
                id: 'valid_id',
                set: Sets.AP,
                type: Types.Flower,
                level: 20,
                mainstat: Stats.ATKFlat,
                mainstatValue: 311,
                substats: [{substat: Stats.CD, value: Math.round(upgradeTiers[Stats.CD][3]*10)/10}],
                scoreDflt: 200
            }],
            notFound: []
        }
        jest.spyOn(getArtifactStub, 'get').mockImplementationOnce(async () => new Promise((res) => res(getResponse)))
        const httpRequest = { ids: ['valid_id'] }
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual(getResponse);
    })
})