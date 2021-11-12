import { Collection } from "mongodb";
import { ArtifactMongo } from "./artifact-mongo";
import { MongoHelper } from "./mongo-helper";
import env from "../../../../main/config/env"
import { Sets, Stats, Types } from "../../../../data/artifact/enums";
import { upgradeTiers } from "../../../../data/artifact/chances";
import { AddArtifactRepoParams } from "../../../../data/artifact/protocols/add-artifact-repo";

const makeSut = () : ArtifactMongo => {
    return new ArtifactMongo()
}

const mockAddArtifactParams = (): AddArtifactRepoParams => ({
    set: Sets.AP,
    type: Types.Flower,
    level: 20,
    mainstat: Stats.HPFlat,
    mainstatValue: 4780,
    substats: [
        {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
        {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
        {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
        {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]},
    ],
    scoreDflt: 0,
    scoreMainstatDflt: 0,
    scoreSubstatsDflt: 0,
    scoreLvl20Min: 0,
    scoreLvl20Avg: 0,
    scoreLvl20Max: 0,
    scoreLvl20SD: 0,
    dtAdded: "any_date",
    dtModified: "any_date",
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