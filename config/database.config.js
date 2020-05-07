module.exports = () => {

    const mongoose = require("mongoose");
    const key = require('./key.config');


    mongoose.connect( `mongodb://${key.MONGO_HOST}:${key.MONGO_PORT}/${key.MONGO_DB_NAME}`, {
        useNewUrlParser: true,
        autoReconnect: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        reconnectTries: Number.MAX_VALUE,
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000,
        reconnectInterval: 3000,
        socketTimeoutMS: 45000,
    });
    
    mongoose.connection.on("connected", () => {
        console.log("++ Successfully connected to the database ++");
    });

    mongoose.connection.on("reconnected", () => {
        console.log("reconnected mongoDB");
    });

    mongoose.connection.on("disconnected", () => {
        console.error(" Disconnected mongoDB");
    });

    mongoose.connection.on("close", () => {
        console.error("Connection mongoDB Closed");
    });

    mongoose.connection.on("error", (error) => {
        console.error("ERROR mongoDB: " + error);
    });
    process.on('unhandledRejection', error => {
        console.log('unhandledRejection', error.message);
      }); 
};
