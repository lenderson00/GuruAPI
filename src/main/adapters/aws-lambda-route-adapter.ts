import { Controller } from '../../presentation/protocols'
import { APIGatewayProxyResult } from 'aws-lambda'

export const adaptRoute = (controller: Controller) => {
  return async (event: any): Promise<APIGatewayProxyResult> => {
    const request = {
      ...JSON.parse(event.body || '{}'),
      /* ...JSON.parse(event.pathParameters || '{}'), */
      ...event.queryStringParameters

      /* ...(JSON.parse(event.multiValueQueryStringParameters || '{}')), */
      /* ...(JSON.parse(event.stageVariables || '{}')) */
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      const adjResponse: any = Object.assign({},httpResponse)
      adjResponse.body = JSON.stringify(httpResponse.body)
      adjResponse.isBase64Encoded = false
      adjResponse.headers = {
        /* 'Content-type': 'application/json', */
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
      }
      return adjResponse
    } else {
      const adjResponse: any = Object.assign({},httpResponse)
      adjResponse.body = JSON.stringify({ error: httpResponse.body.message })
      adjResponse.isBase64Encoded = false
      return adjResponse
    }
  }
}