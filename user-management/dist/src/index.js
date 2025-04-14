"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("../config/connect");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const customersRouter_1 = __importDefault(require("./routes/customersRouter"));
const adminRouter_1 = __importDefault(require("./routes/adminRouter"));
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
// routes
app.use("/user", authRouter_1.default); // auth route
app.use("/user/customer", customersRouter_1.default); // customer handling route
app.use("/user/admin", adminRouter_1.default); // admin handling route
app.listen(4002, () => console.log(`server running on port : ${process.env.PORT} \n`));
exports.default = app;
//# sourceMappingURL=index.js.map