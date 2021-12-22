import AWS from 'aws-sdk'
import { LogErrorRepository } from '../../../../data/db/log'
import env from '../../../../main/config/env'
import { DynamoHelper } from '../dynamo-helper'

const dynamoHelper = new DynamoHelper()
const dynamo = dynamoHelper.getLocalDynamo()

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    await dynamo.putItem({
      TableName: env.aws.dynamoLogErrorTableName,
      Item: AWS.DynamoDB.Converter.marshall({
        stack: stack,
        date: (new Date).toISOString()
      })
    }).promise()
  }
}