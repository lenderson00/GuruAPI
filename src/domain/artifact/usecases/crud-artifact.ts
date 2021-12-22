import { Level, MainStat, Set, SubStatSlot, Type } from "../../../data/artifact/utils/enums"

export type ArtifactKey = {
    userid: string,
    dtAdded: string,
}
export interface AddArtifact {
    add: (data: AddArtifactParams) => Promise<AddArtifactResult>
}

export type AddArtifactParams = {
    set: Set
    type: Type
    level: Level
    mainstat: MainStat
    substats: SubStatSlot[]
}

export type AddArtifactResult = boolean

export type DelArtifactResult = boolean

export interface GetArtifact {
    get: (data: GetArtifactParams) => Promise<GetArtifactResults>
    getFull: (data: GetFullArtifactParams) => Promise<GetFullArtifactResult>
}

export type GetArtifactParams = {
    keys: ArtifactKey[]
}

export type GetArtifactResult = {
    userid: string,
    dtAdded: string,
    set: Set
    type: Type
    level: Level
    mainstat: MainStat
    mainstatValue: number
    substats: SubStatSlot[]
    scoreDflt: number
}

export type GetArtifactResults = {
    found: GetArtifactResult[]
    notFound: ArtifactKey[]
}

export type GetFullArtifactParams = {
    keys: ArtifactKey[]
}

export type GetFullArtifactResult = {
    found: Record<string,never>[] | {
        userid: string,
        set: Set
        type: Type
        level: Level
        mainstat: MainStat
        mainstatValue: number
        substats: SubStatSlot[]
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
    notFound: ArtifactKey[]
}

export interface UpdArtifact {
    update: (data: UpdArtifactParams) => Promise<UpdArtifactResult>
}

export type UpdArtifactParams = {
    userid: string
    dtAdded: string
    level?: Level
    mainstatValue?: number
    substats?: SubStatSlot[]
    /* char: Character */
}

export type UpdArtifactResult = boolean | Error