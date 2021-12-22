import { SubStatSlot } from "../../data/artifact/utils/enums";
import { UpdArtifact, UpdArtifactParams, UpdArtifactResult } from "../../domain/artifact/usecases/crud-artifact";
import { RequiredFieldValidation } from "../../validation/validators";
import { isArtifactLevelValidation, isArtifactSubStatValidation } from "../../validation/validators/is-part-validation";
import { badRequest, ok, serverError } from "../helpers";
import { Controller, HttpResponse, Validation } from "../protocols";

export class UpdArtifactController implements Controller {

    constructor (private readonly updArtifact: UpdArtifact, private readonly validation: Validation) {}

    async handle (request: Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request)
            if (error) return badRequest(error)

            /* let error = (new RequiredFieldValidation('userid')).validate(request)
            if (error) return badRequest(error)
            error = (new RequiredFieldValidation('dtAdded')).validate(request)
            if (error) return badRequest(error)
            if (request.level) error = error || (new isArtifactLevelValidation).validate(request)
            if (error) return badRequest(error)
            if (request.substats !== undefined) error = error || (new isArtifactSubStatValidation).validate(request as Record<string,any>)
            if (error) return badRequest(error) */
    
            const isOk: UpdArtifactResult = await this.updArtifact.update(request as UpdArtifactParams)
            if (isOk instanceof Error) return badRequest(isOk)
            return ok(isOk)    
        } catch (error) {
            return serverError(error as Error)
        }
        
    }
}

export interface Request {
    userid?: string
    dtAdded?: string
    level?: number
    substats?: SubStatSlot[]
}