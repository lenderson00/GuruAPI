import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeUpdArtifactController } from '../factories/controller/artifact'

export default (router: Router): void => {
  router.patch('/artifact/:id', adaptRoute(makeUpdArtifactController()))
}