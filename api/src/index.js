const express = require("express");
const mongoose = require("mongoose");

const { connectDb } = require("./db");
const { port, host, db } = require("./config");

const app = express();

app.get("/test", (req, res) => {
  res.send("Api test route");
});

const postSchema = new mongoose.Schema({ name: String });
const Post = mongoose.model("Post", postSchema);

const startServer = () => {
  app.listen(port, () => {
    console.log(`listen port on ${port} port`);
    console.log(`on host ${host}`);
    console.log(`on database ${db}`);

    const silence = new Post({ name: "Silence" });
    silence.save((err, savedSilence) => {
      if (err) return console.log(err);
      console.log("savedSilence with", savedSilence);
    });
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
