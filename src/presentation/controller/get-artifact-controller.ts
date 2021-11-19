import { GetArtifact, GetArtifactResult } from "../../domain/artifact/usecases/crud-artifact";
import { MissingParamError } from "../errors";
import { badRequest, ok } from "../helpers/http-helper";
import { Controller, HttpResponse } from "../protocols";

export class GetArtifactController implements Controller {
    private readonly getArtifact: GetArtifact

    constructor (getArtifact: GetArtifact) {
        this.getArtifact = getArtifact;
    }

    async handle (req: Request): Promise<HttpResponse> {
        const { id } = req
        if (!id) return badRequest(new MissingParamError('id'))
        const result: GetArtifactResult = await this.getArtifact.get({id})
        return ok(result)
    }
}

export type Request = {
    id?: string
}