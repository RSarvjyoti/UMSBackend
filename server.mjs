import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.mjs";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middlewares/errorMiddleware.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import eventRoutes from "./routes/eventRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import { requestLogger } from "./utils/logger.mjs";

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

config();

const PORT = process.env.PORT || 600
const DB_URL = process.env.MONGO_URI
const app = express();
app.use(express.json());

app.use(requestLogger);

app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

app.use(errorHandler)

app.get('/', (req, res) => {
    res.send("This is home route");
})

app.listen(PORT, async ()=> {
    try{
       await connectDB(DB_URL)

       console.log('Database connected successfully')
       console.log(`Server is runing at http://localhost:${PORT}`);
    }catch(err) {
        console.log(err);
    }
})