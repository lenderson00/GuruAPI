import { SubStatSlot } from "../../data/artifact/utils/enums";
import { UpdArtifact, UpdArtifactParams, UpdArtifactResult } from "../../domain/artifact/usecases/crud-artifact";
import { badRequest, ok, serverError } from "../helpers";
import { Controller, HttpResponse, Validation } from "../protocols";

export class UpdArtifactController implements Controller {

    constructor (private readonly updArtifact: UpdArtifact, private readonly validation: Validation) {}

    async handle (request: UpdArtifactController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) return badRequest(error)
            const isOk: UpdArtifactResult = await this.updArtifact.update(request as UpdArtifactParams)
            if (isOk instanceof Error) return badRequest(isOk)
            return ok(isOk)    
        } catch (error) {
            return serverError(error as Error)
        }
        
    }
}
export namespace UpdArtifactController {
    export type Request = {
        userid?: string
        dtAdded?: string
        level?: number
        substats?: SubStatSlot[]
    }
}