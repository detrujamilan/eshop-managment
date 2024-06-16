const mongoose = require("mongoose");

 const connect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((connection) => {
      console.log(`Database Connection is ready ....`);
    })
    .catch((error) => {
      console.log(error);
    });
};


module.exports = connect;