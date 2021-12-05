import { UpdArtifact, UpdArtifactParams, UpdArtifactResult } from "../../../domain/artifact/usecases/crud-artifact"
import { GetArtifactRepo, UpdArtifactRepo } from "../protocols"

export class UpdArtifactDB implements UpdArtifact {
    private readonly updArtifactRepo: UpdArtifactRepo
    private readonly getArtifactRepo: GetArtifactRepo

    constructor (updArtifactRepo: UpdArtifactRepo, getArtifactRepo: GetArtifactRepo) {
        this.updArtifactRepo = updArtifactRepo
        this.getArtifactRepo = getArtifactRepo
    }
    
    async update (data: UpdArtifactParams): Promise<UpdArtifactResult> {
        const result = await this.getArtifactRepo.get({ ids: [data.id] })
        return false
    }
}