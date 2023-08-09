const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const password = encodeURIComponent("Kaif@786");
    const connectionString = `mongodb+srv://admin:${password}@cluster.ugstpkn.mongodb.net/mycontacts-backend?retryWrites=true&w=majority`;
    const connect = await mongoose.connect(connectionString);
    console.log(
      "Connection established",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log("DB ERROR -->> ", error);
    process.exit(1);
  }
};

module.exports = connectDb;
