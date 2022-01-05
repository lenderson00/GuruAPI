import { Express } from 'express'
import request from 'supertest'
import { Sets, Stats, Types } from '@/data/artifact/utils/enums'
import { upgradeTiers } from '@/data/artifact/utils/chances'
import env from '@/main/config/env'
import { AddArtifactRepoParams } from '@/data/artifact/protocols/add-artifact-repo'
import { DynamoHelper } from '@/infra/db/dynamodb/dynamo-helper'
import AWS from 'aws-sdk'
import { setupApp } from '@/main/config/app'

let app: Express
const dynamoHelper = new DynamoHelper()
const dynamo = dynamoHelper.getLocalDynamo()

const mockAddArtifactParams = (): AddArtifactRepoParams => ({
  userid: 'valid_userid',
  dtAdded: 'valid_date',
  set: Sets.AP,
  type: Types.Flower,
  level: 0,
  mainstat: Stats.HPFlat,
  mainstatValue: 717,
  substats: [
    { substat: Stats.ATK, value: Math.round(upgradeTiers['ATK%'][0] * 10) / 10 },
    { substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]) },
    { substat: Stats.DEF, value: Math.round(upgradeTiers['DEF%'][0] * 10) / 10 }
  ],
  scoreDflt: 0,
  scoreDfltMainstat: 0,
  scoreDfltSubstats: 0,
  scoreDfltLvl20Min: 0,
  scoreDfltLvl20Avg: 0,
  scoreDfltLvl20Max: 0,
  scoreDfltLvl20SD: 0,
  dtModified: 'any_date'
})

describe('Artifact CRUD Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  afterAll(async () => {
    await dynamoHelper.deleteAllFromTable(env.aws.dynamoArtifactTableName)
  })

  describe('Add POST /artifact', () => {
    test('Should return 200 when adding artifact', async () => {
      await request(app)
        .post('/api/artifact')
        .send({
          userid: 'dummy_id',
          set: Sets.AP,
          type: Types.Flower,
          level: 0,
          mainstat: Stats.HPFlat,
          substats: [
            { substat: Stats.ATK, value: Math.round(upgradeTiers['ATK%'][0] * 10) / 10 },
            { substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]) },
            { substat: Stats.DEF, value: Math.round(upgradeTiers['DEF%'][0] * 10) / 10 },
            { substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0]) }
          ]
        })
        .expect(200)
    })
  })

  describe('Get POST /artifact', () => {
    beforeAll(async () => {
      await dynamoHelper.deleteAllFromTable(env.aws.dynamoArtifactTableName)
      await dynamo.putItem({
        TableName: env.aws.dynamoArtifactTableName,
        Item: AWS.DynamoDB.Converter.marshall(mockAddArtifactParams())
      }).promise()
    })

    test('Should return 200 when adding artifact', async () => {
      const key = [{ userid: 'valid_userid', dtAdded: 'valid_date' }]
      await request(app)
        .get('/api/artifact')
        .send({
          keys: key
        })
        .expect(200, {
          found: [{
            userid: 'valid_userid',
            dtAdded: 'valid_date',
            set: Sets.AP,
            type: Types.Flower,
            level: 0,
            mainstat: Stats.HPFlat,
            mainstatValue: 717,
            substats: [
              { substat: Stats.ATK, value: Math.round(upgradeTiers['ATK%'][0] * 10) / 10 },
              { substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0]) },
              { substat: Stats.DEF, value: Math.round(upgradeTiers['DEF%'][0] * 10) / 10 }
            ],
            scoreDflt: 0
          }],
          notFound: []
        })
    })
  })

  describe('UPDATE /artifact', () => {
    test('Should return 200 when adding artifact', async () => {
      await request(app)
        .patch('/api/artifact')
        .send({
          userid: 'valid_userid',
          dtAdded: 'valid_date',
          level: 20,
          substats: [
            { substat: Stats.ATK, value: Math.round(upgradeTiers['ATK%'][0] * 2 * 10) / 10 },
            { substat: Stats.ATKFlat, value: Math.round(upgradeTiers.ATK[0] * 3) },
            { substat: Stats.DEF, value: Math.round(upgradeTiers['DEF%'][0] * 10) / 10 },
            { substat: Stats.DEFFlat, value: Math.round(upgradeTiers.DEF[0] * 2) }
          ]
        })
        .expect(200)
    })
  })

  describe('DELETE /artifact', () => {
    test('Should return 200 when adding artifact', async () => {
      await request(app)
        .delete('/api/artifact')
        .send({
          userid: 'valid_userid',
          dtAdded: 'valid_date'
        })
        .expect(200)
    })
  })
})
