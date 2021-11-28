import { GetArtifact, GetArtifactParams, GetArtifactResult, GetArtifactResults, GetFullArtifactParams, GetFullArtifactResult } from "../../../domain/artifact/usecases/crud-artifact"
import { GetArtifactRepo } from "../protocols/get-artifact-repo"
import _ from "lodash/fp";
import { PropertyPath } from "lodash";

export class GetArtifactDB implements GetArtifact {
    private readonly getArtifactRepo: GetArtifactRepo

    constructor (getArtifactRepo: GetArtifactRepo) {
        this.getArtifactRepo = getArtifactRepo
    }
    
    async get (ids: GetArtifactParams): Promise<GetArtifactResults> {
        const fields = ['id','set', 'type', 'level', 'mainstat', 'mainstatValue', 'substats', 'score']
        const result = await this.getArtifactRepo.get(ids)
        const adjustedResult: GetArtifactResults = {
            found: [],
            notFound: ids.ids,
        }
        result.forEach((item) => {
            const index = adjustedResult.notFound.indexOf(item.id as string)
            if (index > -1) adjustedResult.notFound.splice(index, 1)
            const found = _.pick(fields, item)
            adjustedResult.found.push(found as unknown as GetArtifactResult)
        })
        return adjustedResult
    }

    async getFull (ids: GetFullArtifactParams): Promise<GetFullArtifactResult> {
        return {found: [{}], notFound: []}
    }
}