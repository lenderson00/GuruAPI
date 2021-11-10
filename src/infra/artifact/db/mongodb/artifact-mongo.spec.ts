import { Collection } from "mongodb";
import { ArtifactMongo } from "./artifact-mongo";
import { MongoHelper } from "./mongo-helper";
import env from "../../../../main/config/env"
import { AddArtifactParams } from "../../../../domain/artifact/usecases/add-artifact";
import { Sets, Stats, Types } from "../../../../data/artifact/enums";
import { upgradeTiers } from "../../../../data/artifact/chances";

const makeSut = () : ArtifactMongo => {
    return new ArtifactMongo()
}

const mockAddArtifactParams = (): AddArtifactParams => ({
    set: Sets.AP,
    type: Types.Flower,
    level: 20,
    mainstat: Stats.HPFlat,
    substats: [
        {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
        {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
        {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
        {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]},
    ]
})

let artifactCollection: Collection

describe('Artifact-Mongo', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.mongoUrl)
      })
    
    afterAll(async () => {
        await MongoHelper.disconnect()
      })

    beforeEach(async () => {
        artifactCollection = MongoHelper.getCollection('artifacts')
        await artifactCollection.deleteMany({})
    })

    describe('add()', () => {
        test('Should return true on success', async () => {
            jest.setTimeout(20000);
            const sut = makeSut()
            const addArtifactParams = mockAddArtifactParams()
            const isValid = await sut.add(addArtifactParams)
            expect(isValid).toBe(true)
        })
      })
})