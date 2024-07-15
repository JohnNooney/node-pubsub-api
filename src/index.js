const PubSubClient = require("./PubSubClient");
const express = require("express");
const app = express();
const port = 3000;
const pubSubClient = new PubSubClient('jonida');
var topic;

app.use(express.json());

app.get("/", (req, res) => {
    console.log("Hello world triggered.");

    res.send("Hello World!");
});

app.post("/createTopic", async (req, res) => {
    if (!req.body?.topic) {
        return res.status(400).json({ message: 'Missing required topic field' });
    }

    try {
        topic = await pubSubClient.createTopic(req.body.topic);

        res.status(201).json({ message: 'Topic ' + req.body.topic + ' created.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/createConsumer", (req, res) => {
    res.send("Hello World!");
});

app.post("/sendMessageToTopic", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Node.js listening on port ${port}!`);
});
