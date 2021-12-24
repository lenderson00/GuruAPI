import { Level, MainStat, Set, SubStatSlot, Type } from "../utils/enums"

export interface ScanArtifactRepo {
    scan: (filter: ScanArtifactRepoParams) => Promise<ScanArtifactRepoResult>
}

export type ScanArtifactRepoParams = {
    userid?: string
    dtAdded?: string
}

export type ScanArtifactRepoResult = {
    userid: string
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
    dtAdded: string
    dtModified: string
    /* char?: Character */
    [key:string]: unknown
}[]