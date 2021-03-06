/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ArtifactKey, GetArtifact, GetArtifactResults } from "../../domain/artifact/usecases/crud-artifact";
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
            let validationError: Error | null = null
            req.keys?.forEach(key => {
                validationError = validationError || this.validation.validate(key)
            })
            if (validationError) return badRequest(validationError)
            const keys = req.keys!
            const result: GetArtifactResults = await this.getArtifact.get({keys: keys})
            if (result.found.length === 0) return badRequest(new InvalidParamError('date added'))
            return ok(result)
        } catch (error) {
            return serverError(error as Error)
        }
    }
}

export type Request = {
    keys?: ArtifactKey[]
}