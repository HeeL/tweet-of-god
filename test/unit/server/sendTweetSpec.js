import sendTweet from '../../../server/sendTweet';

describe('sendTweet', () => {
    it('responses in json format with status ok', () => {
        const req = { query: { tweetText: 'foozzz' } };
        const res = { json: jest.fn() };
        sendTweet(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        const { status } = res.json.mock.calls[0][0];
        expect(status).toEqual('ok');
    });

    it('responses with requested tweetText and hashtag at the end', () => {
        const req = { query: { tweetText: 'foo bar' } };
        const res = { json: jest.fn() };
        sendTweet(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        const { tweetText } = res.json.mock.calls[0][0];
        expect(tweetText).toEqual('foo bar #tweetofgod');
    });

    it('removes spaces from the beginning and from the end of the tweet', () => {
        const req = { query: { tweetText: '            zzz bar              ' } };
        const res = { json: jest.fn() };
        sendTweet(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
        const { tweetText } = res.json.mock.calls[0][0];
        expect(tweetText).toEqual('zzz bar #tweetofgod');
    });

    it('responses with 400 and error message if requested text is 2 characters', () => {
        const req = { query: { tweetText: 'fo' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnValue({ end: () => {} }) };
        sendTweet(req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.statusMessage).toEqual('This tweet is way too short');
    });

    it('ignores spaces at the beginning and the end of the tweetText', () => {
        const req = { query: { tweetText: '       fo      ' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnValue({ end: () => {} }) };
        sendTweet(req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.statusMessage).toEqual('This tweet is way too short');
    });
});
