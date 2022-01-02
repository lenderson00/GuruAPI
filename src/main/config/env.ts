/* import configValues from "./mongodbConfig.json"; */

/* const getMongodbConnString = () => {
    return "mongodb+srv://" + configValues.user + ":" + configValues.pwd +
    "@genshindb.qwd99.mongodb.net/" + configValues.name + "?retryWrites=true&w=majority";
} */

export default {
    /* mongoURL: process.env.MONGO_URL */ /* || getMongodbConnString(), 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000', */
    port: process.env.PORT || 5050,
    aws: {
        dynamoArtifactTableName: process.env.ARTIFACT_TABLE_NAME || 'guru-artifacts-local',
        dynamoLogErrorTableName: process.env.LOGERROR_TABLE_NAME || 'guru-errors-local',
        dynamoAPIVersion: '2012-08-10',
        dynamoEndpoint: process.env.DYNAMO_URL || 'http://localhost:2077',
        region: process.env.DYNAMO_URL || 'us-east-1',
        accessKeyId: process.env.ACCESS_KEY || '',
        secretAccessKey: process.env.SECRET_KEY || ''
    }
}