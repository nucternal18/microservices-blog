const express = require("express");
const axios = require("axios");

const app = express();

const profaneWords = ["orange", "banana", "fuck", "bitch", "dick head", "cunt"];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
      const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios
      .post("http://event-bus-srv:4009/events", {
        type: "CommentModerated",
        data: {
          ...data,
          status,
        },
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Serer Listening on 4003");
});
