const express = require("express");
const axios = require("axios");

const { connectDb } = require("./db");
const { port, host, db, apiUrl } = require("./config");

const app = express();

app.get("/test", (req, res) => {
  res.send("auth test route");
});

app.get("/testwithapidata", (req, res) => {
  axios.get(apiUrl + '/testapidata').then(response => {
    res.json({
      testapidata: response.data.testwithapi
    });
  })
});

app.get("/api/currentUser", (req, res) => {
  res.json({
    id: "1234",
    email: 'foo@mail.com'
  });
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
