import { AddArtifactDB } from "../../../data/artifact/usecases/add-artifact"
import { GetArtifactDB } from "../../../data/artifact/usecases/get-artifact"
import { AddArtifactController } from "../../../presentation/controller/add-artifact-controller"
import { DelArtifactController } from "../../../presentation/controller/del-artifact-controller"
import { GetArtifactController } from "../../../presentation/controller/get-artifact-controller"
import { makeDelArtifactValidation } from "./del-artifact-validation-controller"
import { makeLogControllerDecorator } from "../decorators/log-controller-decorator-factory"
import { makeAddArtifactValidation } from "./add-artifact-validation-controller"
import { makeGetArtifactValidation } from "./get-artifact-validation-controller"
import { Artifact } from "../../../data/artifact/utils/artifact"
import { UpdArtifactDB } from "../../../data/artifact/usecases/upd-artifact"
import { UpdArtifactController } from "../../../presentation/controller/upd-artifact-controller"
import { makeUpdArtifactValidation } from "./upd-artifact-validation-controller"
import { ArtifactDynamo } from "../../../infra/db/dynamodb/artifact/artifact-dynamo"
import { DynamoHelper } from "../../../infra/db/dynamodb/dynamo-helper"
import { ScanArtifactController } from "../../../presentation/controller/scan-artifact-controller"

const dynamoHelper = new DynamoHelper()
const dynamo = dynamoHelper.getLocalDynamo()

export const makeAddArtifactController = () => {
    const addArtifactRepo = new ArtifactDynamo(dynamo)
    const addArtifact = new AddArtifactDB(addArtifactRepo, new Artifact)
    const addArtifactController = new AddArtifactController(addArtifact, makeAddArtifactValidation())
    return makeLogControllerDecorator(addArtifactController)
}

export const makeDelArtifactController = () => {
    const delArtifactRepo = new ArtifactDynamo(dynamo)
    const delArtifactController = new DelArtifactController(delArtifactRepo, makeDelArtifactValidation())
    return makeLogControllerDecorator(delArtifactController)
}

export const makeGetArtifactController = () => {
    const getArtifactRepo = new ArtifactDynamo(dynamo)
    const getArtifactDB = new GetArtifactDB(getArtifactRepo)
    const getArtifactController = new GetArtifactController(getArtifactDB, makeGetArtifactValidation())
    return makeLogControllerDecorator(getArtifactController)
}

export const makeUpdArtifactController = () => {
    const updArtifactRepo = new ArtifactDynamo(dynamo)
    const getArtifactRepo = new ArtifactDynamo(dynamo)
    const artifactUtil = new Artifact()
    const updArtifactDB = new UpdArtifactDB(updArtifactRepo, getArtifactRepo, artifactUtil)
    const updArtifactController = new UpdArtifactController(updArtifactDB, makeUpdArtifactValidation())
    return makeLogControllerDecorator(updArtifactController)
}

export const makeScanArtifactController = () => {
    const scanArtifactRepo = new ArtifactDynamo(dynamo)
    const scanArtifactController = new ScanArtifactController(scanArtifactRepo)
    return makeLogControllerDecorator(scanArtifactController)
}