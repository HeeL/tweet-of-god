const responseWithError = (res, code, message) => {
    res.statusMessage = message;
    return res.status(code).end();
};

const responseWithOk = (res, tweetText) => res.json({ status: 'ok', tweetText });

const prepareTweetText = (tweetText = '') => tweetText.trim();

module.exports = (TwitterClient, req, res) => {
    const requestedTweetText = prepareTweetText(req.query.tweetText);
    if (requestedTweetText.length < 3) {
        return responseWithError(res, 400, 'This tweet is way too short');
    }
    const tweetText = `${requestedTweetText} #tweetofgod`;
    const twitterClient = new TwitterClient();
    return twitterClient
        .postTweet(tweetText)
        .then(responseWithOk.bind(null, res, tweetText))
        .catch(responseWithError.bind(null, res, 500, 'Error while sending tweet'));
};
