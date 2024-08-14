const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.on(process.env.MONGOOSE_CONNECTION_ON_CONNECTED, () => {
  console.log(process.env.MESSAGE_MONGOOSE_CONNECTED + process.env.DATABASE_NAME);
});

mongoose.connection.on(process.env.MONGOOSE_CONNECTION_ON_DISCONNECTED, () => {
  console.log(process.env.MESSAGE_MONGOOSE_DISCONNECTED);
});

mongoose.connection.on(process.env.MONGOOSE_CONNECTION_ON_ERROR, (error) => {
  console.log(process.env.MESSAGE_MONGOOSE_CONNECTION_ERROR + error);
});
