"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("../config/connect");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const payment_1 = __importDefault(require("./routes/payment"));
const order_1 = __importDefault(require("./routes/order"));
const promo_1 = __importDefault(require("./routes/promo"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://arkea-dashboard.vercel.app", "https://main.d20ufs6pozcpwc.amplifyapp.com"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use("/order", payment_1.default);
app.use("/order", order_1.default);
app.use("/order/promo", promo_1.default);
app.listen(process.env.PORT, () => console.log(`server running on port : ${process.env.PORT} \n`));
exports.default = app;
//# sourceMappingURL=index.js.map