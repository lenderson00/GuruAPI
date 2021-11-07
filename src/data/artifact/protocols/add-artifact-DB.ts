import { AddArtifactParams, AddArtifactResult } from "../../../domain/artifact/usecases/add-artifact";

export interface AddArtifactDB {
    add: (data: AddArtifactParams) => Promise<AddArtifactResult>
}