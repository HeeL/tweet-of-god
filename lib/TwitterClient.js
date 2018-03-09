const Twit = require('twit');

class TwitterClient {
    constructor(TwitClient = Twit) {
        this.client = new TwitClient({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token: process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_ACESS_TOKEN_SECRET
        });
    }

    postTweet(status) {
        return this.client.post('statuses/update', { status });
    }
}

module.exports = TwitterClient;
