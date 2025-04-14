import '../config/connect';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import categoryRoute from './routes/category';
import productRoute from './routes/product';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://arkea-dashboard.vercel.app", "https://main.d20ufs6pozcpwc.amplifyapp.com"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true
  })
);

// routes
app.use("/product/category", categoryRoute);
app.use("/product", productRoute);

app.listen(process.env.PORT, () =>
  console.log(`server running on port : ${process.env.PORT} \n`)
);

export default app;
