import { LogDynamoRepository } from './log-dynamo-repository'
import faker from 'faker'
import env from '../../../../main/config/env'
import { DynamoHelper } from '../dynamo-helper'

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