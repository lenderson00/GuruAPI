import { Level, MainStat, SubStat, Type, Set } from "../enums"

export interface getArtifactRepo {
    get: (artifactData: GetArtifactRepoParams) => Promise<GetArtifactRepoResult>
    getFull: (artifactData: GetArtifactRepoParams) => Promise<GetFullArtifactRepoResult>
}

export type GetArtifactRepoParams = {
    id: string
}

export type GetArtifactRepoResult = {
    set: Set
    type: Type
    level: Level
    mainstat: MainStat
    mainstatValue: number
    substats: {substat: SubStat, value: number}[]
    score: number
}

export type GetFullArtifactRepoResult = {
    set: Set
    type: Type
    level: Level
    mainstat: MainStat
    mainstatValue: number
    substats: {substat: SubStat, value: number}[]
    score: number
    scoreMainstat: number
    scoreSubstats: number
    scoreLvl20Min: number
    scoreLvl20Avg: number
    scoreLvl20Max: number
    scoreLvl20SD: number
    dtAdded: Date
    dtModified: Date
}