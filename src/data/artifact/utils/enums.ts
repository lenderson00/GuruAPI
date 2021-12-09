export enum Sets {
  GF = "Gladiator's Finale",
  WT = "Wanderer's Troupe",
  AP = "Archaic Petra",
  RB = "Retracing Bolide",
  TF = "Thundering Fury",
  TS = "Thundersoother",
  VV = "Viridescent Venerer",
  MB = "Maiden Beloved",
  CWoF = "Crimson Witch of Flames",
  LW = "Lavawalker",
  BS = "Blizzard Strayer",
  HoD = "Heart of Depth",
  BC = "Bloodstained Chivalry",
  NO = "Noblesse Oblige",
  TotM = "Tenacity of the Millelith",
  PF = "Pale Flame",
  EoSF = "Emblem of Severed Fate",
  SR = "Shimenawa's Reminiscence"
}
  
export type Set =
  | Sets.AP
  | Sets.BC
  | Sets.BS
  | Sets.CWoF
  | Sets.EoSF
  | Sets.GF
  | Sets.HoD
  | Sets.LW
  | Sets.MB
  | Sets.NO
  | Sets.PF
  | Sets.RB
  | Sets.SR
  | Sets.TF
  | Sets.TS
  | Sets.TotM
  | Sets.VV
  | Sets.WT;
  
export enum Types {
  Flower = "Flower of Life",
  Plume = "Plume of Death",
  Sands = "Sands of Eon",
  Goblet = "Goblet of Eonothem",
  Circlet = "Circlet of Logos",
}

export type Type =
| Types.Flower
| Types.Plume
| Types.Sands
| Types.Goblet
| Types.Circlet;

export type Level = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20;

export enum Stats {
  HPFlat = "HP",
  HP = "HP%",
  ATKFlat = "ATK",
  ATK = "ATK%",
  DEFFlat = "DEF", // not main
  DEF = "DEF%",
  CR = "CRIT Rate%",
  CD = "CRIT DMG%",
  ER = "Energy Recharge%",
  EM = "Elemental Mastery",
  // not sub
  HB = "Healing Bonus%",
  Pyro = "Pyro DMG Bonus%",
  Electro = "Electro DMG Bonus%",
  Cryo = "Cryo DMG Bonus%",
  Hydro = "Hydro DMG Bonus%",
  Anemo = "Anemo DMG Bonus%",
  Geo = "Geo DMG Bonus%",
  // Dendro = "Dendro DMG Bonus%",
  Physical = "Physical DMG Bonus%",
  
  BaseHP = "Base HP",
  BaseATK = "Base ATK",
  BaseDEF = "Base DEF",
}

export enum BaseStats {
  HP = Stats.BaseHP,
  ATK = Stats.BaseATK,
  DEF = Stats.BaseDEF
}

export type BaseStat =
  | Stats.BaseHP
  | Stats.BaseATK
  | Stats.BaseDEF;

  
export enum MainStats {
  HPFlat = "HP",
  HP = "HP%",
  ATKFlat = "ATK",
  ATK = "ATK%",
  DEF = "DEF%",
  CR = "CRIT Rate%",
  CD = "CRIT DMG%",
  ER = "Energy Recharge%",
  EM = "Elemental Mastery",
  HB = "Healing Bonus%",
  Pyro = "Pyro DMG Bonus%",
  Electro = "Electro DMG Bonus%",
  Cryo = "Cryo DMG Bonus%",
  Hydro = "Hydro DMG Bonus%",
  Anemo = "Anemo DMG Bonus%",
  Geo = "Geo DMG Bonus%",
  // Dendro = "Dendro DMG Bonus%",
  Physical = "Physical DMG Bonus%",
}

export type MainStat =
  | Stats.HPFlat
  | Stats.HP
  | Stats.ATKFlat
  | Stats.ATK
  | Stats.DEF
  | Stats.CR
  | Stats.CD
  | Stats.ER
  | Stats.EM
  | Stats.HB
  | Stats.Pyro
  | Stats.Electro
  | Stats.Cryo
  | Stats.Hydro
  | Stats.Anemo
  | Stats.Geo
  //| MainStats.Dendro
  | Stats.Physical;    

  export enum SubStats {
  HPFlat = "HP",
  HP = "HP%",
  ATKFlat = "ATK",
  ATK = "ATK%",
  DEFFlat = "DEF",
  DEF = "DEF%",
  CR = "CRIT Rate%",
  CD = "CRIT DMG%",
  ER = "Energy Recharge%",
  EM = "Elemental Mastery",
  }

  export type SubStat =
  | Stats.HPFlat
  | Stats.HP
  | Stats.ATKFlat
  | Stats.ATK
  | Stats.DEFFlat
  | Stats.DEF
  | Stats.CR
  | Stats.CD
  | Stats.ER
  | Stats.EM;

export type SubStatSlot = {
  substat: SubStat
  value: number
}
