import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}

const app = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(' DevCircle Backend is running!');
});

mongoose.connect(process.env.MONGO_URI) 
.then(() => {
  console.log(' MongoDB Connected');
  app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
})
.catch((error) => console.error(' MongoDB Error:', error));