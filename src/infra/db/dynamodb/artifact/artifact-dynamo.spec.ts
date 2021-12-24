import { ArtifactDynamo } from "./artifact-dynamo";
import { Sets, Stats, Types } from "../../../../data/artifact/utils/enums";
import { upgradeTiers } from "../../../../data/artifact/utils/chances";
import { AddArtifactRepoParams } from "../../../../data/artifact/protocols/add-artifact-repo";
import { UpdArtifactRepoParams } from "../../../../data/artifact/protocols";
import { DynamoHelper } from "../dynamo-helper";
import env from "../../../../main/config/env";
import AWS from "aws-sdk";

const makeSut = () : ArtifactDynamo => {
    return new ArtifactDynamo(dynamoHelper.getLocalDynamo())
}

const mockAddArtifactParams = (): AddArtifactRepoParams => ({
    userid: 'valid_userid',
    dtAdded: "valid_date",
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
    dtModified: (new Date).toISOString(),
    scoreDflt: 1000,
    scoreDfltMainstat: 500,
    scoreDfltSubstats: 500,
    scoreDfltLvl20Min: 1000,
    scoreDfltLvl20Avg: 1000,
    scoreDfltLvl20Max: 1000,
    scoreDfltLvl20SD: 0
})

const dynamoHelper = new DynamoHelper()
const dynamo = dynamoHelper.getLocalDynamo()

describe('Artifact-Dynamo', () => {
    beforeAll(async () => {
        await dynamoHelper.deleteAllFromTable(env.aws.dynamoArtifactTableName)
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
            await dynamo.putItem({
                TableName: env.aws.dynamoArtifactTableName,
                Item: AWS.DynamoDB.Converter.marshall(mockAddArtifactParams()),
            }).promise()
        })
        
        test('Should return true on success', async () => {
            const sut = makeSut()
            const isValid = await sut.del({ userid: 'valid_userid', dtAdded: 'valid_date' })
            expect(isValid).toBe(true)
        })
        
        test('Should return false on fail', async () => {
            const sut = makeSut()
            const isValid = await sut.del({ userid: 'invalid_userid', dtAdded: 'invalid_date' })
            expect(isValid).toBe(false)
        })
    })


    describe('get()', () => {
        beforeAll(async () => {
            await dynamoHelper.deleteAllFromTable(env.aws.dynamoArtifactTableName)
            await dynamo.putItem({
                TableName: env.aws.dynamoArtifactTableName,
                Item: AWS.DynamoDB.Converter.marshall(mockAddArtifactParams()),
            }).promise()
        })

        test('Should read an artifact document by key', async () => {
            const sut = makeSut()
            const result = await sut.get({ keys: [
                { userid: 'valid_userid', dtAdded: 'valid_date' }
            ]})
            expect(result.length).toBe(1)
        })        

        test('Should return empty array if id was not found', async () => {
            const sut = makeSut()
            const result = await sut.get({ keys: [{ userid: 'valid_id', dtAdded: 'invalid_date' }] }) // invalid ID
            expect(result).toEqual([])
        })
    })


    describe('update()', () => {
        beforeAll(async () => {
            await dynamoHelper.deleteAllFromTable(env.aws.dynamoArtifactTableName)
            await dynamo.putItem({
                TableName: env.aws.dynamoArtifactTableName,
                Item: AWS.DynamoDB.Converter.marshall(mockAddArtifactParams()),
            }).promise()
        })/* 

        afterAll(async () => {
            await dynamoHelper.deleteAllFromTable(env.aws.dynamoArtifactTableName)
        }) */

        test('Should return true if update was successful', async () => {
            const sut = makeSut()
            const result = await sut.update(mockUpdArtifactParams())
            expect(result).toBe(true)
        })    
    })
})