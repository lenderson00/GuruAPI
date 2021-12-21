/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { UpdArtifact, UpdArtifactParams, UpdArtifactResult } from "../../../domain/artifact/usecases/crud-artifact"
import { InvalidParamError } from "../../../presentation/errors"
import { makeArtifactValidation } from "../../../validation/validators/artifact-validation"
import { GetArtifactRepo, UpdArtifactRepo } from "../protocols"
import { Artifact } from "../utils/artifact"
import { SubStat } from "../utils/enums"

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
        
        // Get AS-IS data from DB
        const getResult = await this.getArtifactRepo.get({ keys: [{ userid: data.userid, dtAdded: data.dtAdded }] })

        // Check if ID is invalid
        if (getResult.length == 0) return new InvalidParamError('date added')
        this.artifactUtil.import(getResult[0])

        // Check if set is different from DB
        if (data.set) {
            if (data.set != this.artifactUtil.set) return new InvalidParamError('set')
            if (!this.artifactUtil.set) this.artifactUtil.set = data.set
        }

        // Check if type is different from DB
        if (data.type) {
            if (data.type != this.artifactUtil.type) return new InvalidParamError('type')
            if (!this.artifactUtil.type) this.artifactUtil.type = data.type
        }

        // Check if mainstat is different from DB
        if (data.mainstat) {
            if (data.mainstat != this.artifactUtil.mainstat) return new InvalidParamError('mainstat')
            if (!this.artifactUtil.mainstat) this.artifactUtil.mainstat = data.mainstat
        }

        // Update artifact with received data
        if (data.level) this.artifactUtil.level = data.level
        if (data.mainstatValue) this.artifactUtil.mainstatValue = data.mainstatValue
        if (data.substats) {
            const asisSubstats: SubStat[] = []
            this.artifactUtil.substats?.map(sub => asisSubstats.push(sub.substat))
            const newSubs = this.artifactUtil.substats
            data.substats.forEach(sub => {
                if (asisSubstats.includes(sub.substat)) {
                    const index = asisSubstats.indexOf(sub.substat)
                    newSubs![index] = sub
                }
                else newSubs!.push(sub)
            })
            this.artifactUtil.substats = newSubs
        }

        // Validate new artifact data
        const isInvalid = this.artifactUtil.validate(makeArtifactValidation())
        if (isInvalid) return isInvalid

        // Call UpdArtifactRepo
        const updRepoData = await this.artifactUtil.updateRepoData()
        const UpdResult = await this.updArtifactRepo.update(updRepoData)
        return UpdResult
    }
}