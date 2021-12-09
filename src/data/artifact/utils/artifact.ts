/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AddArtifactParams } from "../../../domain/artifact/usecases/crud-artifact";
import { mainRoundDecimal, mainStatValues, subsRoundDecimal, upgradeTiers } from "./chances";
import { Level, MainStat, Set, SubStatSlot, Type } from "./enums";
import { AddArtifactRepoParams } from "../protocols/add-artifact-repo";
import { dfltWeights, ScoreWeightMap } from "./scoring";
import { GetArtifactRepoResult, UpdArtifactRepoParams } from "../protocols";
import { MissingParamError } from "../../../presentation/errors";
import { ValidationComposite } from "../../../validation/validators";

export class Artifact {
    private _id: string | undefined = undefined;
    private _set: Set | undefined = undefined;
    private _type: Type | undefined = undefined;
    private _level: Level | undefined = undefined;
    private _mainstat: MainStat | undefined = undefined;
    private _mainstatValue: undefined|number = undefined;
    private _substats: SubStatSlot[] | undefined = undefined;

    private _scoreWeights: ScoreWeightMap = dfltWeights;
    private _scoreDfltWeights: ScoreWeightMap = dfltWeights;
    private _scoreDflt: number | undefined = undefined;
    private _scoreDfltMainstat: number | undefined = undefined;
    private _scoreDfltSubstats: number | undefined = undefined;
    private _score: number | undefined = undefined;
    private _scoreMainstat: number | undefined = undefined;
    private _scoreSubstats: number | undefined = undefined;
    
    public import (params: GetArtifactRepoResult): void
    public import (params: AddArtifactParams): void
    public import (params: any): void {
        if (params.id) {
            this._id = params.id
            this._mainstatValue = params.mainstatValue
            this._scoreDflt = params.scoreDflt
        }
        this._set = params.set
        this._type = params.type
        this._level = params.level
        this._mainstat = params.mainstat
        this._substats = params.substats
    }

    public validate (validation: ValidationComposite): Error | null {
        const inInvalid = validation.validate(this)
        return inInvalid
    }

    public async createRepoData (): Promise<AddArtifactRepoParams> {
        const date = new Date
        let repoData: AddArtifactRepoParams
        let missingParam: string
        if (this.set != undefined) { 
        if (this.type != undefined) { 
        if (this.level != undefined) { 
        if (this.mainstat != undefined) {
        if (this.substats != undefined) {
             repoData = {
                set: this.set,
                type: this.type,
                level: this.level,
                mainstat: this.mainstat,
                mainstatValue: this.mainstatValue!,
                substats: this.substats,
                scoreDflt: this.scoreDflt!,
                scoreDfltMainstat: this.scoreDfltMainstat!,
                scoreDfltSubstats: this.scoreDfltSubstats!,
                scoreDfltLvl20Min: 0, // TO DO
                scoreDfltLvl20Avg: 0, // TO DO
                scoreDfltLvl20Max: 0, // TO DO
                scoreDfltLvl20SD: 0, // TO DO
                dtAdded: date.toUTCString(),
                dtModified: date.toUTCString(),
            }
            return repoData
        } else missingParam = 'substat'
        } else missingParam = 'mainstat'
        } else missingParam = 'level'
        } else missingParam = 'type'
        } else missingParam = 'set'
        throw new MissingParamError(missingParam)
    }

    public async updateRepoData (): Promise<UpdArtifactRepoParams> {
        const date = new Date
        let repoData: UpdArtifactRepoParams
        let missingParam: string
        if (this.id != undefined) { 
        if (this.level != undefined) { 
        if (this.mainstatValue != undefined) { 
        if (this.substats != undefined) { 
            repoData = {
                id: this.id,
                level: this.level,
                mainstatValue: this.mainstatValue,
                substats: this.substats,
                scoreDflt: this.scoreDflt!,
                scoreDfltMainstat: this.scoreDfltMainstat!,
                scoreDfltSubstats: this.scoreDfltSubstats!,
                scoreDfltLvl20Min: 0, // TO DO
                scoreDfltLvl20Avg: 0, // TO DO
                scoreDfltLvl20Max: 0, // TO DO
                scoreDfltLvl20SD: 0, // TO DO
                dtModified: date.toUTCString(),
            }
            return repoData
        } else missingParam = 'substats'
        } else missingParam = 'mainstat value'
        } else missingParam = 'level'
        } else missingParam = 'id'
        throw new MissingParamError(missingParam)   
    }

    // GETTERS AND SETTERS
    public get id(): string|undefined {
        return this._id;
    }
    public set id(value: string|undefined) {
        this._id = value;
    }
    public get set(): Set | undefined {
        return this._set;
    }
    public set set(value: Set | undefined) {
        this._set = value;
    }
    public get type(): Type | undefined {
        return this._type;
    }
    public set type(value: Type | undefined) {
        this._type = value;
    }
    public get level(): Level | undefined {
        return this._level;
    }
    public set level(value: Level | undefined) {
        this._level = value;
        if (this._mainstat != undefined && this._level != undefined)
        this._mainstatValue = this._level * (mainStatValues[this._mainstat][1]-mainStatValues[this._mainstat][0]) / 20 + mainStatValues[this._mainstat][0]
    }
    public get mainstat(): MainStat | undefined {
        return this._mainstat;
    }
    public set mainstat(value: MainStat | undefined) {
        this._mainstat = value;
    }
    public get mainstatValue(): number | undefined {
        let result = undefined
        if (this._level != undefined && this._mainstat != undefined) {
            result = Math.round(((this._level/20)*(mainStatValues[this._mainstat][1]-mainStatValues[this._mainstat][0])+mainStatValues[this._mainstat][0]) * (mainRoundDecimal[this._mainstat] ? 10 : 1)) / (mainRoundDecimal[this._mainstat] ? 10 : 1)
        }
        this.mainstatValue = result
        return result
    }
    public set mainstatValue(value: number | undefined) {
        this._mainstatValue = value;
        // ADJUST LEVEL BASED ON VALUE
        if (this._mainstat != undefined && this._level != undefined && value != undefined)
        this._level = Math.round(20*(value-mainStatValues[this._mainstat][0])/(mainStatValues[this._mainstat][1]-mainStatValues[this._mainstat][0])) as Level
    }
    public get substats(): SubStatSlot[] | undefined {
        const result: SubStatSlot[] = []
        this._substats?.forEach(sub => {
            result.push({ substat: sub.substat, value: Math.round(sub.value * (subsRoundDecimal[sub.substat] ? 10 : 1)) / (subsRoundDecimal[sub.substat] ? 10 : 1) })
        })
        return result;
    }
    public set substats(value: SubStatSlot[] | undefined) {
        this._substats = value;
    }

    public get scoreDfltWeights(): ScoreWeightMap {
        return this._scoreDfltWeights;
    }
    public set scoreDfltWeights(value: ScoreWeightMap) {
        this._scoreDfltWeights = value;
    }
    public get scoreDflt(): number | undefined {
        if (this.scoreDfltMainstat != undefined && this.scoreDfltSubstats != undefined) {
            this._scoreDflt = this.scoreDfltMainstat + this.scoreDfltSubstats
            return this._scoreDflt
        } else return undefined
    }
    public set scoreDflt(value: number | undefined) {
        this._scoreDflt = value;
    }
    public get scoreDfltMainstat(): number | undefined {
        if (this._mainstat != undefined && this._mainstatValue != undefined) {
            this._scoreDfltMainstat = this._scoreWeights.mainStatWeight[this._mainstat] * this._mainstatValue / mainStatValues[this._mainstat][1]
            return this._scoreDfltMainstat;
        } else return undefined
    }
    private set scoreDfltMainstat(value: number | undefined) {
        this._scoreDfltMainstat = value;
    }
    public get scoreDfltSubstats(): number | undefined {
        if (this._substats) {
            let sumWeight = 0
            this._substats.forEach((sub) => {
                sumWeight += this._scoreDfltWeights.subStatWeight[sub.substat] * sub.value / upgradeTiers[sub.substat][3]
            })
            this._scoreDfltSubstats = sumWeight
            return this._scoreDfltSubstats;
        } else return undefined
    }
    private set scoreDfltSubstats(value: number | undefined) {
        this._scoreDfltSubstats = value;
    }
    
    public get scoreWeights(): ScoreWeightMap {
        return this._scoreWeights;
    }
    public set scoreWeights(value: ScoreWeightMap) {
        this._scoreWeights = value;
    }
    public get score(): number | undefined {
        if (this.scoreMainstat != undefined && this.scoreSubstats != undefined) {
            this._score = this.scoreMainstat + this.scoreSubstats
            return this._score
        } else return undefined
    }
    public set score(value: number | undefined) {
        this._score = value;
    }
    public get scoreMainstat(): number | undefined {
        if (this._mainstat != undefined && this._mainstatValue != undefined) {
            this._scoreMainstat = this._scoreWeights.mainStatWeight[this._mainstat] * this._mainstatValue / mainStatValues[this._mainstat][1]
            return this._scoreMainstat;
        } else return undefined
    }
    private set scoreMainstat(value: number | undefined) {
        this._scoreMainstat = value;
    }
    public get scoreSubstats(): number | undefined {
        if (this._substats) {
            let sumWeight = 0
            this._substats.forEach((sub) => {
                sumWeight += this._scoreWeights.subStatWeight[sub.substat] * sub.value / upgradeTiers[sub.substat][3]
            })
            this._scoreSubstats = sumWeight
            return this._scoreSubstats;
        } else return undefined
    }
    private set scoreSubstats(value: number | undefined) {
        this._scoreSubstats = value;
    }
}