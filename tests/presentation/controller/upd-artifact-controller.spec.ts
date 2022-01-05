/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ValidationSpy } from "@/tests/mocks/mock-validation"
import { throwError } from "@/tests/mocks/test-helper"
import { upgradeTiers } from "@/data/artifact/utils/chances"
import { Stats } from "@/data/artifact/utils/enums"
import { UpdArtifact, UpdArtifactResult } from "@/domain/artifact/usecases/crud-artifact"
import { InvalidParamError, MissingParamError, ServerError } from "@/presentation/errors"
import { badRequest, serverError } from "@/presentation/helpers"
import { UpdArtifactController } from "@/presentation/controller/upd-artifact-controller"

const makeSut = () => {
    const updArtifactStub: UpdArtifact = {
        update: async () => {
            return new Promise((res) => res(true as UpdArtifactResult))
        }
    }
    const validationStub = new ValidationSpy()
    const sut = new UpdArtifactController(updArtifactStub, validationStub)
    return { sut, updArtifactStub, validationStub }
}

const makeFakeRequest = (): UpdArtifactController.Request => ({
    userid: 'valid_userid',
    dtAdded: 'valid_date',
    level: 20,
    substats: [
        {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*2*10)/10},
        {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]*3)},
        {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10},
        {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0]*2)},
    ]
})

describe ('Upd Artifact Controller', () => {
    test('Should call Validation with correct data', async () => {
        const { sut, validationStub } = makeSut();
        const validationSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);
        expect(validationSpy).toHaveBeenCalledWith(httpRequest);
    })

    test('Should call UpdArtifactDB with correct data', async () => {
        const { sut, updArtifactStub } = makeSut();
        const updArtifactSpy = jest.spyOn(updArtifactStub, 'update')
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);
        expect(updArtifactSpy).toHaveBeenCalledWith(httpRequest);
    })

    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
    })    

    test('Should return 400 if UpdArtifactDB returns an error', async () => {
        const { sut, updArtifactStub } = makeSut();
        jest.spyOn(updArtifactStub, 'update').mockReturnValueOnce(new Promise(resolve => resolve(new InvalidParamError('level'))))
        const HttpResponse = await sut.handle(makeFakeRequest());
        expect(HttpResponse).toEqual(badRequest(new InvalidParamError('level')));
    })

    test('Should return 500 if UpdArtifact throws', async () => {
        const { sut, updArtifactStub } = makeSut();
        jest.spyOn(updArtifactStub, 'update').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })

    test('Should return 200 if UpdArtifact returns true', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle(makeFakeRequest());
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toBe(true)
    })
})