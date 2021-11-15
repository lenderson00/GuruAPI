import { Level, MainStat, Set, SubStat, Type } from "../../../data/artifact/enums"
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