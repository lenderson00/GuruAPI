import { AddArtifactDB } from "../../data/artifact/usecases/add-artifact"
import { GetArtifactDB } from "../../data/artifact/usecases/get-artifact"
import { ArtifactMongo } from "../../infra/artifact/db/mongodb/artifact-mongo"
import { AddArtifactController } from "../../presentation/controller/add-artifact-controller"
import { DelArtifactController } from "../../presentation/controller/del-artifact-controller"
import { GetArtifactController } from "../../presentation/controller/get-artifact-controller"
import { makeLogControllerDecorator } from "./decorators/log-controller-decorator-factory"

export const makeAddArtifactController = () => {
    const addArtifactRepo = new ArtifactMongo()
    const addArtifact = new AddArtifactDB(addArtifactRepo)
    const addArtifactController = new AddArtifactController(addArtifact)
    return makeLogControllerDecorator(addArtifactController)
}

export const makeDelArtifactController = () => {
    const delArtifactRepo = new ArtifactMongo()
    const delArtifactController = new DelArtifactController(delArtifactRepo)
    return makeLogControllerDecorator(delArtifactController)
}

export const makeGetArtifactController = () => {
    const getArtifactRepo = new ArtifactMongo()
    const getArtifactDB = new GetArtifactDB(getArtifactRepo)
    const getArtifactController = new GetArtifactController(getArtifactDB)
    return makeLogControllerDecorator(getArtifactController)
}