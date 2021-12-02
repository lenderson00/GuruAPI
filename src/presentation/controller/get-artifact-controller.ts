import { GetArtifact, GetArtifactResults } from "../../domain/artifact/usecases/crud-artifact";
import { InvalidParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import { Controller, HttpResponse, Validation } from "../protocols";

export class GetArtifactController implements Controller {
    private readonly getArtifact: GetArtifact
    private readonly validation: Validation

    constructor (getArtifact: GetArtifact, validation: Validation) {
        this.getArtifact = getArtifact;
        this.validation = validation
    }

    async handle (req: Request): Promise<HttpResponse> {
        try {
            const validationError = this.validation.validate(req)
            if (validationError) return badRequest(validationError)
            const ids = req.ids!
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