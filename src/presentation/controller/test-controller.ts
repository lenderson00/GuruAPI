import { Controller, HttpResponse } from "../protocols"

export class TestController implements Controller {

    async handle (req: Request): Promise<HttpResponse> {
        console.log(req)
        return {statusCode: 200, body: {...(req)}}
    }
}

export type Request = { params: { id: string } }