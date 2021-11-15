import { DelArtifactRepo } from "../../data/artifact/protocols/del-artifact-repo";
import { DelArtifactParams } from "../../domain/artifact/usecases/crud-artifact";
import { MissingParamError } from "../errors";
import { badRequest, ok } from "../helpers/http-helper";
import { Controller, HttpResponse } from "../protocols";

export class DelArtifactController implements Controller {
    /* private readonly delArtifactRepo: delArtifactRepo */

    constructor (/* delArtifactRepo: DelArtifactRepo */) {
        /* this.delArtifactRepo = delArtifactRepo; */
    }

    async handle (req: Request): Promise<HttpResponse> {
        if (!req.params.id) return badRequest(new MissingParamError('id'))
        return ok(true)
    }
}

export interface Request { params: { id?: string } }