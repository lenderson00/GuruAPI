import { MissingParamError } from "../errors";
import { badRequest } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpResponse } from "../protocols/http";

export class AddArtifactController implements Controller {
    handle (request: Request): HttpResponse {
        
        const requiredFields: Array<keyof Request["body"]>  = ['set', 'type', 'level', 'mainstat', 'substats']
        for (const field of requiredFields) {
            if (!request.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
              
        return {
            statusCode: 200,
            body: null
        };
    }
}

export interface Request {
    body: {
        set?: string
        type?: string
        level?: number
        mainstat?: string
        substats?: {substat: string, value: number}[]
    }
}