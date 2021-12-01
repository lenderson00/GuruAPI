import { Router } from "express"
import { adaptRoute } from "../adapters/express-route-adapter"
import { makeDelArtifactController } from "../factories/controller/artifact"

export default (router: Router): void => {
  router.delete('/artifact/:id', adaptRoute(makeDelArtifactController()))
}