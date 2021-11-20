import { AddArtifact, AddArtifactParams, AddArtifactResult } from "../../../domain/artifact/usecases/crud-artifact";
import { Artifact } from "../utils/artifact";
import { AddArtifactRepo } from "../protocols/add-artifact-repo"

export class AddArtifactDB implements AddArtifact {
    private readonly addArtifactRepo: AddArtifactRepo

    constructor (addArtifactRepo: AddArtifactRepo) {
        this.addArtifactRepo = addArtifactRepo
    }
    
    async add (data: AddArtifactParams): Promise<AddArtifactResult> {
        const artifact = new Artifact(data)
        const repoData = await artifact.createRepoData()
        const isValid: AddArtifactResult = await this.addArtifactRepo.add(repoData)
        return isValid
    }
}