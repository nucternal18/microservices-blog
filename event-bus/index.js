const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);

  
  
  try {
    await axios.post("http://comments-clusterip-srv:4001/events", event);
    await axios.post("http://posts-clusterip-srv:4004/events", event)
    await axios.post("http://query-clusterip-srv:4005/events", event);
    await axios.post("http://moderation-clusterip-srv:4003/events", event);
    res.send({ status: "OK" });
    
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4009, () => {
  console.log("Serer Listening on 4009");
});
