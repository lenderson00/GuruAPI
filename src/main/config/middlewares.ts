/* import { bodyParser, cors, contentType } from '@/main/middlewares' */

import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'

export default (app: Express): void => {
  app.use(bodyParser)
/*   app.use(cors)
  app.use(contentType) */
}