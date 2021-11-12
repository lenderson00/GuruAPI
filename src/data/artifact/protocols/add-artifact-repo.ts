import { Level, MainStat, Set, SubStat, Type } from "../enums"
import { Character } from "../../character/character"

export interface addArtifactRepo {
    add: (artifactData: AddArtifactRepoParams) => Promise<AddArtifactRepoResult>
}

export type AddArtifactRepoParams = {
    set: Set
    type: Type
    level: Level
    mainstat: MainStat
    mainstatValue?: number
    substats: {substat: SubStat, value: number}[]
    scoreDflt?: undefined
    scoreMainstatDflt?: undefined
    scoreSubstatsDflt?: undefined
    dtAdded?: Date
    dtModified?: Date
    user?: string
    char?: Character
}

export type AddArtifactRepoResult = boolean