import { AddArtifactParams } from "../../../domain/artifact/usecases/add-artifact"
import { upgradeTiers } from "../chances"
import { MainStats, Sets, Stats, SubStats, Types } from "../enums"
import { AddArtifactDB } from "./add-artifact"
import { addArtifactRepoSpy } from "./mock-artifact-db"


const makeSut = () => {
    const addArtifactRepoStub = new addArtifactRepoSpy()
    const sut = new AddArtifactDB(addArtifactRepoStub)
    return { sut, addArtifactRepoStub }
}

const mockAddAccountParams = (): AddArtifactParams => ({
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

describe ('Add-Artifact-DB Usecase', () => {
    
    test('Should call AddArtifactRepo with correct values', async () => {
        const { sut, addArtifactRepoStub } = makeSut()
        const AddArtifactParams = mockAddAccountParams()
        await sut.add(AddArtifactParams)
        expect(addArtifactRepoStub.params.set).toEqual(AddArtifactParams.set)
        expect(addArtifactRepoStub.params.type).toEqual(AddArtifactParams.type)
        expect(addArtifactRepoStub.params.level).toEqual(AddArtifactParams.level)
        expect(addArtifactRepoStub.params.mainstat).toEqual(AddArtifactParams.mainstat)
        expect(addArtifactRepoStub.params.substats).toEqual(AddArtifactParams.substats)
    })
})