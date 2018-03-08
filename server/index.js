const express = require('express');
const sendTweet = require('./sendTweet');
const TwitterClient = require('../lib/TwitterClient');
const createHealthcheckMiddleware = require('healthcheck-ping');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

app.use(createHealthcheckMiddleware());
app.use(express.static('build'));

app.get('/sendTweet', sendTweet.bind(null, TwitterClient));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${port}`);
});
