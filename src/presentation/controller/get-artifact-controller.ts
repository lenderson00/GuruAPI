import { GetArtifact, GetArtifactResult } from "../../domain/artifact/usecases/crud-artifact";
import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import { Controller, HttpResponse } from "../protocols";
import _ from "lodash/fp";

export class GetArtifactController implements Controller {
    private readonly getArtifact: GetArtifact

    constructor (getArtifact: GetArtifact) {
        this.getArtifact = getArtifact;
    }

    async handle (req: Request): Promise<HttpResponse> {
        try {
            const { id } = req
            if (!id) return badRequest(new MissingParamError('id'))
            const result: GetArtifactResult = await this.getArtifact.get({id})
            if (_.isEmpty(result)) return badRequest(new InvalidParamError('id'))
            return ok(result)
        } catch (error) {
            return serverError(error as Error)
        }
    }
}

export type Request = {
    id?: string
}