import { AddArtifactDB } from "../../../../data/artifact/protocols/add-artifact-DB";
import { AddArtifactParams, AddArtifactResult } from "../../../../domain/artifact/usecases/add-artifact";
import { MongoHelper } from "./mongo-helper";

export class ArtifactMongo implements AddArtifactDB {
    async add (data: AddArtifactParams): Promise<AddArtifactResult> {
        const artifactCollection = MongoHelper.getCollection('artifacts')
        const result = await artifactCollection.insertOne(data)
        return result.insertedId !== null
    }
}