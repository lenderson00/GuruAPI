/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { allLevels, allowedMainStats, allowedSubStats, allSets, allTypes } from "../../data/artifact/utils/combinations";
import { Level, MainStat, Set, SubStat, Type } from "../../data/artifact/utils/enums";
import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, ok } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpResponse } from "../protocols/http";
import substatsValues from "../../data/artifact/utils/gen-substat-values-possibilities.json"
import { AddArtifact, AddArtifactParams, AddArtifactResult } from "../../domain/artifact/usecases/crud-artifact"
import { Validation } from "../protocols";
export class AddArtifactController implements Controller {
    private readonly addArtifact: AddArtifact
    private readonly validation: Validation
    
    constructor (addArtifact: AddArtifact, validation: Validation) {
        this.addArtifact = addArtifact
        this.validation = validation
    }
    
    async handle (request: Request): Promise<HttpResponse> {

        const error = this.validation.validate(request)
        if (error) return badRequest(error)
        
        if (!allSets.includes(request.set as Set)) return badRequest(new InvalidParamError('set'))
        if (!allTypes.includes(request.type as Type)) return badRequest(new InvalidParamError('type'))
        if (!allLevels.includes(request.level as Level)) return badRequest(new InvalidParamError('level'))
        if (!allowedMainStats[request.type as Type].includes(request.mainstat as never)) return badRequest(new InvalidParamError('mainstat'))
        if (request.substats!.length > 4) return badRequest(new InvalidParamError('# of substats'))

        // TS workaround to allow for substat values indexing
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sv: { [key: string]: { [key2: number|string]: any} } = substatsValues;
        let rolls = 0;

        for (const sub of request.substats!) {
            if (!allowedSubStats[request.mainstat as MainStat].includes(sub.substat as SubStat)) return badRequest(new InvalidParamError(`substat: ${sub.substat}`))
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
        const isOk: AddArtifactResult = await this.addArtifact.add(request as AddArtifactParams);
        return ok(isOk);
    }
    
}
export interface Request {
    set?: string
    type?: string
    level?: number
    mainstat?: string
    substats?: {substat: string, value: number}[]
}