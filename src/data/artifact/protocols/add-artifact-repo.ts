import { Level, MainStat, Set, SubStat, Type } from "../utils/enums"
import { Character } from "../../character/character"

export interface AddArtifactRepo {
    add: (artifactData: AddArtifactRepoParams) => Promise<AddArtifactRepoResult>
}

export type AddArtifactRepoParams = {
    set: Set
    type: Type
    level: Level
    mainstat: MainStat
    mainstatValue?: number
    substats: {substat: SubStat, value: number}[]
    scoreDflt: number
    scoreMainstatDflt: number
    scoreSubstatsDflt: number
    scoreLvl20Min: number
    scoreLvl20Avg: number
    scoreLvl20Max: number
    scoreLvl20SD: number
    dtAdded: string
    dtModified: string
    user?: string
    char?: Character
}

export type AddArtifactRepoResult = boolean