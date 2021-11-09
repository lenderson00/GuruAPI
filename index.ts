import { upgradeTiers } from "./src/data/artifact/chances";
import { Sets, Stats, Types } from "./src/data/artifact/enums";
import { AddArtifactParams } from "./src/domain/artifact/usecases/add-artifact";
import { ArtifactMongo } from "./src/infra/artifact/db/mongodb/artifact-mongo";
import { MongoHelper } from "./src/infra/artifact/db/mongodb/mongo-helper";
import env from "./src/main/config/env";



const mockAddArtifactParams = (): AddArtifactParams => ({
    set: Sets.AP,
    type: Types.Flower,
    level: 20,
    mainstat: Stats.HPFlat,
    substats: [
        {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
        {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
        {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
        {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]},
    ]
})

const doIt = async () => {
    const sut = new ArtifactMongo()
    const addArtifactParams = mockAddArtifactParams()
    await MongoHelper.connect(env.mongoUrl)
    await sut.add(addArtifactParams)
}

doIt();


