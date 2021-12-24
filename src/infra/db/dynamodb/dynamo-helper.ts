import AWS from "aws-sdk"
import { TableName } from "aws-sdk/clients/dynamodb"
import env from "../../../main/config/env"

export class DynamoHelper {
    private readonly dynamo: AWS.DynamoDB

    constructor() {
        this.dynamo = new AWS.DynamoDB({
            apiVersion: env.aws.dynamoAPIVersion,
            /* endpoint: env.aws.dynamoEndpoint, */
            region: env.aws.region,
            credentials: {
                accessKeyId: env.aws.accessKeyId,
                secretAccessKey: env.aws.secretAccessKey,
            }
        })
    }

    getLocalDynamo(): AWS.DynamoDB {
        return this.dynamo
    }

    async createArtifactTable(): Promise<void> {
        await this.dynamo.createTable({
            AttributeDefinitions: [
                { AttributeName: 'userid', AttributeType: 'S' },
                { AttributeName: 'dtAdded', AttributeType: 'S' }
            ],
            TableName: env.aws.dynamoArtifactTableName,
            KeySchema: [
                { AttributeName: 'userid', KeyType: 'HASH' },
                { AttributeName: 'dtAdded', KeyType: 'RANGE' }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        })
        .promise()
    }

    async createLogErrorTable(): Promise<void> {
        await this.dynamo.createTable({
            AttributeDefinitions: [
                { AttributeName: 'date', AttributeType: 'S' }
            ],
            TableName: env.aws.dynamoLogErrorTableName,
            KeySchema: [
                { AttributeName: 'date', KeyType: 'HASH' }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        })
        .promise()
    }

    async deleteAllFromTable(tableName: TableName): Promise<void> {
        const keys = (await this.dynamo.describeTable({TableName: tableName}).promise()).Table?.KeySchema
        const result = await this.dynamo.scan({TableName: tableName}).promise()
        result.Items?.forEach( async item => {
            const tableKeys: Record<string,unknown> = {}
            const adjItem = AWS.DynamoDB.Converter.unmarshall(item)
            keys?.forEach(key => tableKeys[key.AttributeName] = adjItem[key.AttributeName])

            await this.dynamo.deleteItem({
                TableName: tableName,
                Key: AWS.DynamoDB.Converter.marshall(tableKeys)
            }).promise()
        })
    }
}

/* const item = AWS.DynamoDB.Converter.marshall({
    id: '9n9u0m1x879',
    set: Sets.AP,
    type: Types.Flower,
    level: 5,
    mainstat: Stats.HPFlat,
    mainstatValue: 2910,
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
    dtAdded: (new Date).toUTCString(),
    dtModified: (new Date).toUTCString()
})

const params: AWS.DynamoDB.PutItemInput = {
    TableName: 'guru-artifacts-local',
    Item: item,
    ReturnValues: 'ALL_OLD',
    ReturnConsumedCapacity: 'TOTAL',
    ReturnItemCollectionMetrics: 'SIZE'
}

dynamo.putItem(params, (err, data) => {
    if (err) console.log(err, err.stack)
    else console.log(data)
    
}) */