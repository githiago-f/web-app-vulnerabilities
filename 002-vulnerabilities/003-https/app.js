import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('<h1>Hello from the other side!</h1>');
});
app.post('/', (req, res) => {
    const message = req.body.message;
    console.log('Received this message: ' + message);
    res.send('Message: ' + message);
});

export default app;
