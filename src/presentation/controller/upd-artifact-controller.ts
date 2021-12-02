/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Character } from "../../data/character/character";
import { GetArtifact, GetArtifactResults, UpdArtifact, UpdArtifactParams, UpdArtifactResult } from "../../domain/artifact/usecases/crud-artifact";
import { badRequest, ok } from "../helpers";
import { Controller, HttpResponse, Validation } from "../protocols";

export class UpdArtifactController implements Controller {
    private readonly updArtifact: UpdArtifact
    private readonly getArtifact: GetArtifact
    private readonly validation: Validation

    constructor (updArtifact: UpdArtifact, getArtifact: GetArtifact, validation: Validation) {
        this.updArtifact = updArtifact
        this.getArtifact = getArtifact;
        this.validation = validation
    }

    async handle (request: Request): Promise<HttpResponse> {
        const error = this.validation.validate(request)
        if (error) return badRequest(error)
        const asisArtifact: GetArtifactResults = await this.getArtifact.get({ids: [request.id!]})
        const isOk: UpdArtifactResult = await this.updArtifact.update(request as UpdArtifactParams)
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