import { AddArtifactParams, AddArtifactResult } from "../../../domain/artifact/usecases/add-artifact"

export interface AddArtifactDB {
    add: (artifactData: AddArtifactParams) => Promise<AddArtifactResult>
}