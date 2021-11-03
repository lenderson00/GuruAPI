import { Controller } from "../protocols/controller";
import { HttpResponse } from "../protocols/http";

export class AddArtifactController implements Controller {
    handle (request: Request): HttpResponse {
        return {
            statusCode: 400,
            body: null
        };
    }
}

export type Request = {
    set: string
    type: string
    level: number
    mainstat: string
    substats: {substat: string, value: number}[]
}