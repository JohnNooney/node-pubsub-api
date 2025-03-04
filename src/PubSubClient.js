const {PubSub} = require('@google-cloud/pubsub');

class PubSubClient
{
    constructor(projectId)
    {
        this.client = new PubSub({projectId});
        this.initSubscriptions();
    }
    
    async initSubscriptions()
    {
        try {
            const [subscriptions] = await this.client.getSubscriptions();
            
            console.log('Initializing Subscriptions:');
            subscriptions.forEach(subscription => {
                subscription.on('message', this.onSubscriptionSuccessCallback);
                subscription.on('error', this.onSubscriptionErrorCallback);
                
                console.log(subscription.name + " callbacks assigned.");
            });
        } catch (error) {
            console.error(`Received initializing subscriptions: ${error.message}`);
        }
    }

    async createTopic(topicNameOrId)
    {
        try {
            const [topic] = await this.client.createTopic(topicNameOrId);
            console.log(`Topic ${topic.name} created.`);
        } catch(error) {
            console.error(`Received error creating topic : ${error.message}`);
            throw new Error(error.message);
        }
    }

    async createSubscriptionOnTopic (subscriptionName, topicNameOrId) 
    {
        try {
            const [subscription] = await this.client.topic(topicNameOrId).createSubscription(subscriptionName);
            subscription.on('message', this.onSubscriptionSuccessCallback);
            subscription.on('error', this.onSubscriptionErrorCallback);

            console.log(`Consumer ${subscription.name} created on topic ${topicNameOrId}`);
        } catch(error) {
            console.error(`Received error creating subscription : ${error.message}`);
            throw new Error(error.message);
        }
    }

    async sendMessageToTopic(message, topicNameOrId)
    {
        try {
            const messageId = await this.client
                .topic(topicNameOrId)
                .publishMessage({data: Buffer.from(message)});

            console.log(`Message: \"${messageId}\" sent to topic ${topicNameOrId}.`);
        } catch(error) {
            console.error(`Received error while publishing: ${error.message}`);
            throw new Error(error.message);
        }
    }

    onSubscriptionSuccessCallback(message)
    {
        console.log('Received message:', message.data.toString());
    }

    onSubscriptionErrorCallback(error)
    {
        console.error('Received error:', error);
    }

}

module.exports = PubSubClient;