import { UpdArtifact, UpdArtifactParams, UpdArtifactResult } from "../../../domain/artifact/usecases/crud-artifact"
import { InvalidParamError } from "../../../presentation/errors"
import { GetArtifactRepo, UpdArtifactRepo } from "../protocols"
import { Artifact } from "../utils/artifact"

export class UpdArtifactDB implements UpdArtifact {
    private readonly updArtifactRepo: UpdArtifactRepo
    private readonly getArtifactRepo: GetArtifactRepo

    constructor (updArtifactRepo: UpdArtifactRepo, getArtifactRepo: GetArtifactRepo) {
        this.updArtifactRepo = updArtifactRepo
        this.getArtifactRepo = getArtifactRepo
    }
    
    async update (data: UpdArtifactParams): Promise<UpdArtifactResult> {
        const getResult = await this.getArtifactRepo.get({ ids: [data.id] })
        if (getResult.length == 0) return new InvalidParamError('id')
        const artifact = new Artifact(getResult[0])
        if (data.level) artifact.level = data.level
        if (data.mainstatValue) artifact.mainstatValue = data.mainstatValue
        if (data.substats) artifact.substats = data.substats
        const updRepoData = await artifact.updateRepoData()
        const UpdResult = await this.updArtifactRepo.update(updRepoData)
        return false
    }
}