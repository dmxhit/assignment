const Mongoose = require("mongoose");

//create mongoose connection
const connectDB = async () => {
  await Mongoose.connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
