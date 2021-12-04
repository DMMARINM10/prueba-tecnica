const mongoose = require('mongoose');

const dbConnection = async() => {

   try {

      await mongoose.connect(process.env.MONGODB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log('Database online');
   } catch (error) {
       console.log(error);
       throw new Error ('Error initiating database');
   }

}

module.exports = {
    dbConnection
}