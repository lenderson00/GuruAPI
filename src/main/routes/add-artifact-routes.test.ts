import { MongoHelper } from '../../infra/artifact/db/mongodb/mongo-helper'
import { setupApp } from '../config/app'
import { Collection, ObjectId } from 'mongodb'
import { Express } from 'express'
import request from 'supertest'
import { Sets, Stats, Types } from '../../data/artifact/utils/enums'
import { upgradeTiers } from '../../data/artifact/utils/chances'
import env from '../config/env'
import { AddArtifactRepoParams } from '../../data/artifact/protocols/add-artifact-repo'

let artifactCollection: Collection
let app: Express

const mockAddArtifactParams = (): AddArtifactRepoParams => ({
  set: Sets.AP,
  type: Types.Flower,
  level: 20,
  mainstat: Stats.HPFlat,
  mainstatValue: 4780,
  substats: [
    {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*10)/10},
    {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0])},
    {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10},
    {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0])},
  ],
  scoreDflt: 0,
  scoreDfltMainstat: 0,
  scoreDfltSubstats: 0,
  scoreDfltLvl20Min: 0,
  scoreDfltLvl20Avg: 0,
  scoreDfltLvl20Max: 0,
  scoreDfltLvl20SD: 0,
  dtAdded: "any_date",
  dtModified: "any_date",
})

describe('Artifact CRUD Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(env.mongoUrl)
    artifactCollection = MongoHelper.getCollection('artifacts')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  /* beforeEach(async () => {
    await accountCollection.deleteMany({})
  }) */

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
                {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*10)/10},
                {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0])},
                {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10},
                {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0])},
            ]
        })
        .expect(200)
    })
  })

  describe('Get POST /artifact', () => {
    
    beforeAll(async () => {
      await artifactCollection.deleteMany({})
      const fakeArtifact = mockAddArtifactParams()
      const insertedArtifact = { _id: new ObjectId('123456789012345678901234'), ... fakeArtifact }
      await artifactCollection.insertOne(insertedArtifact)
    })

    test('Should return 200 when adding artifact', async () => {
      await request(app)
        .post('/api/artifact/get')
        .send(['123456789012345678901234'])
        .expect(200, {
          set: Sets.AP,
          type: Types.Flower,
          level: 20,
          mainstat: Stats.HPFlat,
          mainstatValue: 4780,
          substats: [
            {substat: Stats.ATK, value: Math.round(upgradeTiers["ATK%"][0]*10)/10},
            {substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0])},
            {substat: Stats.DEF, value: Math.round(upgradeTiers["DEF%"][0]*10)/10},
            {substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0])},
          ],
          scoreDflt: 0,
        })
    })
  })
})
