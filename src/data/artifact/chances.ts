import { MainStatsByType, SubStatsByMain } from "./combinations";
import { MainStat, MainStats, Stats, SubStats, Types } from "./enums";

export type StatMap<T extends Types> = { [Stat in MainStatsByType<T>]: number };
export type TypeMap = { [T in Types]: StatMap<T> };

export const mainStatChances: TypeMap = {
  [Types.Flower]: {
    [Stats.HPFlat]: 1,
  },
  [Types.Plume]: {
    [Stats.ATKFlat]: 1,
  },
  [Types.Sands]: {
    [Stats.HP]: 0.8/3,
    [Stats.ATK]: 0.8/3,
    [Stats.DEF]: 0.8/3,
    [Stats.ER]: 0.1,
    [Stats.EM]: 0.1,
  },
  [Types.Goblet]: {
    [Stats.HP]: 0.2125,
    [Stats.ATK]: 0.2125,
    [Stats.DEF]: 0.2,
    [Stats.Pyro]: 0.05,
    [Stats.Electro]: 0.05,
    [Stats.Cryo]: 0.05,
    [Stats.Hydro]: 0.05,
    [Stats.Anemo]: 0.05,
    [Stats.Geo]: 0.05,
    [Stats.Physical]: 0.05,
    [Stats.EM]: 0.025,
  },
  [Types.Circlet]: {
    [Stats.HP]: 0.22,
    [Stats.ATK]: 0.22,
    [Stats.DEF]: 0.22,
    [Stats.CR]: 0.1,
    [Stats.CD]: 0.1,
    [Stats.HB]: 0.1,
    [Stats.EM]: 0.04,
  },
};

const dmgBonusChances: {
  [SubStat in SubStatsByMain<Stats.Physical>]: number;
} = {
  [Stats.HPFlat]: 6/44,
  [Stats.ATKFlat]: 6/44,
  [Stats.DEFFlat]: 6/44,
  [Stats.HP]: 4/44,
  [Stats.ATK]: 4/44,
  [Stats.DEF]: 4/44,
  [Stats.ER]: 4/44,
  [Stats.EM]: 4/44,
  [Stats.CR]: 3/44,
  [Stats.CD]: 3/44,
};

export type SubChanceMap<MS extends MainStat> = {
  [SubStat in SubStatsByMain<MS>]: number;
};
export type MainSubChanceMap<T extends Types> = {
  [MainStat in MainStatsByType<T>]: SubChanceMap<MainStat>;
};
export type TypeMainSubChanceMap = {
  [T in Types]: MainSubChanceMap<T>;
};
export const subStatChances: TypeMainSubChanceMap = {
  [Types.Flower]: {
    [Stats.HPFlat]: {
      [Stats.ATKFlat]: 6/38,
      [Stats.DEFFlat]: 6/38,
      [Stats.HP]: 4/38,
      [Stats.ATK]: 4/38,
      [Stats.DEF]: 4/38,
      [Stats.ER]: 4/38,
      [Stats.EM]: 4/38,
      [Stats.CR]: 3/38,
      [Stats.CD]: 3/38,
    },
  },
  [Types.Plume]: {
    [Stats.ATKFlat]: {
      [Stats.HPFlat]: 6/38,
      [Stats.DEFFlat]: 6/38,
      [Stats.HP]: 4/38,
      [Stats.ATK]: 4/38,
      [Stats.DEF]: 4/38,
      [Stats.ER]: 4/38,
      [Stats.EM]: 4/38,
      [Stats.CR]: 3/38,
      [Stats.CD]: 3/38,
    },
  },
  [Types.Sands]: {
    [Stats.HP]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.ATK]: 0.1,
      [Stats.DEF]: 0.1,
      [Stats.ER]: 0.1,
      [Stats.EM]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
    [Stats.ATK]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.HP]: 0.1,
      [Stats.DEF]: 0.1,
      [Stats.ER]: 0.1,
      [Stats.EM]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
    [Stats.DEF]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.HP]: 0.1,
      [Stats.ATK]: 0.1,
      [Stats.ER]: 0.1,
      [Stats.EM]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
    [Stats.ER]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.HP]: 0.1,
      [Stats.ATK]: 0.1,
      [Stats.DEF]: 0.1,
      [Stats.EM]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
    [Stats.EM]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.HP]: 0.1,
      [Stats.ATK]: 0.1,
      [Stats.DEF]: 0.1,
      [Stats.ER]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
  },
  [Types.Goblet]: {
    [Stats.HP]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.DEF]: 0.1,
      [Stats.ATK]: 0.1,
      [Stats.ER]: 0.1,
      [Stats.EM]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
    [Stats.ATK]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.DEF]: 0.1,
      [Stats.HP]: 0.1,
      [Stats.ER]: 0.1,
      [Stats.EM]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
    [Stats.DEF]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.ATK]: 0.1,
      [Stats.HP]: 0.1,
      [Stats.ER]: 0.1,
      [Stats.EM]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
    [Stats.Pyro]: dmgBonusChances,
    [Stats.Electro]: dmgBonusChances,
    [Stats.Cryo]: dmgBonusChances,
    [Stats.Hydro]: dmgBonusChances,
    [Stats.Anemo]: dmgBonusChances,
    [Stats.Geo]: dmgBonusChances,
    [Stats.Physical]: dmgBonusChances,
    [Stats.EM]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.ATK]: 0.1,
      [Stats.HP]: 0.1,
      [Stats.DEF]: 0.1,
      [Stats.ER]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
  },
  [Types.Circlet]: {
    [Stats.HP]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.DEF]: 0.1,
      [Stats.ATK]: 0.1,
      [Stats.ER]: 0.1,
      [Stats.EM]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
    [Stats.ATK]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.DEF]: 0.1,
      [Stats.HP]: 0.1,
      [Stats.ER]: 0.1,
      [Stats.EM]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
    [Stats.DEF]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.ATK]: 0.1,
      [Stats.HP]: 0.1,
      [Stats.ER]: 0.1,
      [Stats.EM]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
    [Stats.CR]: {
      [Stats.HPFlat]: 6/41,
      [Stats.ATKFlat]: 6/41,
      [Stats.DEFFlat]: 6/41,
      [Stats.ATK]: 4/41,
      [Stats.HP]: 4/41,
      [Stats.DEF]: 4/41,
      [Stats.ER]: 4/41,
      [Stats.EM]: 4/41,
      [Stats.CD]: 3/41,
    },
    [Stats.CD]: {
      [Stats.HPFlat]: 6/41,
      [Stats.ATKFlat]: 6/41,
      [Stats.DEFFlat]: 6/41,
      [Stats.ATK]: 4/41,
      [Stats.HP]: 4/41,
      [Stats.DEF]: 4/41,
      [Stats.ER]: 4/41,
      [Stats.EM]: 4/41,
      [Stats.CR]: 3/41,
    },
    [Stats.HB]: dmgBonusChances,
    [Stats.EM]: {
      [Stats.HPFlat]: 0.15,
      [Stats.ATKFlat]: 0.15,
      [Stats.DEFFlat]: 0.15,
      [Stats.ATK]: 0.1,
      [Stats.HP]: 0.1,
      [Stats.DEF]: 0.1,
      [Stats.ER]: 0.1,
      [Stats.CR]: 0.075,
      [Stats.CD]: 0.075,
    },
  },
};

const subsValuesTop: Record<SubStats, number> =
  {
    [Stats.HPFlat]: 298.8,
    [Stats.HP]: 105/18,
    [Stats.ATKFlat]: 19.45,
    [Stats.ATK]: 105/18,
    [Stats.DEFFlat]: 23.214,
    [Stats.DEF]: 7.2895,
    [Stats.CR]: 3.8878,
    [Stats.CD]: 7.775,
    [Stats.ER]: 6.476,
    [Stats.EM]: 23.333,
  };

export const subsRoundDecimal: Record<SubStats, boolean> =
{
  [Stats.HPFlat]: false,
  [Stats.HP]: true,
  [Stats.ATKFlat]: false,
  [Stats.ATK]: true,
  [Stats.DEFFlat]: false,
  [Stats.DEF]: true,
  [Stats.CR]: true,
  [Stats.CD]: true,
  [Stats.ER]: true,
  [Stats.EM]: false,
};

export const upgradeTiers: Record<SubStats, [number, number, number, number]> =
  {
    [Stats.HPFlat]: [subsValuesTop[Stats.HPFlat]*0.7, subsValuesTop[Stats.HPFlat]*0.8, subsValuesTop[Stats.HPFlat]*0.9, subsValuesTop[Stats.HPFlat]],
    [Stats.HP]: [subsValuesTop[Stats.HP]*0.7, subsValuesTop[Stats.HP]*0.8, subsValuesTop[Stats.HP]*0.9, subsValuesTop[Stats.HP]],
    [Stats.ATKFlat]: [subsValuesTop[Stats.ATKFlat]*0.7, subsValuesTop[Stats.ATKFlat]*0.8, subsValuesTop[Stats.ATKFlat]*0.9, subsValuesTop[Stats.ATKFlat]],
    [Stats.ATK]: [subsValuesTop[Stats.ATK]*0.7, subsValuesTop[Stats.ATK]*0.8, subsValuesTop[Stats.ATK]*0.9, subsValuesTop[Stats.ATK]],
    [Stats.DEFFlat]: [subsValuesTop[Stats.DEFFlat]*0.7, subsValuesTop[Stats.DEFFlat]*0.8, subsValuesTop[Stats.DEFFlat]*0.9, subsValuesTop[Stats.DEFFlat]],
    [Stats.DEF]: [subsValuesTop[Stats.DEF]*0.7, subsValuesTop[Stats.DEF]*0.8, subsValuesTop[Stats.DEF]*0.9, subsValuesTop[Stats.DEF]],
    [Stats.CR]: [subsValuesTop[Stats.CR]*0.7, subsValuesTop[Stats.CR]*0.8, subsValuesTop[Stats.CR]*0.9, subsValuesTop[Stats.CR]],
    [Stats.CD]: [subsValuesTop[Stats.CD]*0.7, subsValuesTop[Stats.CD]*0.8, subsValuesTop[Stats.CD]*0.9, subsValuesTop[Stats.CD]],
    [Stats.ER]: [subsValuesTop[Stats.ER]*0.7, subsValuesTop[Stats.ER]*0.8, subsValuesTop[Stats.ER]*0.9, subsValuesTop[Stats.ER]],
    [Stats.EM]: [subsValuesTop[Stats.EM]*0.7, subsValuesTop[Stats.EM]*0.8, subsValuesTop[Stats.EM]*0.9, subsValuesTop[Stats.EM]],
  };

  export const mainStatValues: Record<MainStats, [number, number]> =
  {
    [Stats.HPFlat]: [717, 4780],
    [Stats.HP]: [6.993, 46.62],
    [Stats.ATKFlat]: [46.68, 311.2],
    [Stats.ATK]: [6.993, 46.62],
    [Stats.DEF]: [8.742, 58.28],
    [Stats.CR]: [4.6625, 31.0833],
    [Stats.CD]: [9.325, 62.167],
    [Stats.ER]: [7.77, 51.8],
    [Stats.EM]: [28, 186.667],
    [Stats.HB]: [5.38, 35.8667],
    [Stats.Pyro]: [6.993, 46.62],
    [Stats.Electro]: [6.993, 46.62],
    [Stats.Cryo]: [6.993, 46.62],
    [Stats.Hydro]: [6.993, 46.62],
    [Stats.Anemo]: [6.993, 46.62],
    [Stats.Geo]: [6.993, 46.62],
    //[Stats.Dendro]:  [6.993, 46.62],
    [Stats.Physical]: [8.742, 58.28],
  };
