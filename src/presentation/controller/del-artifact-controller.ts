/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DelArtifactRepo, DelArtifactRepoResult } from "../../data/artifact/protocols/del-artifact-repo";
import { InvalidParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import { Controller, HttpResponse, Validation } from "../protocols";

export class DelArtifactController implements Controller {
    private readonly delArtifactRepo: DelArtifactRepo
    private readonly validation: Validation

    constructor (delArtifactRepo: DelArtifactRepo, validation: Validation) {
        this.delArtifactRepo = delArtifactRepo;
        this.validation = validation
    }

    async handle (req: Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(req)
            if (error) return badRequest(error)
            const { id } = req
            const isOK: DelArtifactRepoResult = await this.delArtifactRepo.del(id!)
            if (!isOK) return badRequest(new InvalidParamError('id'))
            return ok(true)
        } catch (error) {
            return serverError(error as Error)
        }
    }
}

export type Request = {
    id?: string
}