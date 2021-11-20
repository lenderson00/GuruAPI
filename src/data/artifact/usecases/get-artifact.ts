import { GetArtifact, GetArtifactParams, GetArtifactResult, GetFullArtifactParams, GetFullArtifactResult } from "../../../domain/artifact/usecases/crud-artifact"
import { GetArtifactRepo, GetArtifactRepoParams } from "../protocols/get-artifact-repo"

export class GetArtifactDB implements GetArtifact {
    private readonly getArtifactRepo: GetArtifactRepo

    constructor (getArtifactRepo: GetArtifactRepo) {
        this.getArtifactRepo = getArtifactRepo
    }
    
    async get (ids: GetArtifactParams): Promise<GetArtifactResult> {
        /* const fields = ['set', 'type', 'level', 'mainstat', 'mainstatValue', 'substats', 'score'] */
        const result = await this.getArtifactRepo.get(ids) as GetArtifactResult
        return result
    }

    async getFull (ids: GetFullArtifactParams): Promise<GetFullArtifactResult> {
        return {found: [{}], notFound: []}
    }
}