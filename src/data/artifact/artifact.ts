import { AddArtifactParams } from "../../domain/artifact/usecases/add-artifact";
import { mainStatValues, upgradeTiers } from "./chances";
import { Level, MainStat, Set, SubStat, Type } from "./enums";
import { dfltWeights, ScoreWeightMap } from "./scoring";

export class Artifact {
    private _set: Set;
    private _type: Type;
    private _level: Level;
    private _mainstat: MainStat;
    private _mainstatValue: undefined|number = undefined;
    private _substats: { substat: SubStat; value: number; }[];

    private _scoreWeights: ScoreWeightMap = dfltWeights;
    private _score: number | undefined;
    private _scoreMainstat: number | undefined;
    private _scoreSubstats: number | undefined;
    
    constructor (params: AddArtifactParams) {
        this._set = params.set
        this._type = params.type
        this._level = params.level
        this._mainstat = params.mainstat
        this._substats = params.substats
    }

    // GETTERS AND SETTERS
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
        if (this._mainstatValue) return this._mainstatValue;
        return Math.round((this._level/20)*(mainStatValues[this._mainstat][1]-mainStatValues[this._mainstat][0]) - mainStatValues[this._mainstat][0])
    }
    public set mainstatValue(value: number) {
        this._mainstatValue = value;
        this._level = Math.round(20*(value-mainStatValues[this._mainstat][0]/(mainStatValues[this._mainstat][1]-mainStatValues[this._mainstat][0]))) as Level
    }
    public get substats(): { substat: SubStat; value: number; }[] {
        return this._substats;
    }
    public set substats(value: { substat: SubStat; value: number; }[]) {
        this._substats = value;
    }
    public get scoreWeights(): ScoreWeightMap {
        return this._scoreWeights;
    }
    public set scoreWeights(value: ScoreWeightMap) {
        this._scoreWeights = value;
    }
    public get score(): number {
        if (this._score) return this._score;
        this._score = this.scoreMainstat + this.scoreSubstats
        return this._score
    }
    public set score(value: number) {
        this._score = value;
    }
    private get scoreMainstat(): number {
        if (this._scoreMainstat) return this._scoreMainstat;
        this._scoreMainstat = this._scoreWeights.mainStatWeight[this._mainstat] * this.mainstatValue / mainStatValues[this._mainstat][1]
        return this._scoreMainstat;
    }
    private set scoreMainstat(value: number) {
        this._scoreMainstat = value;
    }
    private get scoreSubstats(): number {
        if (this._scoreSubstats) return this._scoreSubstats;
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