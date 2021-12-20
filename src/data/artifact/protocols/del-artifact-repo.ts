export interface DelArtifactRepo {
    del: (artifactData: DelArtifactRepoParams) => Promise<DelArtifactRepoResult>
}

export type DelArtifactRepoParams = {
    userid: string,
    dtAdded: string
}

export type DelArtifactRepoResult = boolean