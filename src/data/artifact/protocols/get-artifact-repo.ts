export interface GetArtifactRepo {
    get: (artifactData: GetArtifactRepoParams) => Promise<GetArtifactRepoResult>
}

export type GetArtifactRepoParams = {
    ids: string[]
    fields: string[]
}

export type GetArtifactRepoResult = Record<string, unknown>