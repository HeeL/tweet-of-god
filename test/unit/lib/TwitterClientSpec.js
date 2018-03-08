import TwitterClient from '../../../lib/TwitterClient';

describe('TwitterClient', () => {
    process.env = {
        TWITTER_CONSUMER_KEY: 'foo 1',
        TWITTER_CONSUMER_SECRET: 'foo nzzz 2',
        TWITTER_ACCESS_TOKEN: 'foo test 3',
        TWITTER_ACESS_TOKEN_SECRET: 'zzz bar 4'
    };

    it('is able to create a new instance', () => {
        const twitterClient = new TwitterClient();

        expect(twitterClient).toBeInstanceOf(TwitterClient);
    });

    it('passes config using env variables data to a client', () => {
        const clientStub = jest.fn();
        const expectedConfig = {
            access_token: 'foo test 3',
            access_token_secret: 'zzz bar 4',
            consumer_key: 'foo 1',
            consumer_secret: 'foo 1'
        };
        // eslint-disable-next-line no-new
        new TwitterClient(clientStub);

        expect(clientStub).toHaveBeenCalledTimes(1);
        expect(clientStub).toHaveBeenCalledWith(expectedConfig);
    });

    it('posts passed twitter status with the client', () => {
        const postStub = jest.fn();
        const clientStub = jest.fn().mockImplementation(() => ({ post: postStub }));
        const twitterClient = new TwitterClient(clientStub);
        twitterClient.postTweet('foo barrrrria');

        expect(postStub).toHaveBeenCalledTimes(1);
        expect(postStub).toHaveBeenCalledWith('statuses/update', { status: 'foo barrrrria' });
    });
});
