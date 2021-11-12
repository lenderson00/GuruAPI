import { addArtifactRepo, AddArtifactRepoParams, AddArtifactRepoResult } from "../protocols/add-artifact-repo"

export class addArtifactRepoSpy implements addArtifactRepo {
    params!: AddArtifactRepoParams
    result = true
    
    async add (addParams: AddArtifactRepoParams): Promise<AddArtifactRepoResult> {
        this.params = addParams
        return new Promise((res) => res(true as AddArtifactRepoResult))
    }
}