import { upgradeTiers } from "./src/data/artifact/chances";
import { Sets, Stats, Types } from "./src/data/artifact/enums";
import { AddArtifactParams } from "./src/domain/artifact/usecases/add-artifact";
import { ArtifactMongo } from "./src/infra/artifact/db/mongodb/artifact-mongo";
import { MongoHelper } from "./src/infra/artifact/db/mongodb/mongo-helper";
import env from "./src/main/config/env";



const mockAddArtifactParams = (): AddArtifactParams => ({
    set: Sets.NO,
    type: Types.Circlet,
    level: 20,
    mainstat: Stats.HPFlat,
    substats: [
        {substat: Stats.ATK, value: upgradeTiers["ATK%"][3]*3},
        {substat: Stats.ATKFlat, value: upgradeTiers.ATK[3]*2},
        {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
        {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]},
    ]
})

const doIt = async () => {
    const sut = new ArtifactMongo()
    const addArtifactParams = mockAddArtifactParams()
    console.log("Connecting at: " + env.mongoUrl)
    await MongoHelper.connect(env.mongoUrl)
    console.log("Connected. Adding artifact...")
    await sut.add(addArtifactParams)
    console.log("Artifact added. Closing connection...")
    await MongoHelper.disconnect()
    console.log("Disconnected.")
}

doIt();


