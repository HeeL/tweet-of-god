import sendTweet from '../../../server/sendTweet';

describe('sendTweet', () => {
    it('response in json with status ok', () => {
        const req = { query: {} };
        const res = { json: jest.fn() };
        sendTweet(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        const { status } = res.json.mock.calls[0][0];
        expect(status).toEqual('ok');
    });

    it('response contains requested tweetText with hashtag at the end', () => {
        const req = { query: { tweetText: 'foo bar' } };
        const res = { json: jest.fn() };
        sendTweet(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        const { tweetText } = res.json.mock.calls[0][0];
        expect(tweetText).toEqual('foo bar #tweetofgod');
    });
});
