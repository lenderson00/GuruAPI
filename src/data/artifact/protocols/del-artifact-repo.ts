export interface DelArtifactRepo {
    del: (artifactData: DelArtifactRepoParams) => Promise<DelArtifactRepoResult>
}

export type DelArtifactRepoParams = { id: string }

export type DelArtifactRepoResult = boolean