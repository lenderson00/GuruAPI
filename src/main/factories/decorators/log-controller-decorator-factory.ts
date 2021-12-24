import { LogControllerDecorator } from '../../decorators'
import { Controller } from '../../../presentation/protocols'
import { LogDynamoRepository } from '../../../infra/db/dynamodb/log-error/log-dynamo-repository'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logRepository = new LogDynamoRepository()
  return new LogControllerDecorator(controller, logRepository)
}