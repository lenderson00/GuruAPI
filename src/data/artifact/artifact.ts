import { AddArtifactParams } from "../../domain/artifact/usecases/add-artifact";
import { mainStatValues } from "./chances";
import { Level, MainStat, Set, SubStat, Type } from "./enums";

export class Artifact {
    private _set: Set;
    private _type: Type;
    private _level: Level;
    private _mainstat: MainStat;
    private _mainstatValue: undefined|number = undefined;
    private _substats: { substat: SubStat; value: number; }[];
    
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

}