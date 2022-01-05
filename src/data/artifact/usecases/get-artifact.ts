import { GetArtifact, GetArtifactParams, GetArtifactResult, GetArtifactResults, GetFullArtifactParams, GetFullArtifactResult } from '../../../domain/artifact/usecases/crud-artifact'
import { GetArtifactRepo } from '../protocols/get-artifact-repo'
import _ from 'lodash/fp'

export class GetArtifactDB implements GetArtifact {
  constructor (private readonly getArtifactRepo: GetArtifactRepo) {}

  async get (keys: GetArtifactParams): Promise<GetArtifactResults> {
    const result = await this.getArtifactRepo.get(keys)
    const adjustedResult: GetArtifactResults = {
      found: [],
      notFound: keys.keys
    }
    const fields = ['userid', 'dtAdded', 'set', 'type', 'level', 'mainstat', 'mainstatValue', 'substats', 'scoreDflt']
    result.forEach(item => {
      const index = adjustedResult.notFound.findIndex(x => x.userid === item.userid && x.dtAdded === item.dtAdded)
      if (index > -1) adjustedResult.notFound.splice(index, 1)
      const found = _.pick(fields, item)
      adjustedResult.found.push(found as unknown as GetArtifactResult)
    })
    return adjustedResult
  }

  async getFull (ids: GetFullArtifactParams): Promise<GetFullArtifactResult> {
    return { found: [], notFound: [] }
  }
}
