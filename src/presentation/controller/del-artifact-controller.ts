import { DelArtifactRepo, DelArtifactRepoResult } from "../../data/artifact/protocols/del-artifact-repo";
import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, ok } from "../helpers/http-helper";
import { Controller, HttpResponse } from "../protocols";

export class DelArtifactController implements Controller {
    private readonly delArtifactRepo: DelArtifactRepo

    constructor (delArtifactRepo: DelArtifactRepo) {
        this.delArtifactRepo = delArtifactRepo;
    }

    async handle (req: Request): Promise<HttpResponse> {
        if (!req.params.id) return badRequest(new MissingParamError('id'))
        const isOK: DelArtifactRepoResult = await this.delArtifactRepo.del({ id: req.params.id })
        if (!isOK) return badRequest(new InvalidParamError('id'))
        return ok(true)
    }
}

export interface Request { params: { id?: string } }