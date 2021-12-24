import { throwError } from "../../../../tests/mocks/test-helper"
import { AddArtifactParams } from "../../../domain/artifact/usecases/crud-artifact"
import { Artifact } from "../utils/artifact"
import { upgradeTiers } from "../utils/chances"
import { Sets, Stats, Types } from "../utils/enums"
import { AddArtifactDB } from "./add-artifact"
import { addArtifactRepoSpy } from "./mock-artifact-db"


const makeSut = () => {
    const addArtifactRepoStub = new addArtifactRepoSpy()
    const artifactUtil = new Artifact()
    const sut = new AddArtifactDB(addArtifactRepoStub, artifactUtil)
    return { sut, addArtifactRepoStub, artifactUtil }
}

const mockAddArtifactParams = (): AddArtifactParams => ({
    userid: 'any_userid',
    set: Sets.AP,
    type: Types.Flower,
    level: 20,
    mainstat: Stats.HPFlat,
    substats: [
        {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*10)/10},
        {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0])},
        {substat: Stats.CD, value: Math.round(upgradeTiers["CRIT DMG%"][0]*10)/10},
        {substat: Stats.CR, value: Math.round(upgradeTiers["CRIT Rate%"][0]*10)/10}
    ]
})

describe ('Add-Artifact-DB Usecase', () => {
    
    test('Should call AddArtifactRepo with correct values', async () => {
        const { sut, addArtifactRepoStub } = makeSut()
        const AddArtifactParams = mockAddArtifactParams()
        await sut.add(AddArtifactParams)
        expect(addArtifactRepoStub.params.userid).toEqual(AddArtifactParams.userid)
        expect(addArtifactRepoStub.params.set).toEqual(AddArtifactParams.set)
        expect(addArtifactRepoStub.params.type).toEqual(AddArtifactParams.type)
        expect(addArtifactRepoStub.params.level).toEqual(AddArtifactParams.level)
        expect(addArtifactRepoStub.params.mainstat).toEqual(AddArtifactParams.mainstat)
        expect(addArtifactRepoStub.params.substats).toEqual(AddArtifactParams.substats)
    })
    
    test('Should call AddArtifactRepo with correct values', async () => {
        const { sut, addArtifactRepoStub } = makeSut()
        const addArtifactRepoSpy = jest.spyOn(addArtifactRepoStub, 'add')
        await sut.add(mockAddArtifactParams())
        const artifactUtilMock = new Artifact()
        artifactUtilMock.import(mockAddArtifactParams())
        const repoData = await artifactUtilMock.createRepoData()
        repoData.dtAdded = expect.anything()
        repoData.dtModified = expect.anything()
        expect(addArtifactRepoSpy).toHaveBeenCalledWith(repoData)
    })
    
    test('Should call artifactUtil with correct values', async () => {
        const { sut, artifactUtil } = makeSut()
        const artifactUtilSpy = jest.spyOn(artifactUtil, 'import')
        await sut.add(mockAddArtifactParams())
        expect(artifactUtilSpy).toHaveBeenCalledWith(mockAddArtifactParams())
    })

    test('Should throw if AddArtifactRepo throws', async () => {
        const { sut, addArtifactRepoStub } = makeSut()
        jest.spyOn(addArtifactRepoStub, 'add').mockImplementationOnce(throwError)
        const promise = sut.add(mockAddArtifactParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should return true on success', async () => {
        const { sut } = makeSut()
        const isValid = await sut.add(mockAddArtifactParams())
        expect(isValid).toBe(true)
    })
})