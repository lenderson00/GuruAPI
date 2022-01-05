import { Level, MainStat, Set, SubStatSlot, Type } from '../utils/enums'

export interface AddArtifactRepo {
  add: (artifactData: AddArtifactRepoParams) => Promise<AddArtifactRepoResult>
}

export type AddArtifactRepoParams = {
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
}

export type AddArtifactRepoResult = boolean
