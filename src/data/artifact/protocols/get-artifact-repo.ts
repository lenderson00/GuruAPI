import { keysIn } from "lodash"

export interface GetArtifactRepo {
    get: (artifactData: GetArtifactRepoParams) => Promise<GetArtifactRepoResult>
}

export type GetArtifactRepoParams = {
    ids: string[]
}

export type GetArtifactRepoResult = {
    [key: string]: unknown
}[]