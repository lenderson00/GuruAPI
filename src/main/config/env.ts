import configValues from "./dbConfig.json";

const getDBConnectionString = () => {
    console.log('Connecting on: User = ' + configValues.user + ' | Pwd = ' + configValues.pwd + ' | DB = ' + configValues.name);
    return "mongodb+srv://" + configValues.user + ":" + configValues.pwd +
    "@genshindb.qwd99.mongodb.net/" + configValues.name + "?retryWrites=true&w=majority";
}

export default {
    mongoUrl: 'mongodb+srv://EricFO:Wcnj8TSHQzcbSOn4@genshindb.qwd99.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' /* 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000' */ /* process.env.MONGO_URL || */ /* getDBConnectionString() */,
    port: process.env.PORT || 5050
}

