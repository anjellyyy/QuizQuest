import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRouts.js';
import resultRouter from './routes/resultRoutes.js';

const app=express();
const port = process.env.PORT || 4000;


// MIDDLEWARE
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://quizquest-1-bhru.onrender.com",
    "https://quizquest-jdql.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/auth', userRouter);
app.use('/api/results', resultRouter);

app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});