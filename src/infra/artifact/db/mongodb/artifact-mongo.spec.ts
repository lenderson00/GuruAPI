import { Collection, ObjectId } from "mongodb";
import { ArtifactMongo } from "./artifact-mongo";
import { MongoHelper } from "./mongo-helper";
import env from "../../../../main/config/env"
import { Sets, Stats, Types } from "../../../../data/artifact/utils/enums";
import { upgradeTiers } from "../../../../data/artifact/utils/chances";
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
    scoreDfltMainstat: 0,
    scoreDfltSubstats: 0,
    scoreDfltLvl20Min: 0,
    scoreDfltLvl20Avg: 0,
    scoreDfltLvl20Max: 0,
    scoreDfltLvl20SD: 0,
    dtAdded: "any_date",
    dtModified: "any_date",
})

let artifactCollection: Collection

describe('Artifact-Mongo', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.mongoUrl)
        artifactCollection = MongoHelper.getCollection('artifacts')
    })
    
    afterAll(async () => {
        /* await artifactCollection.deleteMany({}) */
        await MongoHelper.disconnect()
    })

    /* beforeEach(async () => {
        artifactCollection = MongoHelper.getCollection('artifacts')
        await artifactCollection.deleteMany({})
    }) */

    describe('add()', () => {
        test('Should return true on success', async () => {
            const sut = makeSut()
            const addArtifactParams = mockAddArtifactParams()
            const isValid = await sut.add(addArtifactParams)
            expect(isValid).toBe(true)
        })
    })

    /* describe('del()', () => {
        test('Should return true on success', async () => {
            const sut = makeSut()
            const id = 'valid_id'
            const isValid = await sut.del(id)
            expect(isValid).toBe(true)
        })
    }) */

    describe('get()', () => {
        beforeAll(async () => {
            await artifactCollection.deleteMany({})
            const fakeArtifact = mockAddArtifactParams()
            const insertedArtifact = { _id: new ObjectId('123456789012345678901234'), ... fakeArtifact }
            await artifactCollection.insertOne(insertedArtifact)
        })

        afterAll(async () => {
            await artifactCollection.deleteMany({})
        })

        test('Should read an artifact document by id', async () => {
            const sut = makeSut()
            const result = await sut.get({ ids: ['123456789012345678901234'] })
            expect(result.length).toBe(1)
        })        

        test('Should return empty array if id was not found', async () => {
            const sut = makeSut()
            const result = await sut.get({ ids: ['012345678901234567890123'] }) // invalid ID
            expect(result).toEqual([])
        })
    })
})
3-3