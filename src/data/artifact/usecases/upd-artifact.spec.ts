import { ValidationSpy } from "../../../../tests/mocks/mock-validation"
import { UpdArtifactParams } from "../../../domain/artifact/usecases/crud-artifact"
import { upgradeTiers } from "../utils/chances"
import { Sets, Types, Stats } from "../utils/enums"
import { getArtifactRepoSpy, updArtifactRepoSpy } from "./mock-artifact-db"
import { UpdArtifactDB } from "./upd-artifact"

const makeSut = () => {
    const updArtifactRepoStub = new updArtifactRepoSpy()
    const getArtifactRepoStub = new getArtifactRepoSpy()
    /* const validationStub = new ValidationSpy() */
    const sut = new UpdArtifactDB(updArtifactRepoStub, getArtifactRepoStub)
    return { sut, updArtifactRepoStub, getArtifactRepoStub }
}

const mockUpdArtifactParams = (): UpdArtifactParams => ({
    id: '123456789012345678901234',
    set: Sets.AP,
    type: Types.Flower,
    level: 20,
    mainstat: Stats.HPFlat,
    substats: [
        {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
        {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
        {substat: Stats.CD, value: upgradeTiers["CRIT DMG%"][0]},
        {substat: Stats.CR, value: upgradeTiers["CRIT Rate%"][0]}
    ]
})

describe ('Upd-Artifact-DB Usecase', () => {
    test('Should call GetArtifactRepo with correct values', async () => {
        const { sut, getArtifactRepoStub } = makeSut()
        const gelArtifactSpy = jest.spyOn(getArtifactRepoStub, 'get')
        await sut.update(mockUpdArtifactParams())
        expect(gelArtifactSpy).toHaveBeenCalledWith({ ids: ['123456789012345678901234'] })

    })
})