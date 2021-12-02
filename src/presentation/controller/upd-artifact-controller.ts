import { UpdArtifact, UpdArtifactParams, UpdArtifactResult } from "../../domain/artifact/usecases/crud-artifact";
import { ok } from "../helpers";
import { Controller, HttpResponse, Validation } from "../protocols";

export class UpdArtifactController implements Controller {
    private readonly updArtifact: UpdArtifact
    private readonly validation: Validation

    constructor (updArtifact: UpdArtifact, validation: Validation) {
        this.updArtifact = updArtifact
        this.validation = validation
    }

    async handle (request: Request): Promise<HttpResponse> {
        const isOk: UpdArtifactResult = await this.updArtifact.update(request as UpdArtifactParams);
        return ok(isOk)
    }
}

export interface Request {
    id?: string
    set?: string
    type?: string
    level?: number
    mainstat?: string
    substats?: {substat: string, value: number}[]
}