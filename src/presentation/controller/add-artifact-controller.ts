/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { allLevels, allowedMainStats, allowedSubStats, allSets, allTypes } from "../../data/artifact/combinations";
import { Level, MainStat, Set, SubStat, Type } from "../../data/artifact/enums";
import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, ok } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpResponse } from "../protocols/http";
import substatsValues from "../../data/artifact/gen-substat-values-possibilities.json"
import { AddArtifact, AddArtifactParams, AddArtifactResult } from "../../domain/artifact/usecases/add-artifact"
export class AddArtifactController implements Controller {
    private readonly addArtifact: AddArtifact
    
    constructor (addArtifact: AddArtifact) {
        this.addArtifact = addArtifact
    }
    
    async handle (request: Request): Promise<HttpResponse> {
        
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

        // TS workaround to allow for substat values indexing
        const sv: { [key: string]: { [key2: number|string]: any} } = substatsValues;
        let rolls = 0;

        for (const sub of request.body.substats!) {
            if (!allowedSubStats[request.body.mainstat as MainStat].includes(sub.substat as SubStat)) return badRequest(new InvalidParamError(`substat: ${sub.substat}`))
            let found: number|undefined = undefined;
            rollLoop: for (let i = 1; i < 7; i++) {
                found = sv[sub.substat][i].includes(sub.value) || found
                if (found) {
                    rolls += i-1;
                    break rollLoop;
                }
            }
            if (!found) return badRequest(new InvalidParamError(`substat value: ${sub.substat}`))
        }
        if (rolls > 5) {
            return badRequest(new InvalidParamError(`Invalid # of rolls: ${rolls}`));
        }
        
        const isOk: AddArtifactResult = await this.addArtifact.add(request.body as AddArtifactParams);
        return ok(isOk);
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