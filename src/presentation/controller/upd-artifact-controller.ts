/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SubStat } from "../../data/artifact/utils/enums";
import { Character } from "../../data/character/character";
import { UpdArtifact, UpdArtifactParams, UpdArtifactResult } from "../../domain/artifact/usecases/crud-artifact";
import { RequiredFieldValidation } from "../../validation/validators";
import { isArtifactLevelValidation, isArtifactMainStatValidation, isArtifactSetValidation, isArtifactSubStatValidation, isArtifactTypeValidation } from "../../validation/validators/is-part-validation";
import { badRequest, ok, serverError } from "../helpers";
import { Controller, HttpResponse } from "../protocols";

export class UpdArtifactController implements Controller {
    private readonly updArtifact: UpdArtifact

    constructor (updArtifact: UpdArtifact) {
        this.updArtifact = updArtifact
    }

    async handle (request: Request): Promise<HttpResponse> {
        try {
            let error = (new RequiredFieldValidation('id')).validate(request)
            if (error) return badRequest(error)
            if (request.set) error = (new isArtifactSetValidation).validate(request)
            if (error) return badRequest(error)
            if (request.type) error = (new isArtifactTypeValidation).validate(request)
            if (error) return badRequest(error)
            if (request.level) error = (new isArtifactLevelValidation).validate(request)
            if (error) return badRequest(error)
            if (request.mainstat) error = (new isArtifactMainStatValidation).validate(request)
            if (error) return badRequest(error)
            if (request.substats)
                request.substats.forEach(sub => {
                    error = error || (new isArtifactSubStatValidation).validate({ substats: [sub]})
                })
            if (error) return badRequest(error)
    
            const isOk: UpdArtifactResult = await this.updArtifact.update(request as UpdArtifactParams)
            if (isOk instanceof Error) return badRequest(isOk)
            return ok(isOk)    
        } catch (error) {
            return serverError(error as Error)
        }
        
    }
}

export interface Request {
    id?: string
    set?: string
    type?: string
    level?: number
    mainstat?: string
    substats?: {substat: SubStat, value: number}[]
    char?: Character
}