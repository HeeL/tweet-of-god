module.exports = (req, res) => {
    const tweetText = `${req.query.tweetText} #tweetofgod`;

    res.json({ status: 'ok', tweetText });
};
