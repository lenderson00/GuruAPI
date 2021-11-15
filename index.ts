import { Artifact } from "./src/data/artifact/artifact";
import { upgradeTiers } from "./src/data/artifact/chances";
import { Level, Sets, Stats, Types, MainStat } from "./src/data/artifact/enums";
import { AddArtifactParams } from "./src/domain/artifact/usecases/add-artifact";

const data = {
    set: Sets.AP,
    type: Types.Plume,
    level: 0,
    mainstat: Stats.ATKFlat,
    substats: [
        {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
        {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
        {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
        {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]},
    ]
}

const art = new Artifact(data)

for (let index = 0; index < 21; index++) {
    art.level = index as Level
    console.log(`Level ${index}: ${art.mainstatValue}`)
}

