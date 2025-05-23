import express from "express";
import '../config/connect';
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRouter";
import customerRoute from "./routes/customersRouter";
import adminRoute from "./routes/adminRouter";

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


// routes
app.use("/user", authRoute); // auth route
app.use("/user/customer", customerRoute); // customer handling route

app.use("/user/admin", adminRoute); // admin handling route

app.listen(4002, () =>
  console.log(`server running on port : ${process.env.PORT} \n`)
);


export default app;