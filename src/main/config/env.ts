import configValues from "./dbConfig.json";

const getDBConnectionString = () => {
    return "mongodb+srv://" + configValues.user + ":" + configValues.pwd +
    "@genshindb.qwd99.mongodb.net/" + configValues.name + "?retryWrites=true&w=majority";
}

export default {
    mongoUrl: process.env.MONGO_URL || getDBConnectionString(),
    port: process.env.PORT || 5050
}

