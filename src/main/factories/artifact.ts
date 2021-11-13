import { AddArtifactDB } from "../../data/artifact/usecases/add-artifact"
import { ArtifactMongo } from "../../infra/artifact/db/mongodb/artifact-mongo"
import { AddArtifactController } from "../../presentation/controller/add-artifact-controller"

export const makeAddArtifactController = () => {
    const addArtifactRepo = new ArtifactMongo()
    const addArtifact = new AddArtifactDB(addArtifactRepo)
    const addArtifactController = new AddArtifactController(addArtifact)
    return addArtifactController
}