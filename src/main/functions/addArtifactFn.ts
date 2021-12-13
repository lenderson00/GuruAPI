import { HttpResponse } from "../../presentation/protocols";
import { makeAddArtifactController } from "../factories/controller/artifact";

export const handler = async (event: any, context: any, callback: any): Promise<HttpResponse> => {
    const func = makeAddArtifactController()
    const result = func.handle(event)
    return result
}
