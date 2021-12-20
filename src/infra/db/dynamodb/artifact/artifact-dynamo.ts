import { UpdArtifactRepo, UpdArtifactRepoParams, UpdArtifactRepoResult } from "../../../../data/artifact/protocols";
import { AddArtifactRepo, AddArtifactRepoParams, AddArtifactRepoResult } from "../../../../data/artifact/protocols/add-artifact-repo"
import { DelArtifactRepo, DelArtifactRepoParams, DelArtifactRepoResult } from "../../../../data/artifact/protocols/del-artifact-repo";
import { GetArtifactRepo, GetArtifactRepoParams, GetArtifactRepoResults } from "../../../../data/artifact/protocols/get-artifact-repo";
import AWS from 'aws-sdk'
import { DynamoHelper } from "../dynamo-helper";
import env from "../../../../main/config/env";

export class ArtifactDynamo implements AddArtifactRepo, DelArtifactRepo/* , GetArtifactRepo, UpdArtifactRepo */ {
    constructor(private readonly dynamo: AWS.DynamoDB) {}

    async add (artifactData: AddArtifactRepoParams): Promise<AddArtifactRepoResult> {
        await this.dynamo.putItem({
            TableName: env.aws.dynamoArtifactTableName,
            Item: AWS.DynamoDB.Converter.marshall(artifactData),
        }).promise()
        return true
    }

    async del (key: DelArtifactRepoParams): Promise<DelArtifactRepoResult> {
        const result = await this.dynamo.deleteItem({
            TableName: env.aws.dynamoArtifactTableName,
            Key: AWS.DynamoDB.Converter.marshall(key),
            ReturnValues: 'ALL_OLD'
        }).promise()
        return 'Attributes' in result
    }

    /* async get (artifactData: GetArtifactRepoParams): Promise<GetArtifactRepoResults> {
        const artifactCollection = MongoHelper.getCollection('artifacts')
        const id: ObjectId[] = []
        artifactData.ids.forEach(item => id.push(new ObjectId(item)))
        const queryResult = await artifactCollection.find( { "_id": { $in: id } } ).toArray()
        const result = queryResult.map(x => {
            const { _id, ...resultWithoutId } = x
            return Object.assign({},resultWithoutId,{ id: String(_id) })
        })
        return result as GetArtifactRepoResults
    }

    async update (artifactData: UpdArtifactRepoParams): Promise<UpdArtifactRepoResult> {
        const artifactCollection = MongoHelper.getCollection('artifacts')
        const { id, ...updateData } = artifactData
        const result = await artifactCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData})
        return (result.matchedCount == 1 && result.modifiedCount == 1)
    } */
}