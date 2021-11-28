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
    scoreDfltMainstat: number
    scoreDfltSubstats: number
    scoreDfltLvl20Min?: number
    scoreDfltLvl20Avg?: number
    scoreDfltLvl20Max?: number
    scoreDfltLvl20SD?: number
    dtAdded: string
    dtModified: string
    user?: string
    char?: Character
}

export type AddArtifactRepoResult = boolean