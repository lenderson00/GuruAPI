import { Controller, HttpResponse } from "../protocols";
import { ok, serverError } from "../helpers/http-helper";
import { ScanArtifactRepo, ScanArtifactRepoParams, ScanArtifactRepoResult } from "../../data/artifact/protocols/scan-artifact-repo";

export class ScanArtifactController implements Controller {
    constructor (private readonly scanArtifactRepo: ScanArtifactRepo) {}
    
    async handle (request: ScanArtifactController.Request): Promise<HttpResponse> {
        try {
            const result: ScanArtifactRepoResult = await this.scanArtifactRepo.scan(request as ScanArtifactRepoParams);
            return ok(result);
        } catch (error) {
            return serverError(error as Error)
        }
    }
    
}

export namespace ScanArtifactController {
    export type Request = {
        userid?: string
        dtAdded?: string
    }
}