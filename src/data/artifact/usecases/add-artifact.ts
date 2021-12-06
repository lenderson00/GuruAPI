import { AddArtifact, AddArtifactParams, AddArtifactResult } from "../../../domain/artifact/usecases/crud-artifact";
import { Artifact } from "../utils/artifact";
import { AddArtifactRepo } from "../protocols/add-artifact-repo"

export class AddArtifactDB implements AddArtifact {
    private readonly addArtifactRepo: AddArtifactRepo
    private readonly artifactUtil: Artifact

    constructor (addArtifactRepo: AddArtifactRepo, artifactUtil: Artifact) {
        this.addArtifactRepo = addArtifactRepo
        this.artifactUtil = artifactUtil
    }
    
    async add (data: AddArtifactParams): Promise<AddArtifactResult> {
        this.artifactUtil.import(data)
        const repoData = await this.artifactUtil.createRepoData()
        const isValid: AddArtifactResult = await this.addArtifactRepo.add(repoData)
        return isValid
    }
}