const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

const posts = {};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());


app.post("/create-posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios
    .post("http://event-bus-srv:4009/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Post:Received Event: ", req.body.type);

  res.send({});
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  delete posts[id];
  res.status(200).send("Post deleted");
});

app.listen(4004, () => {
  console.log("Serer Listening on 4004");
});
