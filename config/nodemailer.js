import { createTransport } from "nodemailer";
import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } from "./env.js";


export const transporter= createTransport({
    service : 'gmail',
    auth : {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD
    },
    
})