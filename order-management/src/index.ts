import express from "express";
import '../config/connect';
import cors from "cors";
import cookieParser from "cookie-parser";
import router from './routes/payment';
import orderRoutes from './routes/order';
import promoRoutes from './routes/promo';

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
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/order", router);
app.use("/order", orderRoutes);
app.use("/order/promo", promoRoutes);

app.listen(process.env.PORT, () =>
  console.log(`server running on port : ${process.env.PORT} \n`)
);


export default app;
