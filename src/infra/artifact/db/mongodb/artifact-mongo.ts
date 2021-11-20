import { Collection, ObjectId } from "mongodb";
import { AddArtifactRepo, AddArtifactRepoParams, AddArtifactRepoResult } from "../../../../data/artifact/protocols/add-artifact-repo"
import { DelArtifactRepo, DelArtifactRepoParams, DelArtifactRepoResult } from "../../../../data/artifact/protocols/del-artifact-repo";
import { GetArtifactRepo, GetArtifactRepoParams, GetArtifactRepoResult } from "../../../../data/artifact/protocols/get-artifact-repo";
import { MongoHelper } from "./mongo-helper";

export class ArtifactMongo implements AddArtifactRepo, DelArtifactRepo, GetArtifactRepo {
    private artifactCollection: Collection

    constructor () {
        this.artifactCollection = MongoHelper.getCollection('artifacts')
    }

    async add (artifactData: AddArtifactRepoParams): Promise<AddArtifactRepoResult> {
        const result = await this.artifactCollection.insertOne(artifactData)
        return result.insertedId !== null
    }

    async del (id: DelArtifactRepoParams): Promise<DelArtifactRepoResult> {
        const result = await this.artifactCollection.deleteOne( { "_id" : new ObjectId(id) } )
        return result.deletedCount === 1
    }

    async get (artifactData: GetArtifactRepoParams): Promise<GetArtifactRepoResult> {
        return new Promise(resolve => resolve({}))
    }
}