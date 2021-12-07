import { ObjectId } from "mongodb";
import { UpdArtifactRepo, UpdArtifactRepoParams, UpdArtifactRepoResult } from "../../../../data/artifact/protocols";
import { AddArtifactRepo, AddArtifactRepoParams, AddArtifactRepoResult } from "../../../../data/artifact/protocols/add-artifact-repo"
import { DelArtifactRepo, DelArtifactRepoParams, DelArtifactRepoResult } from "../../../../data/artifact/protocols/del-artifact-repo";
import { GetArtifactRepo, GetArtifactRepoParams, GetArtifactRepoResults } from "../../../../data/artifact/protocols/get-artifact-repo";
import { MongoHelper } from "./mongo-helper";

export class ArtifactMongo implements AddArtifactRepo, DelArtifactRepo, GetArtifactRepo, UpdArtifactRepo {
    
    async add (artifactData: AddArtifactRepoParams): Promise<AddArtifactRepoResult> {
        const artifactCollection = MongoHelper.getCollection('artifacts')
        const result = await artifactCollection.insertOne(artifactData)
        return result.insertedId !== null
    }

    async del (id: DelArtifactRepoParams): Promise<DelArtifactRepoResult> {
        const artifactCollection = MongoHelper.getCollection('artifacts')
        const result = await artifactCollection.deleteOne( { "_id" : new ObjectId(id) } )
        return result.deletedCount == 1
    }

    async get (artifactData: GetArtifactRepoParams): Promise<GetArtifactRepoResults> {
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
        console.log(result)
        return (result.matchedCount == 1 && result.modifiedCount == 1)
    }
}