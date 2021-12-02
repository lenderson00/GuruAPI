import { Level, MainStat, Set, SubStat, Type } from "../../../data/artifact/utils/enums"
import { Character } from "../../../data/character/character"
export interface AddArtifact {
    add: (data: AddArtifactParams) => Promise<AddArtifactResult>
}

export type AddArtifactParams = {
    set: Set
    type: Type
    level: Level
    mainstat: MainStat
    substats: {substat: SubStat, value: number}[]
}

export type AddArtifactResult = boolean

export type DelArtifactResult = boolean

export interface GetArtifact {
    get: (data: GetArtifactParams) => Promise<GetArtifactResults>
    getFull: (data: GetFullArtifactParams) => Promise<GetFullArtifactResult>
}

export type GetArtifactParams = {
    ids: string[]
}

export type GetArtifactResult = {
    id: string
    set: Set
    type: Type
    level: Level
    mainstat: MainStat
    mainstatValue: number
    substats: {substat: SubStat, value: number}[]
    scoreDflt: number
}

export type GetArtifactResults = {
    found: GetArtifactResult[]
    notFound: string[]
}

export type GetFullArtifactParams = {
    ids: string[]
}

export type GetFullArtifactResult = {
    found: Record<string,never>[] | {
        set: Set
        type: Type
        level: Level
        mainstat: MainStat
        mainstatValue: number
        substats: {substat: SubStat, value: number}[]
        scoreDflt: number
        scoreDfltMainstat: number
        scoreDfltSubstats: number
        scoreDfltLvl20Min: number
        scoreDfltLvl20Avg: number
        scoreDfltLvl20Max: number
        scoreDfltLvl20SD: number
        dtAdded: Date
        dtModified: Date
    }[]
    notFound: string[]
}

export interface UpdArtifact {
    update: (data: UpdArtifactParams) => Promise<UpdArtifactResult>
}

export type UpdArtifactParams = {
    set: Set
    type: Type
    level: Level
    mainstat: MainStat
    substats: {substat: SubStat, value: number}[]
    char: Character
}

export type UpdArtifactResult = boolean