import { GetArtifact, GetArtifactParams, GetArtifactResult } from "../../../domain/artifact/usecases/crud-artifact"
import { Artifact } from "../artifact"
import { upgradeTiers } from "../chances"
import { Sets, Stats, Types } from "../enums"
import { getArtifactRepo } from "../protocols/get-artifact-repo"

export class GetArtifactDB implements GetArtifact {
    private readonly getArtifactRepo: getArtifactRepo

    constructor (getArtifactRepo: getArtifactRepo) {
        this.getArtifactRepo = getArtifactRepo
    }
    
    async get (data: GetArtifactParams): Promise<GetArtifactResult> {
        
        const result = await this.getArtifactRepo.get(data)
        return result
    }
}