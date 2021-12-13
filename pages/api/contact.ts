// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { env } from "config/env.config";

let nodemailer = require("nodemailer");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: env.BURNER_GMAIL,
      pass: env.BURNER_GMAIL_PASSWORD,
    },
    secure: true,
  });
  

  const mailData = {
    from: req.body.email,
    to: "hello@toddchristensen.net",
    subject: `Message From toddchristensen.net ${req.body.name}`,
    text: req.body.body,
    html: `<div>${req.body.body}</div>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) res.status(500).send("Message failed! :( Pleae don't give up. I would love to hear from you!");
  })



}