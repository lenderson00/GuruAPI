import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddArtifactController } from '../factories/controller/artifact'

export default (router: Router): void => {
  router.post('/artifact', adaptRoute(makeAddArtifactController()))
}