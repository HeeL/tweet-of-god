import sendTweet from '../../../server/sendTweet';

describe('sendTweet', () => {
    it('responses in json format with status ok', async () => {
        const req = { query: { tweetText: 'foozzz' } };
        const res = { json: jest.fn() };
        const postTweetStub = jest.fn().mockResolvedValue();
        const TwitterClientStub = jest.fn(() => ({ postTweet: postTweetStub }));
        await sendTweet(TwitterClientStub, req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        const { status } = res.json.mock.calls[0][0];
        expect(status).toEqual('ok');
    });

    it('responses with requested tweetText and hashtag at the end', async () => {
        const req = { query: { tweetText: 'foo bar' } };
        const res = { json: jest.fn() };
        const postTweetStub = jest.fn().mockResolvedValue();
        const TwitterClientStub = jest.fn(() => ({ postTweet: postTweetStub }));
        await sendTweet(TwitterClientStub, req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        const { tweetText } = res.json.mock.calls[0][0];
        expect(tweetText).toEqual('foo bar #tweetofgod');
    });

    it('removes spaces from the beginning and from the end of the tweet', async () => {
        const req = { query: { tweetText: '            zzz bar              ' } };
        const res = { json: jest.fn() };
        const postTweetStub = jest.fn().mockResolvedValue();
        const TwitterClientStub = jest.fn(() => ({ postTweet: postTweetStub }));
        await sendTweet(TwitterClientStub, req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        const { tweetText } = res.json.mock.calls[0][0];
        expect(tweetText).toEqual('zzz bar #tweetofgod');
    });

    it('ignores spaces at the beginning and the end of the tweetText', () => {
        const req = { query: { tweetText: '       fo      ' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnValue({ end: () => {} }) };
        const postTweetStub = jest.fn().mockResolvedValue();
        const TwitterClientStub = jest.fn(() => ({ postTweet: postTweetStub }));
        sendTweet(TwitterClientStub, req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.statusMessage).toEqual('This tweet is way too short');
    });

    it('sends the tweet', () => {
        const postTweetStub = jest.fn().mockResolvedValue();
        const TwitterClientStub = jest.fn(() => ({ postTweet: postTweetStub }));

        const req = { query: { tweetText: '   xyz ' } };
        const res = { json: jest.fn() };
        sendTweet(TwitterClientStub, req, res);

        expect(postTweetStub).toHaveBeenCalledTimes(1);
        expect(postTweetStub).toHaveBeenCalledWith('xyz #tweetofgod');
    });

    it('responses with 400 and error message if requested text is 2 characters', () => {
        const req = { query: { tweetText: 'fo' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnValue({ end: () => {} }) };
        sendTweet(null, req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.statusMessage).toEqual('This tweet is way too short');
    });

    it('sends NO tweet when error occurred', () => {
        const req = { query: { tweetText: 'fo' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnValue({ end: () => {} }) };
        const TwitterClientStub = jest.fn();
        sendTweet(TwitterClientStub, req, res);

        expect(TwitterClientStub).toHaveBeenCalledTimes(0);
    });

    it('responses with 500 when rejection occurred while sending tweet', () => {
        const postTweetStub = jest.fn().mockRejectedValue();
        const TwitterClientStub = jest.fn(() => ({ postTweet: postTweetStub }));

        const req = { query: { tweetText: '   xyz ' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnValue({ end: () => {} }) };
        sendTweet(TwitterClientStub, req, res);

        expect(postTweetStub).toHaveBeenCalledTimes(1);
        expect(postTweetStub).toHaveBeenCalledWith('xyz #tweetofgod');
    });
});
