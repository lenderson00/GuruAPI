import { MongoHelper } from '../../infra/artifact/db/mongodb/mongo-helper'
import { setupApp } from '../config/app'

import { Collection } from 'mongodb'
import { Express } from 'express'
import request from 'supertest'
import { Sets, Stats, Types } from '../../data/artifact/enums'
import { upgradeTiers } from '../../data/artifact/chances'
import env from '../config/env'

let accountCollection: Collection
let app: Express

describe('Login Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('artifacts')
    await accountCollection.deleteMany({})
  })

  describe('Add POST /artifact', () => {
    
    test('Should return 200 when adding artifact', async () => {
      await request(app)
        .post('/api/artifact')
        .send({
            set: Sets.AP,
            type: Types.Flower,
            level: 20,
            mainstat: Stats.HPFlat,
            substats: [
                {substat: Stats.ATK, value: upgradeTiers["ATK%"][0]},
                {substat: Stats.ATKFlat, value: upgradeTiers.ATK[0]},
                {substat: Stats.DEF, value: upgradeTiers["DEF%"][0]},
                {substat: Stats.DEFFlat, value: upgradeTiers.DEF[0]},
            ]
        })
        .expect(200)
    })
  })
})
