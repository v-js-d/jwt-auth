import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router';
import errorMiddleware from './middlewares/error-middleware';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true,
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL || '');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${ PORT }`);
        })

    } catch (error) {
        console.log(error);
    }
}

start()
