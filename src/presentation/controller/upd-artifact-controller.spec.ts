import {  } from "fs"
import { ValidationSpy } from "../../../tests/mocks/mock-validation"
import { upgradeTiers } from "../../data/artifact/utils/chances"
import { Sets, Types, Stats } from "../../data/artifact/utils/enums"
import { GetArtifact, GetArtifactResult, GetArtifactResults, GetFullArtifactResult, UpdArtifact, UpdArtifactResult } from "../../domain/artifact/usecases/crud-artifact"
import { UpdArtifactController, Request } from "./upd-artifact-controller"

const makeSut = () => {
    const updArtifactStub: UpdArtifact = {
        update: async () => {
            return new Promise((res) => res(true as UpdArtifactResult))
        }
    }
    const getArtifactStub: GetArtifact = {
        get: async () => {
            return new Promise((res) => res({
                found: [{
                    id: '123456789012345678901234',
                    set: Sets.AP,
                    type: Types.Flower,
                    level: 0,
                    mainstat: Stats.HPFlat,
                    mainstatValue: 4780,
                    substats: [
                        {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*10)/10},
                        {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0])},
                        {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10}
                    ],
                    scoreDflt: 200
                }],
                notFound: []
            } as GetArtifactResults))
        },
        getFull: async () => {
            return new Promise(res => res({found: [], notFound: []} as GetFullArtifactResult))
        }
    }
    const validationStub = new ValidationSpy()
    const sut = new UpdArtifactController(updArtifactStub, getArtifactStub, validationStub)
    return { sut, updArtifactStub, getArtifactStub, validationStub }
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

describe ('Add Artifact Controller', () => {
    test('Should call UpdArtifactDB with correct data', async () => {
        const { sut, updArtifactStub } = makeSut();
        const updArtifactSpy = jest.spyOn(updArtifactStub, 'update')
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);
        expect(updArtifactSpy).toHaveBeenCalledWith(httpRequest);
    })

    test('Should call GetArtifact with correct data', async () => {
        const { sut, getArtifactStub } = makeSut();
        const getArtifactSpy = jest.spyOn(getArtifactStub, 'get')
        const httpRequest: Request = makeFakeRequest()
        await sut.handle(httpRequest);
        expect(getArtifactSpy).toHaveBeenCalledWith({ ids: [httpRequest.id] });
    })

    test('Should call Validation with correct data', async () => {
        const { sut, validationStub } = makeSut();
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);
        expect(validateSpy).toHaveBeenCalledWith(httpRequest);
    })
})