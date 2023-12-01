import express from 'express';
import basicAuth from 'express-basic-auth';
import cors from 'cors';
import { insertFeedback } from './services/redisService.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const authUser = process.env.HTTP_AUTH_USER;
const authPass = process.env.HTTP_AUTH_PASS;

let users = {};
users[authUser] = authPass;

app.use(express.json())
app.use(basicAuth({
    users,
    unauthorizedResponse: {
        message: 'Bad credentials',
    },
}));
app.use(cors({
    allowedHeaders: ['Authorization', 'Content-Type']
}));

app.post('/api/v1/feedback', async (req, res) => {
    // insert into redis
    await insertFeedback(req.body);

    res.status(201).send();
});

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`tiger-transformer-feedback-api listening on port ${port}`);
});
