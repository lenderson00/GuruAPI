import { Router } from 'express'

export default (router: Router): void => {
  router.post('/artifact', (req, res) => {
      res.json({ ok: "ok" })
  })
}