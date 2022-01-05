import { ArtifactKey } from '@/domain/artifact/usecases/crud-artifact'

export interface GetArtifactRepo {
  get: (artifactData: GetArtifactRepoParams) => Promise<GetArtifactRepoResults>
}

export type GetArtifactRepoParams = {
  keys: ArtifactKey[]
}

export type GetArtifactRepoResult = {
  userid: string
  dtAdded: string
  [key: string]: unknown
}

export type GetArtifactRepoResults = GetArtifactRepoResult[]
