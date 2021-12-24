import { Level, MainStat, Set, SubStatSlot, Type } from "../utils/enums"

export interface ScanArtifactRepo {
    scan: (filter?: ScanArtifactRepoParams) => Promise<ScanArtifactRepoResult>
}

export type ScanArtifactRepoParams = {
    userid?: string
    dtAdded?: string
}

export type ScanArtifactRepoResult = {
    [key:string]: any
}[]