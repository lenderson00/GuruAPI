import { upgradeTiers } from "../../data/artifact/chances";
import { allLevels, allowedMainStats, allowedSubStats, allSets, allTypes } from "../../data/artifact/combinations";
import { Level, MainStat, Set, SubStat, SubStats, Type } from "../../data/artifact/enums";
import { InvalidParamError, MissingParamError } from "../errors";
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
        
        if (!allSets.includes(request.body.set as Set)) return badRequest(new InvalidParamError('set'))
        if (!allTypes.includes(request.body.type as Type)) return badRequest(new InvalidParamError('type'))
        if (!allLevels.includes(request.body.level as Level)) return badRequest(new InvalidParamError('level'))
        if (!allowedMainStats[request.body.type as Type].includes(request.body.mainstat as never)) return badRequest(new InvalidParamError('mainstat'))
        if (request.body.substats!.length > 4) return badRequest(new InvalidParamError('# of substats'))

        for (const sub of request.body.substats!) {
            if (!allowedSubStats[request.body.mainstat as MainStat].includes(sub.substat as SubStat)) return badRequest(new InvalidParamError('substats'))
            if (!upgradeTiers[sub.substat as SubStat].includes(sub.value)) return badRequest(new InvalidParamError('substat value'))
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