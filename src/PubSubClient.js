// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

export class PubSubClient
{
    constructor(projectId)
    {
        this.client = new PubSub({projectId});
    }

    async createTopic(topicNameOrId = 'my-topic')
    {
        const [topic] = await this.client.createTopic(topicNameOrId);
        console.log(`Topic ${topic.name} created.`);

        return topic;
    }

    async createSubscriptionOnTopic (subscriptionName = 'my-sub', topic) 
    {
        // Creates a subscription
        const [subscription] = await topic.createSubscription(subscriptionName);
      
        subscription.on('message', this.onSubscriptionSuccessCallback);
        subscription.on('error', this.onSubscriptionErrorCallback);
    }

    async sendMessageToTopic(topic)
    {
        // Send a message to the topic
        topic.publishMessage({data: Buffer.from('Test message!')});
    }

    onSubscriptionSuccessCallback(message)
    {
        console.log('Received message:', message.data.toString());
        process.exit(0);
  
    }

    onSubscriptionErrorCallback(error)
    {
        console.error('Received error:', error);
          process.exit(1);
    }

}
