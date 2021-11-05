import _ from "lodash/fp";
import { Stats, MainStat, SubStat, Types, Sets, Set, Type, Level } from "./enums";

export const allSets: Set[] = [
    Sets.AP,
    Sets.BC,
    Sets.BS,
    Sets.CWoF,
    Sets.EoSF,
    Sets.GF,
    Sets.HoD,
    Sets.LW,
    Sets.MB,
    Sets.NO,
    Sets.PF,
    Sets.RB,
    Sets.SR,
    Sets.TF,
    Sets.TS,
    Sets.TotM,
    Sets.VV,
    Sets.WT,
];

export const allTypes: Type[] = [
    Types.Flower,
    Types.Plume,
    Types.Sands,
    Types.Goblet,
    Types.Circlet,
];

export const allLevels: Level[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export const allMainStats: MainStat[] = [
    Stats.HPFlat,
    Stats.ATKFlat,
    Stats.HP,
    Stats.ATK,
    Stats.DEF,
    Stats.ER,
    Stats.EM,
    Stats.CR,
    Stats.CD,
    Stats.HB,
    Stats.Pyro,
    Stats.Electro,
    Stats.Cryo,
    Stats.Hydro,
    Stats.Anemo,
    Stats.Geo,
    //Stats.Dendro,
    Stats.Physical,
];
  
export const allSubStats: SubStat[] = [
  Stats.CR,
  Stats.CD,
  Stats.ATK,
  Stats.ATKFlat,
  Stats.HP,
  Stats.HPFlat,
  Stats.DEF,
  Stats.DEFFlat,
  Stats.ER,
  Stats.EM,
];

export type MainStatsByType<Type extends Types> =
Type extends Types.Flower ? Stats.HPFlat
  : Type extends Types.Plume ? Stats.ATKFlat
  : Type extends Types.Sands ? Stats.HP | Stats.ATK | Stats.DEF | Stats.ER | Stats.EM
  : Type extends Types.Goblet
  ?
      | Stats.HP
      | Stats.ATK
      | Stats.DEF
      | Stats.Pyro
      | Stats.Electro
      | Stats.Cryo
      | Stats.Hydro
      | Stats.Anemo
      | Stats.Geo
      //| Stats.Dendro
      | Stats.Physical
      | Stats.EM
  : Type extends Types.Circlet
  ? Stats.HP | Stats.ATK | Stats.DEF | Stats.CR | Stats.CD | Stats.HB | Stats.EM
  : never;

export type SubStatsByMain<MS extends MainStat> = Exclude<
  SubStat,
  MS
>;

export const allowedMainStats: { [T in Types]: MainStatsByType<T>[] } = {
  [Types.Flower]: [Stats.HPFlat],
  [Types.Plume]: [Stats.ATKFlat],
  [Types.Sands]: [Stats.HP, Stats.ATK, Stats.DEF, Stats.ER, Stats.EM],
  [Types.Goblet]: [
    Stats.HP,
    Stats.ATK,
    Stats.DEF,
    Stats.Pyro,
    Stats.Electro,
    Stats.Cryo,
    Stats.Hydro,
    Stats.Anemo,
    Stats.Geo,
    //Stats.Dendro,
    Stats.Physical,
    Stats.EM,
  ],
  [Types.Circlet]: [
    Stats.HP,
    Stats.ATK,
    Stats.DEF,
    Stats.CR,
    Stats.CD,
    Stats.HB,
    Stats.EM,
  ],
};

// All substats are allowed except for the duplicate of main stat
export type AllowedSubStats = Record<MainStat, SubStat[]>;

export const allowedSubStats: AllowedSubStats = allMainStats.reduce(
  (acc, mainStat) => {
    return {
      ...acc,
      [mainStat]: _.without([mainStat], allSubStats),
    };
  },
  {} as AllowedSubStats
);
