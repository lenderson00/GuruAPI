import { ValidationSpy } from "../../../tests/mocks/mock-validation";
import { throwError } from "../../../tests/mocks/test-helper";
import { upgradeTiers } from "../../data/artifact/utils/chances";
import { Sets, Stats, Types } from "../../data/artifact/utils/enums";
import { AddArtifact, AddArtifactResult } from "../../domain/artifact/usecases/crud-artifact";
import { MissingParamError, ServerError } from "../errors";
import { serverError } from "../helpers";
import { AddArtifactController, Request } from "./add-artifact-controller"

const makeSut = () => {
    const addArtifactStub: AddArtifact = {
        add: async () => {
            return new Promise((res) => res(true as AddArtifactResult))
        }
    }
    const validationStub = new ValidationSpy()
    const sut = new AddArtifactController(addArtifactStub, validationStub)
    return { sut, addArtifactStub, validationStub }
}

const makeFakeRequest = (): Request => ({
    set: Sets.AP,
    type: Types.Flower,
    level: 20,
    mainstat: Stats.HPFlat,
    substats: [
        {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*2*10)/10},
        {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]*3)},
        {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10},
        {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0]*2)},
    ]
})

describe ('Add Artifact Controller', () => {

    test('Should call AddArtifactDB with correct data', async () => {
        const { sut, addArtifactStub } = makeSut();
        const addArtifactSpy = jest.spyOn(addArtifactStub, 'add')
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);
        expect(addArtifactSpy).toHaveBeenCalledWith(httpRequest);
    })

    test('Should call Validation with correct data', async () => {
        const { sut, validationStub } = makeSut();
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);
        expect(validateSpy).toHaveBeenCalledWith(httpRequest);
    })

    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse.statusCode).toBe(400);
    })    

    test('Should return 500 if AddArtifact throws', async () => {
        const { sut, addArtifactStub } = makeSut();
        jest.spyOn(addArtifactStub, 'add').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body).toEqual(true);
    })
})