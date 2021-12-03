/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Character } from "../../data/character/character";
import { UpdArtifact, UpdArtifactParams, UpdArtifactResult } from "../../domain/artifact/usecases/crud-artifact";
import { RequiredFieldValidation } from "../../validation/validators";
import { isArtifactLevelValidation, isArtifactMainStatValidation, isArtifactSetValidation, isArtifactSubStatValidation, isArtifactTypeValidation } from "../../validation/validators/is-part-validation";
import { badRequest, ok } from "../helpers";
import { Controller, HttpResponse } from "../protocols";

export class UpdArtifactController implements Controller {
    private readonly updArtifact: UpdArtifact

    constructor (updArtifact: UpdArtifact) {
        this.updArtifact = updArtifact
    }

    async handle (request: Request): Promise<HttpResponse> {
        
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
        if (request.substats) {
            request.substats.forEach(sub => {
                error = (new isArtifactSubStatValidation).validate(sub)
                if (error) return badRequest(error)
            })
        }

        const isOk: UpdArtifactResult = await this.updArtifact.update(request as UpdArtifactParams)
        if (isOk instanceof Error) return badRequest(isOk)
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
    char?: Character
}