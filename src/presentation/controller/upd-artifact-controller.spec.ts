import { upgradeTiers } from "../../data/artifact/utils/chances"
import { Sets, Types, Stats } from "../../data/artifact/utils/enums"
import { UpdArtifact, UpdArtifactResult } from "../../domain/artifact/usecases/crud-artifact"
import { MissingParamError } from "../errors"
import { badRequest } from "../helpers"
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

    test('Should call UpdArtifactDB with correct data', async () => {
        const { sut, updArtifactStub } = makeSut();
        const updArtifactSpy = jest.spyOn(updArtifactStub, 'update')
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);
        expect(updArtifactSpy).toHaveBeenCalledWith(httpRequest);
    })
})