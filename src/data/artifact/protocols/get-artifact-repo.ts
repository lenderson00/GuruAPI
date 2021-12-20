export interface GetArtifactRepo {
    get: (artifactData: GetArtifactRepoParams) => Promise<GetArtifactRepoResults>
}

export type GetArtifactRepoParams = {
    keys: ArtifactKey[]
}

export type ArtifactKey = {
    userid: string,
    dtAdded: string,
}

export type GetArtifactRepoResult = {
    userid: string,
    dtAdded: string,
    [key: string]: unknown
}

export type GetArtifactRepoResults = GetArtifactRepoResult[]