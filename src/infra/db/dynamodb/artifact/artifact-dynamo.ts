import { UpdArtifactRepo, UpdArtifactRepoParams, UpdArtifactRepoResult } from "../../../../data/artifact/protocols";
import { AddArtifactRepo, AddArtifactRepoParams, AddArtifactRepoResult } from "../../../../data/artifact/protocols/add-artifact-repo"
import { DelArtifactRepo, DelArtifactRepoParams, DelArtifactRepoResult } from "../../../../data/artifact/protocols/del-artifact-repo";
import { GetArtifactRepo, GetArtifactRepoParams, GetArtifactRepoResult, GetArtifactRepoResults } from "../../../../data/artifact/protocols/get-artifact-repo";
import AWS from 'aws-sdk'
import { DynamoHelper } from "../dynamo-helper";
import env from "../../../../main/config/env";
import { BatchGetRequestMap, KeyList } from "aws-sdk/clients/dynamodb";

export class ArtifactDynamo implements AddArtifactRepo, DelArtifactRepo/* , GetArtifactRepo, UpdArtifactRepo */ {
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

    /* async update (artifactData: UpdArtifactRepoParams): Promise<UpdArtifactRepoResult> {
        const artifactCollection = MongoHelper.getCollection('artifacts')
        const { id, ...updateData } = artifactData
        const result = await artifactCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData})
        return (result.matchedCount == 1 && result.modifiedCount == 1)
    } */
}