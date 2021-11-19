import { Level, MainStat, Set, SubStat, Type } from "../../../data/artifact/enums"
import { GetArtifactRepoResult } from "../../../data/artifact/protocols/get-artifact-repo"
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
    get: (data: GetArtifactParams) => Promise<GetArtifactResult>
}

export type GetArtifactParams = {
    id: string
}

export type GetArtifactResult = GetArtifactRepoResult

