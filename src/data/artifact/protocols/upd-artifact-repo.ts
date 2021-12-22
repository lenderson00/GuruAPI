import { Level, SubStatSlot } from "../utils/enums"

export interface UpdArtifactRepo {
    update: (artifactData: UpdArtifactRepoParams) => Promise<UpdArtifactRepoResult>
}

export type UpdArtifactRepoParams = {
    userid: string
    dtAdded: string
    level?: Level
    mainstatValue?: number
    substats?: SubStatSlot[]
    dtModified?: string
    scoreDflt?: number
    scoreDfltMainstat?: number
    scoreDfltSubstats?: number
    scoreDfltLvl20Min?: number
    scoreDfltLvl20Avg?: number
    scoreDfltLvl20Max?: number
    scoreDfltLvl20SD?: number
    /* char?: Character */
}

export type UpdArtifactRepoResult = boolean