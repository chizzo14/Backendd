"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarMail = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var config = require('../../config.js');
// Name	Donavon Sanford
var transporter = nodemailer_1.default.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: config.NODEMAILER_ETHEREAL_USER,
        pass: config.NODEMAILER_ETHEREAL_PASS
    }
});
var enviarMail = function (asunto, mensaje, cb) {
    var mailOptions = {
        from: 'Servidor Ecommerce Coder Guille Ferrucci',
        to: config.NODEMAILER_GMAIL_USER,
        subject: asunto,
        html: mensaje
    };
    transporter.sendMail(mailOptions, function (err, info) {
        cb(err, info);
    });
};
exports.enviarMail = enviarMail;
