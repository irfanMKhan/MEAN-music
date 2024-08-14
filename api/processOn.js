const mongoose = require("mongoose");

const util = require("util");

const callbackify = util.callbackify;

const connectionClose_Callbackified = callbackify((message) => {
  console.log(message);
  return mongoose.connection.close();
});

process.on(process.env.PROCESS_SIGINT, () => {
  connectionClose_Callbackified(process.env.MESSAGE_SIGINT, () => {
    process.exit(0);
  });
});

process.on(process.env.PROCESS_SIGTERM, () => {
  callbackified_ConnectionClose(process.env.MESSAGE_SIGTERM, () => {
    process.exit(0);
  });
});

process.once(process.env.PROCESS_SIGUSR2, () => {
  callbackified_ConnectionClose(process.env.MESSAGE_SIGUSR2, () => {
    process.exit(0);
  });
});
