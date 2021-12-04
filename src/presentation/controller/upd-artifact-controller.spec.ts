/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { throwError } from "../../../tests/mocks/test-helper"
import { upgradeTiers } from "../../data/artifact/utils/chances"
import { Sets, Types, Stats } from "../../data/artifact/utils/enums"
import { UpdArtifact, UpdArtifactResult } from "../../domain/artifact/usecases/crud-artifact"
import { InvalidParamError, MissingParamError, ServerError } from "../errors"
import { badRequest, serverError } from "../helpers"
import { UpdArtifactController, Request } from "./upd-artifact-controller"

const makeSut = () => {
    const updArtifactStub: UpdArtifact = {
        update: async () => {
            return new Promise((res) => res(true as UpdArtifactResult))
        }
    }
    const sut = new UpdArtifactController(updArtifactStub)
    return { sut, updArtifactStub }
}

const makeFakeRequest = (): Request => ({
    id: '123456789012345678901234',
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

describe ('Upd Artifact Controller', () => {
    test('Should return 400 if no id is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        delete httpRequest.id
        const HttpResponse = await sut.handle(httpRequest);
        expect(HttpResponse).toEqual(badRequest(new MissingParamError('id')));
    })

    test('Should return 400 if set is provided but invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        httpRequest.set = 'invalid_set'
        const HttpResponse = await sut.handle(httpRequest);
        expect(HttpResponse).toEqual(badRequest(new InvalidParamError('set')));
    })

    test('Should return 400 if type is provided but invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        httpRequest.type = 'invalid_type'
        const HttpResponse = await sut.handle(httpRequest);
        expect(HttpResponse).toEqual(badRequest(new InvalidParamError('type')));
    })

    test('Should return 400 if level is provided but invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        httpRequest.level = 999
        const HttpResponse = await sut.handle(httpRequest);
        expect(HttpResponse).toEqual(badRequest(new InvalidParamError('level')));
    })

    test('Should return 400 if mainstat is provided but invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        httpRequest.mainstat = 'invalid_mainstat'
        const HttpResponse = await sut.handle(httpRequest);
        expect(HttpResponse).toEqual(badRequest(new InvalidParamError('mainstat')));
    })

    test('Should return 400 if substat is provided but invalid', async () => {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        httpRequest.substats![1].substat = 'invalid_substat'
        const HttpResponse = await sut.handle(httpRequest);
        expect(HttpResponse).toEqual(badRequest(new InvalidParamError('substat')));
    })

    test('Should call UpdArtifactDB with correct data', async () => {
        const { sut, updArtifactStub } = makeSut();
        const updArtifactSpy = jest.spyOn(updArtifactStub, 'update')
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);
        expect(updArtifactSpy).toHaveBeenCalledWith(httpRequest);
    })

    test('Should return 400 if UpdArtifactDB returns an error', async () => {
        const { sut, updArtifactStub } = makeSut();
        jest.spyOn(updArtifactStub, 'update').mockReturnValueOnce(new Promise(resolve => resolve(new InvalidParamError('mainstat'))))
        const httpRequest = makeFakeRequest();
        const HttpResponse = await sut.handle(httpRequest);
        expect(HttpResponse).toEqual(badRequest(new InvalidParamError('mainstat')));
    })

    test('Should return 500 if UpdArtifact throws', async () => {
        const { sut, updArtifactStub } = makeSut();
        jest.spyOn(updArtifactStub, 'update').mockImplementationOnce(throwError)
        const httpRequest: Request = makeFakeRequest()
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(serverError(new ServerError()))
    })
})