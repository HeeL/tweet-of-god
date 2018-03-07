module.exports = (req, res) => {
    const requestedTweetText = (req.query.tweetText || '').trim();
    if (requestedTweetText.length < 3) {
        res.statusMessage = 'This tweet is way too short';
        res.status(400).end();
    } else {
        const tweetText = `${requestedTweetText} #tweetofgod`;
        res.json({ status: 'ok', tweetText });
    }
};
