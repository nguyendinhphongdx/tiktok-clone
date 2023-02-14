const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    if(process.env.NODE_ENV === 'production'){
      await mongoose.connect(process.env.SERVER_ALIAS);
    }else{
      await mongoose.connect(`mongodb://localhost:${process.env.PORT_MONGO}/${process.env.DATABASE_NAME}`);
    }
    console.log("Connect database success");
  } catch (error) {
    console.log("Connect database fail", error);
  }
}

module.exports = connectDatabase;