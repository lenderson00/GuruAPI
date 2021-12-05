import { Level, SubStat } from "../utils/enums"
import { Character } from "../../character/character"

export interface UpdArtifactRepo {
    update: (artifactData: UpdArtifactRepoParams) => Promise<UpdArtifactRepoResult>
}

export type UpdArtifactRepoParams = {
    level: Level
    mainstatValue?: number
    substats: {substat: SubStat, value: number}[]
    dtModified: string
    user?: string
    char?: Character
}

export type UpdArtifactRepoResult = boolean