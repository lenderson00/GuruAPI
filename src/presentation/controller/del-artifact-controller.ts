import { DelArtifactRepo, DelArtifactRepoResult } from "../../data/artifact/protocols/del-artifact-repo";
import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import { Controller, HttpResponse } from "../protocols";

export class DelArtifactController implements Controller {
    private readonly delArtifactRepo: DelArtifactRepo

    constructor (delArtifactRepo: DelArtifactRepo) {
        this.delArtifactRepo = delArtifactRepo;
        console.log('Criou o DelController')
    }

    async handle (req: Request): Promise<HttpResponse> {
        try {
            const { id } = req
            if (!id) return badRequest(new MissingParamError('id'))
            const isOK: DelArtifactRepoResult = await this.delArtifactRepo.del(id)
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