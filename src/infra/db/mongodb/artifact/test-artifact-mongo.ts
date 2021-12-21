import { Collection, ObjectId } from "mongodb";
import { ArtifactMongo } from "./artifact-mongo";
import { MongoHelper } from "../mongo-helper";
import env from "../../../../main/config/env"
import { Sets, Stats, Types } from "../../../../data/artifact/utils/enums";
import { upgradeTiers } from "../../../../data/artifact/utils/chances";
import { AddArtifactRepoParams } from "../../../../data/artifact/protocols/add-artifact-repo";
import { UpdArtifactRepoParams } from "../../../../data/artifact/protocols";

const makeSut = () : ArtifactMongo => {
    return new ArtifactMongo()
}

const mockAddArtifactParams = (): AddArtifactRepoParams => ({
    set: Sets.AP,
    type: Types.Flower,
    level: 0,
    mainstat: Stats.HPFlat,
    mainstatValue: 717,
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

const mockUpdArtifactParams = (): UpdArtifactRepoParams => ({
    userid: 'valid_userid',
    dtAdded: 'valid_date',
    level: 20,
    mainstatValue: 4780,
    substats: [
        {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
        {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
        {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
        {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]},
    ],
    dtModified: (new Date).toUTCString(),
    scoreDflt: 1000,
    scoreDfltMainstat: 500,
    scoreDfltSubstats: 500,
    scoreDfltLvl20Min: 1000,
    scoreDfltLvl20Avg: 1000,
    scoreDfltLvl20Max: 1000,
    scoreDfltLvl20SD: 0
    })

let artifactCollection: Collection

describe('Artifact-Mongo', () => {
    beforeAll(async () => {
        await MongoHelper.connect(env.mongoURL)
        artifactCollection = MongoHelper.getCollection('artifacts')
    })
    
    afterAll(async () => {
        /* await artifactCollection.deleteMany({}) */
        await MongoHelper.disconnect()
    })

    describe('add()', () => {
        test('Should return true on success', async () => {
            const sut = makeSut()
            const addArtifactParams = mockAddArtifactParams()
            const isValid = await sut.add(addArtifactParams)
            expect(isValid).toBe(true)
        })
    })

    describe('del()', () => {
        beforeAll(async () => {
            await artifactCollection.deleteMany({})
            const fakeArtifact = mockAddArtifactParams()
            const insertedArtifact = { _id: new ObjectId('123456789012345678901234'), ... fakeArtifact }
            await artifactCollection.insertOne(insertedArtifact)
        })
        
        test('Should return true on success', async () => {
            const sut = makeSut()
            const id = '123456789012345678901234'
            const isValid = await sut.del(id)
            expect(isValid).toBe(true)
        })
        
        test('Should return false on fail', async () => {
            const sut = makeSut()
            const id = '012345678901234567890123'
            const isValid = await sut.del(id)
            expect(isValid).toBe(false)
        })
    })


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


    describe('update()', () => {
        beforeAll(async () => {
            await artifactCollection.deleteMany({})
            const fakeArtifact = mockAddArtifactParams()
            const insertedArtifact = { _id: new ObjectId('123456789012345678901234'), ... fakeArtifact }
            await artifactCollection.insertOne(insertedArtifact)
        })

        afterAll(async () => {
            await artifactCollection.deleteMany({})
        })

        test('Should return false if update fails', async () => {
            const sut = makeSut()
            const params = mockUpdArtifactParams()
            params.id = '012345678901234567890123'
            const result = await sut.update(params)
            expect(result).toBe(false)
        })

        test('Should return true if update was successful', async () => {
            const sut = makeSut()
            const result = await sut.update(mockUpdArtifactParams())
            expect(result).toBe(true)
        })    
    })
})