export const env = {
  aws: {
    region: process.env.REGION ?? '',
    dynamoAPIVersion: process.env.DYNAMO_API__VERSION ?? '',
    accessKeyId: process.env.ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.SECRET_ACCESS_KEY ?? ''
  }

}
