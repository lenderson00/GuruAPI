import { LogDynamoRepository } from '@/infra/db/dynamodb/log-error/log-dynamo-repository'
import { DynamoHelper } from '@/infra/db/dynamodb/dynamo-helper'

import env from '@/main/config/env'
import faker from 'faker'

const makeSut = (): LogDynamoRepository => {
  return new LogDynamoRepository()
}
const dynamoHelper = new DynamoHelper()
const dynamo = dynamoHelper.getLocalDynamo()

describe('Log-Dynamo-Repository', () => {
  beforeAll(async () => {
    await dynamoHelper.deleteAllFromTable(env.aws.dynamoLogErrorTableName)
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.random.words())
    const data = await dynamo.scan({ TableName: env.aws.dynamoLogErrorTableName }).promise()
    expect(data.Count).toBe(1)
  })
})