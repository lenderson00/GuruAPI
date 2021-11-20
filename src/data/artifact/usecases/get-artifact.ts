import { GetArtifact, GetArtifactParams, GetArtifactResult, GetFullArtifactParams, GetFullArtifactResult } from "../../../domain/artifact/usecases/crud-artifact"
import { getArtifactRepo, GetArtifactRepoParams } from "../protocols/get-artifact-repo"

export class GetArtifactDB implements GetArtifact {
    private readonly getArtifactRepo: getArtifactRepo

    constructor (getArtifactRepo: getArtifactRepo) {
        this.getArtifactRepo = getArtifactRepo
    }
    
    async get (ids: GetArtifactParams): Promise<GetArtifactResult> {
        const getRepoData: GetArtifactRepoParams = {
            ...ids,
            fields: ['set', 'type', 'level', 'mainstat', 'mainstatValue', 'substats', 'score']
        }
        const result = await this.getArtifactRepo.get(getRepoData) as GetArtifactResult
        return result
    }

    async getFull (ids: GetFullArtifactParams): Promise<GetFullArtifactResult> {
        return {}
    }
}