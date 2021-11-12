import { AddArtifact, AddArtifactParams, AddArtifactResult } from "../../../domain/artifact/usecases/add-artifact";
import { Artifact } from "../artifact";
import { addArtifactRepo } from "../protocols/add-artifact-repo"

export class AddArtifactDB implements AddArtifact {
    private readonly addArtifactRepo: addArtifactRepo

    constructor (addArtifactRepo: addArtifactRepo) {
        this.addArtifactRepo = addArtifactRepo
    }
    
    async add (data: AddArtifactParams): Promise<AddArtifactResult> {
        const artifact = new Artifact(data)
        const repoData = await artifact.createRepoData()
        const isValid: AddArtifactResult = await this.addArtifactRepo.add(repoData)
        return isValid
    }
}