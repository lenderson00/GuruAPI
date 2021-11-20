import { Collection } from 'mongodb'
import { MongoHelper } from './src/infra/artifact/db/mongodb/mongo-helper'
import env from './src/main/config/env'

const getartifact = async () => {
    await MongoHelper.connect(env.mongoUrl)
    const artifactCollection: Collection = MongoHelper.getCollection('artifacts')
    const result = await artifactCollection.find({}).toArray()
    console.log('Found documents =>', result);
    await MongoHelper.disconnect()
}

getartifact()