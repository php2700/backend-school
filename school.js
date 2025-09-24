import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import adminRouter from './src/Routes/adminRoute.js';
import connectDb from './db/index.js';
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import userRouter from './src/Routes/userRoute.js';

const app = express();
connectDb()
app.use(express.json())
app.use(cors())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/public", express.static(path.join(__dirname, "public")))

app.use("/api/admin", adminRouter)
app.use("/api/user",userRouter)

app.get("/", (req, res) => {
    res.json({ message: "api is running" })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'something went wrong' })
})

const port = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log(`server is running at this port ${port} `)
})