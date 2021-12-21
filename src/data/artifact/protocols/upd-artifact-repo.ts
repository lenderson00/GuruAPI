import { Level, SubStatSlot } from "../utils/enums"
import { Character } from "../../character/character"

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
    user?: string
    char?: Character
}

export type UpdArtifactRepoResult = boolean