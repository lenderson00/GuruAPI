import { DynamoHelper } from './src/infra/db/dynamodb/dynamo-helper'
import { AddArtifactRepoParams, GetArtifactRepoParams, UpdArtifactRepoParams } from './src/data/artifact/protocols'
import AWS, {} from 'aws-sdk'
import env from './src/main/config/env'
import { Sets, Stats, Types } from './src/data/artifact/utils/enums'
import { upgradeTiers } from './src/data/artifact/utils/chances'
import { ArtifactDynamo } from './src/infra/db/dynamodb/artifact/artifact-dynamo'
import _ from 'lodash/fp'

const makeSut = () => {
    return new ArtifactDynamo(dynamoHelper.getLocalDynamo())
}

const mockAddArtifactParams = (): AddArtifactRepoParams => ({
    userid: 'other_userid',
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
    dtAdded: (new Date).toISOString(),
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
    scoreDfltLvl20SD: 250
})

const dynamoHelper = new DynamoHelper()
const dynamo = dynamoHelper.getLocalDynamo()
const tableName = env.aws.dynamoLogErrorTableName
const artifactData: GetArtifactRepoParams = {
    keys: [
        { userid: 'any_userid', dtAdded: 'Mon, 20 Dec 2021 02:46:46 GMT' },
        { userid: 'any_userid', dtAdded: 'Mon, 20 Dec 2021 02:47:00 GMT' },
        { userid: 'any_userid', dtAdded: 'Mon, 20 Dec 2021 02:47:40 GMT' },
    ]
}

const fn = async () => {

    /* await dynamoHelper.deleteAllFromTable(env.aws.dynamoArtifactTableName) */
    let sut = makeSut()
    await sut.add(mockAddArtifactParams())
    sut = makeSut()
    await sut.add(mockAddArtifactParams())
    sut = makeSut()
    await sut.add(mockAddArtifactParams())

    /* const keys: KeyList = []
        artifactData.keys.map(key => keys.push(AWS.DynamoDB.Converter.marshall(key)))
        const reqItems: BatchGetRequestMap = {
            [tableName]: {
                Keys: keys
            }
        }
        const result = await dynamo.batchGetItem({
            RequestItems: reqItems
        }).promise()
        const adjResult = result.Responses?.[tableName].map(item => AWS.DynamoDB.Converter.unmarshall(item))
        console.log(adjResult) */

        /* const { userid, dtAdded, ...updateData } = mockUpdArtifactParams()
        if (_.isEmpty(updateData)) return true
        let update = 'SET '
        const attrValues: Record<string,any> = {}
        const attrNames: Record<string,any> = {}
        
        for (const prop in updateData) {
            if (Object.prototype.hasOwnProperty.call(updateData, prop)) {
                attrValues[`:${prop}`] = updateData[prop as keyof typeof updateData];
                attrNames[`#attr${prop}`] = `${prop}`;
                update = update + `#attr${prop} = :${prop}, `
            }
        }
        console.log(attrValues)
        console.log(update)
        console.log(attrNames)

        const result = await dynamo.updateItem({
            TableName: tableName,
            Key: AWS.DynamoDB.Converter.marshall({ userid: userid, dtAdded: dtAdded }),
            UpdateExpression: update.substring(0, update.length - 2),
            ExpressionAttributeValues: AWS.DynamoDB.Converter.marshall(attrValues),
            ExpressionAttributeNames: attrNames
        }).promise()
        console.log(result) */

        /* const data = await dynamo.scan({ TableName: env.aws.dynamoLogErrorTableName }).promise() */
        /* const keys = data.Items.map(item => Object.assign({}, item.userid, item.dtAdded)) */
        /* data.Items.forEach(x => console.log(AWS.DynamoDB.Converter.unmarshall(x))) */
        /* const data = await dynamo.scan({ TableName: env.aws.dynamoArtifactTableName }).promise()
        console.log(data) */
        /* await dynamoHelper.deleteAllFromTable(env.aws.dynamoLogErrorTableName) */

        /* dynamoHelper.createLogErrorTable() */
        /* dynamo.deleteTable({TableName: env.aws.dynamoArtifactTableName}) */
        
        /* data = await dynamo.scan({ TableName: env.aws.dynamoLogErrorTableName }).promise()
        console.log(data.Count) */

        /* await dynamo.deleteItem({
            TableName: env.aws.dynamoLogErrorTableName,
            Key: { date: { S: '2021-12-22T03:41:42.785Z' } }
        }).promise()

        
        data = await dynamo.scan({ TableName: env.aws.dynamoLogErrorTableName }).promise()
        console.log(data.Count) */

        /* const data = await dynamo.describeTable({ TableName: env.aws.dynamoArtifactTableName }).promise()
        console.log(data) */
        /* console.log(data.Table.AttributeDefinitions) */
}

fn()