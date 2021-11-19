import { GetArtifact } from "../../domain/artifact/usecases/crud-artifact";
import { MissingParamError } from "../errors";
import { badRequest } from "../helpers/http-helper";
import { Controller, HttpResponse } from "../protocols";

export class GetArtifactController implements Controller {
    private readonly getArtifact: GetArtifact

    constructor (getArtifact: GetArtifact) {
        this.getArtifact = getArtifact;
    }

    async handle (req: Request): Promise<HttpResponse> {
        return badRequest(new MissingParamError('id'))
    }
}

export type Request = {
    id?: string
}