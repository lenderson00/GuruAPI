import { GetArtifact, GetArtifactResults } from "../../domain/artifact/usecases/crud-artifact";
import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import { Controller, HttpResponse } from "../protocols";

export class GetArtifactController implements Controller {
    private readonly getArtifact: GetArtifact

    constructor (getArtifact: GetArtifact) {
        this.getArtifact = getArtifact;
    }

    async handle (req: Request): Promise<HttpResponse> {
        try {
            const { ids } = req
            if (!ids) return badRequest(new MissingParamError('ids'))
            const result: GetArtifactResults = await this.getArtifact.get({ids})
            if (result.found.length === 0) return badRequest(new InvalidParamError('ids'))
            return ok(result)
        } catch (error) {
            return serverError(error as Error)
        }
    }
}

export type Request = {
    ids?: string[]
}