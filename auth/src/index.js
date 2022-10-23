const express = require("express");

const { connectDb } = require("./db");
const { port, host, db } = require("./config");

const app = express();

app.get("/test", (req, res) => {
  res.send("auth test route");
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`auth listen port on ${port} port`);
    console.log(`on host ${host}`);
    console.log(`on database ${db}`);
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
