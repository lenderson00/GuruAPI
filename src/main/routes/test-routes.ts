import { Router } from "express"
import { TestController } from "../../presentation/controller/test-controller"
import { adaptRoute } from "../adapters/express-route-adapter"

export default (router: Router): void => {
    router.get('/artifact', adaptRoute(new TestController()))}


