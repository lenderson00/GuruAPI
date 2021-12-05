import { AddArtifactParams } from "../../../domain/artifact/usecases/crud-artifact";
import { mainStatValues, upgradeTiers } from "./chances";
import { Level, MainStat, Set, SubStat, Type } from "./enums";
import { AddArtifactRepoParams } from "../protocols/add-artifact-repo";
import { dfltWeights, ScoreWeightMap } from "./scoring";
import { GetArtifactRepoResult, UpdArtifactRepoParams } from "../protocols";

export class Artifact {
    private _id: string | undefined;
    private _set: Set;
    private _type: Type;
    private _level: Level;
    private _mainstat: MainStat;
    private _mainstatValue: undefined|number = undefined;
    private _substats: { substat: SubStat; value: number; }[];

    private _scoreWeights: ScoreWeightMap = dfltWeights;
    private _scoreDfltWeights: ScoreWeightMap = dfltWeights;
    private _scoreDflt: number | undefined;
    private _scoreDfltMainstat: number | undefined;
    private _scoreDfltSubstats: number | undefined;
    private _score: number | undefined;
    private _scoreMainstat: number | undefined;
    private _scoreSubstats: number | undefined;
    
    constructor (params: GetArtifactRepoResult)
    constructor (params: AddArtifactParams)
    constructor (params: any) {
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

    public async createRepoData (): Promise<AddArtifactRepoParams> {
        const date = new Date
        return {
            set: this.set,
            type: this.type,
            level: this.level,
            mainstat: this.mainstat,
            mainstatValue: this.mainstatValue,
            substats: this.substats,
            scoreDflt: this.score,
            scoreDfltMainstat: this.scoreMainstat,
            scoreDfltSubstats: this.scoreSubstats,
            scoreDfltLvl20Min: 0, // TO DO
            scoreDfltLvl20Avg: 0, // TO DO
            scoreDfltLvl20Max: 0, // TO DO
            scoreDfltLvl20SD: 0, // TO DO
            dtAdded: date.toUTCString(),
            dtModified: date.toUTCString(),
        }
    }

    public async updateRepoData (): Promise<UpdArtifactRepoParams> {
        const date = new Date
        if (this.id) {
            return {
                id: this.id,
                level: this.level,
                mainstatValue: this.mainstatValue,
                substats: this.substats,
                scoreDflt: this.scoreDflt,
                scoreDfltMainstat: this.scoreDfltMainstat,
                scoreDfltSubstats: this.scoreDfltSubstats,
                scoreDfltLvl20Min: 0, // TO DO
                scoreDfltLvl20Avg: 0, // TO DO
                scoreDfltLvl20Max: 0, // TO DO
                scoreDfltLvl20SD: 0, // TO DO
                dtModified: date.toUTCString(),
            }
        } else {
            throw(new Error('Missing Artifact ID'))
        }        
    }

    // GETTERS AND SETTERS
    public get id(): string|undefined {
        return this._id;
    }
    public set id(value: string|undefined) {
        this._id = value;
    }
    public get set(): Set {
        return this._set;
    }
    public set set(value: Set) {
        this._set = value;
    }
    public get type(): Type {
        return this._type;
    }
    public set type(value: Type) {
        this._type = value;
    }
    public get level(): Level {
        return this._level;
    }
    public set level(value: Level) {
        this._level = value;
    }
    public get mainstat(): MainStat {
        return this._mainstat;
    }
    public set mainstat(value: MainStat) {
        this._mainstat = value;
    }
    public get mainstatValue(): number {
        return (this._level/20)*(mainStatValues[this._mainstat][1]-mainStatValues[this._mainstat][0])+mainStatValues[this._mainstat][0]
    }
    public set mainstatValue(value: number) {
        this._mainstatValue = value;
        // ADJUST LEVEL BASED ON VALUE
        this._level = Math.round(20*(value-mainStatValues[this._mainstat][0])/(mainStatValues[this._mainstat][1]-mainStatValues[this._mainstat][0])) as Level
    }
    public get substats(): { substat: SubStat; value: number; }[] {
        return this._substats;
    }
    public set substats(value: { substat: SubStat; value: number; }[]) {
        this._substats = value;
    }

    public get scoreDfltWeights(): ScoreWeightMap {
        return this._scoreDfltWeights;
    }
    public set scoreDfltWeights(value: ScoreWeightMap) {
        this._scoreDfltWeights = value;
    }
    public get scoreDflt(): number {
        this._scoreDflt = this.scoreDfltMainstat + this.scoreDfltSubstats
        return this._scoreDflt
    }
    public set scoreDflt(value: number) {
        this._scoreDflt = value;
    }
    public get scoreDfltMainstat(): number {
        this._scoreDfltMainstat = this._scoreWeights.mainStatWeight[this._mainstat] * this.mainstatValue / mainStatValues[this._mainstat][1]
        return this._scoreDfltMainstat;
    }
    private set scoreDfltMainstat(value: number) {
        this._scoreDfltMainstat = value;
    }
    public get scoreDfltSubstats(): number {
        let sumWeight = 0
        this._substats.forEach((sub) => {
            sumWeight += this._scoreDfltWeights.subStatWeight[sub.substat] * sub.value / upgradeTiers[sub.substat][3]
        })
        this._scoreDfltSubstats = sumWeight
        return this._scoreDfltSubstats;
    }
    private set scoreDfltSubstats(value: number) {
        this._scoreDfltSubstats = value;
    }
    
    public get scoreWeights(): ScoreWeightMap {
        return this._scoreWeights;
    }
    public set scoreWeights(value: ScoreWeightMap) {
        this._scoreWeights = value;
    }
    public get score(): number {
        this._score = this.scoreMainstat + this.scoreSubstats
        return this._score
    }
    public set score(value: number) {
        this._score = value;
    }
    public get scoreMainstat(): number {
        this._scoreMainstat = this._scoreWeights.mainStatWeight[this._mainstat] * this.mainstatValue / mainStatValues[this._mainstat][1]
        return this._scoreMainstat;
    }
    private set scoreMainstat(value: number) {
        this._scoreMainstat = value;
    }
    public get scoreSubstats(): number {
        let sumWeight = 0
        this._substats.forEach((sub) => {
            sumWeight += this._scoreWeights.subStatWeight[sub.substat] * sub.value / upgradeTiers[sub.substat][3]
        })
        this._scoreSubstats = sumWeight
        return this._scoreSubstats;
    }
    private set scoreSubstats(value: number) {
        this._scoreSubstats = value;
    }

}