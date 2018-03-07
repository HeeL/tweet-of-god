module.exports = (req, res) => {
    const requestedTweetText = (req.query.tweetText || '').trim();
    if (requestedTweetText.length < 3) {
        res.status(400);
        res.json({ errorMessage: 'This tweet is way too short' });
    } else {
        const tweetText = `${requestedTweetText} #tweetofgod`;
        res.json({ status: 'ok', tweetText });
    }
};
