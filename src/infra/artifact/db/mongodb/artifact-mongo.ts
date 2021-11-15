import { ObjectId } from "mongodb";
import { addArtifactRepo, AddArtifactRepoParams, AddArtifactRepoResult } from "../../../../data/artifact/protocols/add-artifact-repo"
import { DelArtifactRepo, DelArtifactRepoParams, DelArtifactRepoResult } from "../../../../data/artifact/protocols/del-artifact-repo";
import { MongoHelper } from "./mongo-helper";

export class ArtifactMongo implements addArtifactRepo, DelArtifactRepo {
    
    async add (artifactData: AddArtifactRepoParams): Promise<AddArtifactRepoResult> {
        const artifactCollection = MongoHelper.getCollection('artifacts')
        const result = await artifactCollection.insertOne(artifactData)
        return result.insertedId !== null
    }

    async del (id: DelArtifactRepoParams): Promise<DelArtifactRepoResult> {
        const artifactCollection = MongoHelper.getCollection('artifacts')
        const result = await artifactCollection.deleteOne( { "_id" : new ObjectId(id) } )
        return result.deletedCount === 1
    }
}