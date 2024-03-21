const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const status = require('./routes/global/status');
const verification = require('./routes/discord/verification');
const nickname = require('./routes/discord/nickname');
const roles = require('./routes/discord/roles');
const checkuser = require('./routes/discord/checkuser');
const tokenHandler = require('./routes/global/tokenHandler');
require("dotenv").config();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const { connectDB } = require('./utils/database/databaseHandler');
connectDB();

app.use('/api/v3', status);
app.use('/api/v3', tokenHandler);
app.use('/api/v3/user/discord', verification);
app.use('/api/v3/user/discord', nickname);
app.use('/api/v3/user/discord', roles);
app.use('/api/v3/user/discord', checkuser);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});