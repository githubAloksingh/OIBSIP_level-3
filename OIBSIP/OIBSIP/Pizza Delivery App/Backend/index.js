import mongoose from "mongoose";
import app from "./app.js";
import config from "./src/config/index.js";
(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("DB CONNECTED");

    app.on("error", (error) => {
      console.log(error);
    });

    const onListening = () => {
      console.log(`Listening to port ${config.PORT}`);
    };
    app.listen(config.PORT, onListening);
  } catch (error) {
    console.error(error);
    throw error;
  }
})();
