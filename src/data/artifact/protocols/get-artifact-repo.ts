export interface GetArtifactRepo {
    get: (artifactData: GetArtifactRepoParams) => Promise<GetArtifactRepoResults>
}

export type GetArtifactRepoParams = {
    ids: string[]
}

export type GetArtifactRepoResult = {
    id: string,
    [key: string]: unknown
}

export type GetArtifactRepoResults = GetArtifactRepoResult[]