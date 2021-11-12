import { AddArtifact, AddArtifactParams, AddArtifactResult } from "../../../domain/artifact/usecases/add-artifact";
import { addArtifactRepo } from "../protocols/add-artifact-Repo"

export class AddArtifactDB implements AddArtifact {
    private readonly addArtifactRepo: addArtifactRepo

    constructor (addArtifactRepo: addArtifactRepo) {
        this.addArtifactRepo = addArtifactRepo
    }
    
    async add (data: AddArtifactParams): Promise<AddArtifactResult> {
        
        const isValid: AddArtifactResult = await this.addArtifactRepo.add(data)
        return isValid
    }
}