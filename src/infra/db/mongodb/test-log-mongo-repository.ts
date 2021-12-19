import { LogMongoRepository } from './log-mongo-repository'
import { MongoHelper } from './mongo-helper'

import { Collection } from 'mongodb'
import faker from 'faker'
import env from '../../../main/config/env'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

let errorCollection: Collection

describe('LogMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoURL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.random.words())
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})