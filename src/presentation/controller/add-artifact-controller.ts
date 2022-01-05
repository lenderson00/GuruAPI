import { Controller, HttpResponse, Validation } from "../protocols";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import { AddArtifact, AddArtifactParams, AddArtifactResult } from "../../domain/artifact/usecases/crud-artifact"

export class AddArtifactController implements Controller {
    private readonly addArtifact: AddArtifact
    private readonly validation: Validation
    
    constructor (addArtifact: AddArtifact, validation: Validation) {
        this.addArtifact = addArtifact
        this.validation = validation
    }
    
    async handle (request: AddArtifactController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) return badRequest(error)
            const isOk: AddArtifactResult = await this.addArtifact.add(request as AddArtifactParams);
            return ok(isOk);
        } catch (error) {
            return serverError(error as Error)
        }
    }
    
}

export namespace AddArtifactController {
    export type Request = {
        userid?: string
        set?: string
        type?: string
        level?: number
        mainstat?: string
        substats?: {substat: string, value: number}[]
    }
}