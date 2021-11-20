import { MongoHelper } from '../../infra/artifact/db/mongodb/mongo-helper'
import { setupApp } from '../config/app'
import { Collection } from 'mongodb'
import { Express } from 'express'
import request from 'supertest'
import { Sets, Stats, Types } from '../../data/artifact/utils/enums'
import { upgradeTiers } from '../../data/artifact/utils/chances'
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
                {substat: Stats.ATK, value: -Math.round(-upgradeTiers["ATK%"][0]*10)/10},
                {substat: Stats.ATKFlat, value: -Math.round(-upgradeTiers.ATK[0])},
                {substat: Stats.DEF, value: -Math.round(-upgradeTiers["DEF%"][0]*10)/10},
                {substat: Stats.DEFFlat, value: -Math.round(-upgradeTiers.DEF[0])},
            ]
        })
        .expect(200)
    })
  })
})
