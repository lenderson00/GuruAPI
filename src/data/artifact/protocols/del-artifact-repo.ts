import { ArtifactKey } from "."

export interface DelArtifactRepo {
    del: (artifactData: DelArtifactRepoParams) => Promise<DelArtifactRepoResult>
}

export type DelArtifactRepoParams = ArtifactKey

export type DelArtifactRepoResult = boolean