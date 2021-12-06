import { UpdArtifact, UpdArtifactParams, UpdArtifactResult } from "../../../domain/artifact/usecases/crud-artifact"
import { InvalidParamError } from "../../../presentation/errors"
import { GetArtifactRepo, UpdArtifactRepo } from "../protocols"
import { Artifact } from "../utils/artifact"

export class UpdArtifactDB implements UpdArtifact {
    private readonly updArtifactRepo: UpdArtifactRepo
    private readonly getArtifactRepo: GetArtifactRepo
    private readonly artifactUtil: Artifact

    constructor (updArtifactRepo: UpdArtifactRepo, getArtifactRepo: GetArtifactRepo, artifactUtil: Artifact) {
        this.updArtifactRepo = updArtifactRepo
        this.getArtifactRepo = getArtifactRepo
        this.artifactUtil = artifactUtil
    }
    
    async update (data: UpdArtifactParams): Promise<UpdArtifactResult> {
        const getResult = await this.getArtifactRepo.get({ ids: [data.id] })
        if (getResult.length == 0) return new InvalidParamError('id')
        this.artifactUtil.import(getResult[0])
        if (data.set) {
            if (data.set != this.artifactUtil.set) return new InvalidParamError('set')
            if (!this.artifactUtil.set) this.artifactUtil.set = data.set
        }
        if (data.type) {
            if (data.type != this.artifactUtil.type) return new InvalidParamError('type')
            if (!this.artifactUtil.type) this.artifactUtil.type = data.type
        }
        if (data.mainstat) {
            if (data.mainstat != this.artifactUtil.mainstat) return new InvalidParamError('mainstat')
            if (!this.artifactUtil.mainstat) this.artifactUtil.mainstat = data.mainstat
        }
        if (data.level) this.artifactUtil.level = data.level
        if (data.mainstatValue) this.artifactUtil.mainstatValue = data.mainstatValue
        if (data.substats) this.artifactUtil.substats = data.substats
        const updRepoData = await this.artifactUtil.updateRepoData()
        const UpdResult = await this.updArtifactRepo.update(updRepoData)
        return UpdResult
    }
}