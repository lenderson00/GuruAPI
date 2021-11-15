export interface DelArtifactRepo {
    del: (artifactData: DelArtifactRepoParams) => Promise<DelArtifactRepoResult>
}

export type DelArtifactRepoParams = string

export type DelArtifactRepoResult = boolean