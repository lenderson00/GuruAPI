import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeGetArtifactController } from '../factories/controller/artifact'

export default (router: Router): void => {
  router.post('/artifact/get', adaptRoute(makeGetArtifactController()))
}