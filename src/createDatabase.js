const mongoose = require('mongoose');
const subscriberModel = require('./models/subscribers');
const data = require('./data');
require('dotenv').config();

const DATABASE_URL = "mongodb+srv://mamtagigana4:NWcFh2t1xHqdvFXg@cluster0.uieiikj.mongodb.net/" || "mongodb://127.0.0.1:27017/User";
//const DATABASE_URL = process.env.MONGODB_URL_ATLAS || process.env.MONGODB_URL_LOCAL;

//Connecting to MongoDB using Mongoose
mongoose.connect(DATABASE_URL, /*{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}*/);
const db = mongoose.connection;

//If an error occur during connection, handlr and log error
db.on("error", (err) => console.log(err));

//If connection is successful then log success message
db.once("open", () => console.log("Database created..."));

//Refresh all connections
const refreshAll = async () => {
    //Deleting previous data
    await subscriberModel.deleteMany({})
    //Inserting new data
    await subscriberModel.insertMany(data)
    //Disconnecting the database
    await mongoose.disconnect();
}
refreshAll()