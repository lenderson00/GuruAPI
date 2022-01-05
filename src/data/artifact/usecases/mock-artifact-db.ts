import { upgradeTiers, Sets, Types, Stats } from '@/data/artifact/utils'
import {
  AddArtifactRepo, AddArtifactRepoParams, AddArtifactRepoResult,
  GetArtifactRepo, GetArtifactRepoParams, GetArtifactRepoResults,
  UpdArtifactRepo, UpdArtifactRepoParams, UpdArtifactRepoResult
} from '../protocols'

export class addArtifactRepoSpy implements AddArtifactRepo {
  params!: AddArtifactRepoParams
  result = true

  async add (addParams: AddArtifactRepoParams): Promise<AddArtifactRepoResult> {
    this.params = addParams
    return true as AddArtifactRepoResult
  }
}

export class getArtifactRepoSpy implements GetArtifactRepo {
  params!: GetArtifactRepoParams
  result = true

  async get (artifactData: GetArtifactRepoParams): Promise<GetArtifactRepoResults> {
    this.params = artifactData
    return []
  }

  async getFull (artifactData: GetArtifactRepoParams): Promise<GetArtifactRepoResults> {
    this.params = artifactData
    return [{
      userid: 'valid_userid',
      set: Sets.AP,
      type: Types.Flower,
      level: 20,
      mainstat: Stats.ATKFlat,
      mainstatValue: 311,
      substats: [{ substat: Stats.CD, value: Math.round(upgradeTiers[Stats.CD][3]) }],
      scoreDflt: 200,

      scoreDfltMainstat: 100,
      scoreDfltSubstats: 100,
      scoreDfltLvl20Min: 500,
      scoreDfltLvl20Avg: 600,
      scoreDfltLvl20Max: 700,
      scoreDfltLvl20SD: 50,
      dtAdded: 'valid_date',
      dtModified: new Date('August 17, 2021 03:24:00').toISOString()
    }]
  }
}

export class updArtifactRepoSpy implements UpdArtifactRepo {
  params!: UpdArtifactRepoParams
  result: UpdArtifactRepoResult = true

  async update (updParams: UpdArtifactRepoParams): Promise<UpdArtifactRepoResult> {
    this.params = updParams
    return this.result
  }
}
