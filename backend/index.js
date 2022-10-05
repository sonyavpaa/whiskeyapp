import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import whiskiesDAO from "./dao/whiskiesDAO.js";
dotenv.config();

const MongoClient = mongodb.MongoClient;
const ServerApiVersion = mongodb.ServerApiVersion;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await whiskiesDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
