const express = require('express');
const createHealthcheckMiddleware = require('healthcheck-ping');

const port = process.env.PORT || 3000;
const app = express();

app.use(createHealthcheckMiddleware());
app.use(express.static('build'));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${port}`);
});
