import { UpdArtifactRepo, UpdArtifactRepoParams, UpdArtifactRepoResult } from "../../../../data/artifact/protocols";
import { AddArtifactRepo, AddArtifactRepoParams, AddArtifactRepoResult } from "../../../../data/artifact/protocols/add-artifact-repo"
import { DelArtifactRepo, DelArtifactRepoParams, DelArtifactRepoResult } from "../../../../data/artifact/protocols/del-artifact-repo";
import { GetArtifactRepo, GetArtifactRepoParams, GetArtifactRepoResult, GetArtifactRepoResults } from "../../../../data/artifact/protocols/get-artifact-repo";
import AWS from 'aws-sdk'
import env from "../../../../main/config/env";
import { BatchGetRequestMap, KeyList } from "aws-sdk/clients/dynamodb";
import _ from "lodash/fp";
import { ScanArtifactRepo, ScanArtifactRepoParams, ScanArtifactRepoResult } from "../../../../data/artifact/protocols/scan-artifact-repo";
import { PromiseResult } from "aws-sdk/lib/request";

export class ArtifactDynamo implements AddArtifactRepo, DelArtifactRepo, GetArtifactRepo, UpdArtifactRepo, ScanArtifactRepo {
    private readonly tableName = env.aws.dynamoArtifactTableName
    constructor(private readonly dynamo: AWS.DynamoDB) {}

    async add (artifactData: AddArtifactRepoParams): Promise<AddArtifactRepoResult> {
        await this.dynamo.putItem({
            TableName: this.tableName,
            Item: AWS.DynamoDB.Converter.marshall(artifactData),
        }).promise()
        return true
    }

    async del (key: DelArtifactRepoParams): Promise<DelArtifactRepoResult> {
        const result = await this.dynamo.deleteItem({
            TableName: this.tableName,
            Key: AWS.DynamoDB.Converter.marshall(key),
            ReturnValues: 'ALL_OLD'
        }).promise()
        return 'Attributes' in result
    }

    async get (artifactData: GetArtifactRepoParams): Promise<GetArtifactRepoResults> {
        const keys: KeyList = []
        artifactData.keys.map(key => keys.push(AWS.DynamoDB.Converter.marshall(key)))
        const reqItems: BatchGetRequestMap = {
            [this.tableName]: {
                Keys: keys
            }
        }
        const result = await this.dynamo.batchGetItem({
            RequestItems: reqItems
        }).promise()
        const adjResult = result.Responses?.[this.tableName].map(item => AWS.DynamoDB.Converter.unmarshall(item) as GetArtifactRepoResult)
        return adjResult || []
    }

    async update (artifactData: UpdArtifactRepoParams): Promise<UpdArtifactRepoResult> {
        const { userid, dtAdded, ...updateData } = artifactData
        if (_.isEmpty(updateData)) return true

        let update = 'SET '
        const attrValues: Record<string,unknown> = {}
        const attrNames: Record<string,string> = {}

        for (const prop in updateData) {
            if (Object.prototype.hasOwnProperty.call(updateData, prop)) {
                attrValues[`:${prop}`] = updateData[prop as keyof typeof updateData];
                attrNames[`#attr${prop}`] = `${prop}`;
                update = update + `#attr${prop} = :${prop}, `
            }
        }

        await this.dynamo.updateItem({
            TableName: this.tableName,
            Key: AWS.DynamoDB.Converter.marshall({ userid: userid, dtAdded: dtAdded }),
            UpdateExpression: update.substring(0, update.length - 2),
            ExpressionAttributeValues: AWS.DynamoDB.Converter.marshall(attrValues),
            ExpressionAttributeNames: attrNames
        }).promise()
        return true
    }
    
    async scan (filter?: ScanArtifactRepoParams): Promise<ScanArtifactRepoResult> {
        let data: PromiseResult<AWS.DynamoDB.ScanOutput, AWS.AWSError>
        let filterExp = ''
        const attrValues: Record<string,string> = {}
        
        if (filter?.userid == undefined && filter?.dtAdded == undefined) {
            data = await this.dynamo.scan({
                TableName: env.aws.dynamoArtifactTableName
            }).promise()
        } else {
            if (filter.userid != undefined) {
                attrValues[':id'] = filter.userid
                if (filter.dtAdded != undefined) {
                    filterExp = 'userid = :id and dtAdded = :dt'
                    attrValues[':dt'] = filter.dtAdded
                } else {
                    filterExp = 'userid = :id'
                }
            } else {
                if (filter.dtAdded != undefined) {
                    filterExp = 'dtAdded = :dt'
                    attrValues[':dt'] = filter.dtAdded
                }
            }
            data = await this.dynamo.scan({
                TableName: env.aws.dynamoArtifactTableName,
                FilterExpression: filterExp,
                ExpressionAttributeValues: AWS.DynamoDB.Converter.marshall(attrValues)
            }).promise()
        }
        const result = data.Items?.map((item: AWS.DynamoDB.AttributeMap) => AWS.DynamoDB.Converter.unmarshall(item))
        return result || []
    }
}