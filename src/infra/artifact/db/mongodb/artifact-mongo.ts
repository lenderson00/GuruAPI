import { addArtifactRepo, AddArtifactRepoParams, AddArtifactRepoResult } from "../../../../data/artifact/protocols/add-artifact-repo"
import { MongoHelper } from "./mongo-helper";

export class ArtifactMongo implements addArtifactRepo {
    async add (artifactData: AddArtifactRepoParams): Promise<AddArtifactRepoResult> {
        const artifactCollection = MongoHelper.getCollection('artifacts')
        const result = await artifactCollection.insertOne(artifactData)
        return result.insertedId !== null
    }
}