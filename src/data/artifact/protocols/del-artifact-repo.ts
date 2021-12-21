import { ArtifactKey } from "../../../domain/artifact/usecases/crud-artifact"

export interface DelArtifactRepo {
    del: (artifactData: DelArtifactRepoParams) => Promise<DelArtifactRepoResult>
}

export type DelArtifactRepoParams = ArtifactKey

export type DelArtifactRepoResult = boolean