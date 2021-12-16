import { Controller } from '../../presentation/protocols'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const adaptRoute = (controller: Controller) => {
  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event.body)
    const request = {
      ...(event.body || {}),
      ...(event.pathParameters || {}),
      ...(event.queryStringParameters || {}),
      ...(event.multiValueQueryStringParameters || {}),
      ...(event.stageVariables || {}),
    }
    return await controller.handle(request)
  }
}