"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfimationEmail = exports.deleveredOrder = void 0;
const nodemailer_1 = require("nodemailer");
const transporter = (0, nodemailer_1.createTransport)({
    service: 'gmail',
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});
new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
        if (error) {
            reject(error);
        }
        else {
            resolve(success);
        }
    });
});
const deleveredOrder = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve, reject) => {
        transporter.sendMail({
            to: email,
            subject: "Order Delivery Confirmation",
            html: `
            <!DOCTYPE html>
<html>
<head>
  <title>Order Delivery Confirmation</title>
  <style>
    /* Add your custom CSS styles here */
  </style>
</head>
<body>
  <h1>Order Delivery Confirmation</h1>
  
  <p>Dear User,</p>
  
  <p>We are pleased to inform you that your order has been successfully delivered to the following address:</p>
  
  <p>[Shipping Address]</p>
  
  <p>Order Details:</p>
  
  <p>If you have any questions or concerns regarding your order, please don't hesitate to contact our customer support team. Thank you for choosing our services!</p>
  
  <p>Sincerely,<br>
  ARkea Team</p>
</body>
</html>

            `
        }, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(info);
            }
        });
    });
});
exports.deleveredOrder = deleveredOrder;
const sendConfimationEmail = (order, email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve, reject) => {
        transporter.sendMail({
            to: email,
            subject: "Order Confirmation",
            html: `
            
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order Confirmation</title>
        <style>
          /* Add your custom CSS styles here */
        </style>
      </head>
      <body>
        <h1>Order Confirmation</h1>
        
        <p>Dear [Customer Name],</p>
        
        <p>Thank you for your order! We are excited to let you know that your order has been received and is being processed. Below are the details of your order:</p>
        
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
          ${order.productCard.map(item => `<tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price} $</td>
          <td>${item.quantity * item.price}</td>
        </tr>`)}
           
          </tbody>
        </table>
      
        <p>Your total order amount is: ${order.amount} $</p>
        
        <p>We will notify you once your order has been shipped. If you have any questions or need further assistance, please feel free to contact our customer support team.</p>
        
        <p>Thank you for choosing our services!</p>
        
        <p>Sincerely,<br>
        ARkea Team</p>
      </body>
      </html>
                        `,
        }, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(info);
            }
        });
    });
});
exports.sendConfimationEmail = sendConfimationEmail;
//# sourceMappingURL=sendConfirmationEmail.js.map