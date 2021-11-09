import { SubStats, Stats, MainStats } from "./enums";

export type MainWeightMap = {
    [mainstat in MainStats]: number;
};

export type SubWeightMap = Record<SubStats, number>

export type ScoreWeightMap = {
    mainStatWeight: MainWeightMap,
    subStatWeight: SubWeightMap
};

export const dfltMainStatWeights: MainWeightMap = {
    [Stats.HPFlat]: 85,
    [Stats.HP]: 96,
    [Stats.ATKFlat]: 361,
    [Stats.ATK]: 482,
    [Stats.DEF]: 96,
    [Stats.CR]: 797,
    [Stats.CD]: 797,
    [Stats.ER]: 398,
    [Stats.EM]: 244,
    [Stats.HB]: 500,
    [Stats.Pyro]: 1400,
    [Stats.Electro]: 1400,
    [Stats.Cryo]: 1400,
    [Stats.Hydro]: 1400,
    [Stats.Anemo]: 1400,
    [Stats.Geo]: 1400,
    //[Stats.Dendro]: 1400,
    [Stats.Physical]: 1400,
};

export const dfltSubStatWeights: SubWeightMap = {
    [Stats.HPFlat]: 5,
    [Stats.HP]: 12,
    [Stats.ATKFlat]: 22,
    [Stats.ATK]: 60,
    [Stats.DEFFlat]: 5,
    [Stats.DEF]: 12,
    [Stats.CR]: 100,
    [Stats.CD]: 100,
    [Stats.ER]: 50,
    [Stats.EM]: 30,
};

export const dfltWeights: ScoreWeightMap = {
    mainStatWeight: dfltMainStatWeights,
    subStatWeight: dfltSubStatWeights
}