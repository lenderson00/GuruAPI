export interface GetArtifactRepo {
    get: (artifactData: GetArtifactRepoParams) => Promise<GetArtifactRepoResult>
}

export type GetArtifactRepoParams = {
    ids: string[]
}

export type GetArtifactRepoResult = {
    id: string,
    [key: string]: unknown
}[]