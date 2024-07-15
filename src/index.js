const PubSubClient = require("./PubSubClient");
const express = require("express");
const app = express();
const port = 3000;
const pubSubClient = new PubSubClient('jonida');

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

app.post("/createConsumer", async (req, res) => {
    if (!req.body?.topic) {
        return res.status(400).json({ message: 'Missing required topic field' });
    }
    if (!req.body?.consumerName) {
        return res.status(400).json({ message: 'Missing required consumer name field' });
    }

    try {
        topic = await pubSubClient.createSubscriptionOnTopic(req.body.consumerName, req.body.topic);

        res.status(201).json({ message: 'Consumer on topic: ' + req.body.topic + ' created.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error });
    }
});

app.post("/sendMessageToTopic", async (req, res) => {
    if (!req.body?.topic) {
        return res.status(400).json({ message: 'Missing required topic field' });
    }
    if (!req.body?.message) {
        return res.status(400).json({ message: 'Missing required message field' });
    }

    try {
        topic = await pubSubClient.sendMessageToTopic(req.body.message, req.body.topic);

        res.status(201).json({ message: 'Message: ' + req.body.message + ' sent on topic: ' + req.body.topic });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error });
    }
});

app.listen(port, () => {
  console.log(`Node.js listening on port ${port}!`);
});
