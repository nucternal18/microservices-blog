const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

const comments = {};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  const id = req.params.id;
  const commentsByPostId = comments[id] || [];

  res.send(commentsByPostId);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const id = req.params.id;
  const { content } = req.body;

  const commentsByPostId = comments[id] || [];
  commentsByPostId.push({ id: commentId, content, status: "pending" });

  comments[id] = commentsByPostId;

  axios
    .post("http://event-bus-srv:4009/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: id,
        status: "pending",
      },
    })
    .catch((err) => {});

  res.status(201).send(commentsByPostId);
})

app.post("/events", async (req, res) => {
  console.log("Comments:Received Event: ", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const commentsByPostId = comments[postId];

    const comment = commentsByPostId.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;

    await axios
      .post("http://event-bus-srv:4009/events", {
        type: "CommentUpdated",
        data: {
          id,
          status,
          postId,
          content,
        },
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Serer Listening on 4001");
});
