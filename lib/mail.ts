//import { Resend } from "resend";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { readFileSync, promises as fs } from "fs";
import path from "path";

import { confirmTemplate } from "@/emails/confirm-email";
import { resetTemplate } from "@/emails/reset-email";
import { twoFactorTemplate } from "@/emails/two-factor-email";
//const resend = new Resend(process.env.RESEND_API_KEY);

//const adress = process.env.EMAIL_SENDING_ADRESS as string;

const domain = process.env.NEXT_PUBLIC_APP_URL;

/* export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    //from: "mail@auth-masterclass-tutorial.com",
    from: adress,
    to: email,
    subject: "2FA Code",
    html: `<p>Your two factor authentication code: ${token}</p>`,
  });
}; */

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  //console.log("transporter: ", transporter);
  // verify connection configuration
  try {
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        console.log("verify connection configuration");
        if (error) {
          console.log("error:", error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    /*    console.log("process.cwd(): ", process.cwd());
    const emailFile = readFileSync(
      process.cwd() + "/emails/two-factor-email.html",
      {
        encoding: "utf8",
      }
    );
    //console.log("emailFile: ", emailFile);
    const emailTemplate = Handlebars.compile(emailFile); */
    const emailTemplate = Handlebars.compile(twoFactorTemplate);

    let mailOptions = {
      from: `My marketplace <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Your two factor authentication code",
      text: "Your two factor authentication code:" + token,
      html: emailTemplate({
        base_url: domain,
        code: token,
        email: email,
      }),
    };
    // html: `Click on the link to reset the password ${link}`, //new
    //console.log("mailOptions: ", mailOptions);

    const prom = new Promise((resolve, reject) => {
      //return resolve("info"); //REMOVE
      transporter.sendMail(mailOptions, (err, info) => {
        console.log("Email sent: " + info.response);
        if (err) {
          console.error(err);
          return reject(err);
        } else {
          //console.log("info from transporter.sendMail", info);
          return resolve(info);
        }
      });
    });

    try {
      const result = await prom;
      console.log("result from verification email prom: ", result);
      return "success";
    } catch (error) {
      console.log("error from verification email prom: ", error);
      return "error";
    }
  } catch (error) {
    return "error";
  }
};

/* export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    //from: "mail@auth-masterclass-tutorial.com",
    from: adress,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
}; */

export const sendPasswordResetEmail = async (email: string, token: string) => {
  /*  console.log(
    "email, callbackUrl, token from sendVerificationEmail: ",
    email,
    callbackUrl,
    token
  ); */
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  console.log("confirmLink from sendVerificationEmail: ", resetLink);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  //console.log("transporter: ", transporter);
  // verify connection configuration
  try {
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        console.log("verify connection configuration");
        if (error) {
          console.log("error:", error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    /*  console.log("process.cwd(): ", process.cwd());
    const emailFile = readFileSync(process.cwd() + "/emails/reset-email.html", {
      encoding: "utf8",
    });
    //console.log("emailFile: ", emailFile);
    const emailTemplate = Handlebars.compile(emailFile); */
    const emailTemplate = Handlebars.compile(resetTemplate);

    let mailOptions = {
      from: `My marketplace <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Reset your password",
      text: resetLink,
      html: emailTemplate({
        base_url: domain,
        signin_url: resetLink,
        email: email,
      }),
    };
    // html: `Click on the link to reset the password ${link}`, //new
    //console.log("mailOptions: ", mailOptions);

    const prom = new Promise((resolve, reject) => {
      //return resolve("info"); //REMOVE
      transporter.sendMail(mailOptions, (err, info) => {
        console.log("Email sent: " + info.response);
        if (err) {
          console.error(err);
          return reject(err);
        } else {
          //console.log("info from transporter.sendMail", info);
          return resolve(info);
        }
      });
    });

    try {
      const result = await prom;
      console.log("result from verification email prom: ", result);
      return "success";
    } catch (error) {
      console.log("error from verification email prom: ", error);
      return "error";
    }
  } catch (error) {
    return "error";
  }
};

/* export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    //from: "mail@auth-masterclass-tutorial.com",
    // from: "lap04635@gmail.com",
    from: adress,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
}; */

export const sendVerificationEmail = async (
  email: string,
  token: string,
  callbackUrl: string | null | undefined
) => {
  /*  console.log(
    "email, callbackUrl, token from sendVerificationEmail: ",
    email,
    callbackUrl,
    token
  ); */
  const confirmLink = `${domain}/auth/new-verification?token=${token}&email=${email}${
    callbackUrl ? `&callbackUrl=${callbackUrl}` : ""
  }`;

  console.log("confirmLink from sendVerificationEmail: ", confirmLink);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  //console.log("transporter: ", transporter);
  // verify connection configuration
  try {
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        console.log("verify connection configuration");
        if (error) {
          console.log("error:", error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    //console.log("process.cwd(): ", process.cwd());
    /*     const jsonPath = path.join(process.cwd(), "public", "about.txt");
    const textFile1 = readFileSync(jsonPath, "utf8");

    const file = readFileSync(process.cwd() + "/app/about2.txt", "utf8");
    console.log("file: ", file.slice(0, 200));

    const textFile2 = await fs.readFile(path.resolve("about.txt"), "utf8");
    console.log("textFile2: ", textFile2.slice(0, 100));

    console.log("textFile1: ", textFile1.slice(0, 100));
    const textFile = readFileSync(path.join(process.cwd(), "about.txt"), {
      encoding: "utf8",
    });
    console.log("textFile: ", textFile.slice(0, 100));

    const emailsDir = path.join(process.cwd(), "emails");
    console.log("emailsDir: ", emailsDir);
    const emailFile = readFileSync(path.join(emailsDir, "confirm-email.html"), {
      encoding: "utf8",
    });

      const emailFile = readFileSync(
      process.cwd() + "/emails/confirm-email.html",
      {
        encoding: "utf8",
      }
    ); 
    console.log("emailFile: ", emailFile.slice(0, 100)); */

    const emailTemplate = Handlebars.compile(confirmTemplate);

    let mailOptions = {
      from: `My marketplace <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Confirm your email",
      text: confirmLink,
      html: emailTemplate({
        base_url: domain,
        signin_url: confirmLink,
        email: email,
      }),
    };
    // html: `Click on the link to reset the password ${link}`, //new
    //console.log("mailOptions: ", mailOptions);

    const prom = new Promise((resolve, reject) => {
      //return resolve("info"); //REMOVE
      transporter.sendMail(mailOptions, (err, info) => {
        console.log("Email sent: " + info.response);
        if (err) {
          console.error(err);
          return reject(err);
        } else {
          //console.log("info from transporter.sendMail", info);
          return resolve(info);
        }
      });
    });

    try {
      const result = await prom;
      console.log("result from verification email prom: ", result);
      return "success";
    } catch (error) {
      console.error("error from verification email prom: ", error);
      return "error";
    }
  } catch (error) {
    console.error("error from verification email sending: ", error);
    return "error";
  }
};

/* export const NEWsendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  console.log("confirmLink from sendVerificationEmail: ", confirmLink);

  const transporter = nodemailer.createTransport({
    service: "gmail", //old
    port: 465, //new
    host: "smtp.gmail.com", //new
    secure: true, //new
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  //console.log("transporter: ", transporter);
  // verify connection configuration
  try {
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        console.log("verify connection configuration");
        if (error) {
          console.log("error:", error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    let mailOptions = {
      from: `Auth tut ${process.env.EMAIL_FROM}`,
      to: email,
      subject: "Confirm email",
      text: confirmLink,
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    };
    // html: `Click on the link to reset the password ${link}`, //new
    //console.log("mailOptions: ", mailOptions);

    const prom = await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
        console.log("Email sent: " + info.response);
        if (err) {
          console.error(err);
          reject(err);
          //return "error";
        } else {
          // res          .status(200)          .send({ message: "Success from transporter.sendMail" });
          //console.log("info from transporter.sendMail", info);
          resolve(info);
          //return "success";
        }
      });
    });
    console.log(" result of verification email sending: ", prom);
    if (prom.accepted && prom.accepted?.length > 0) {
      return "success";
    } else {
      return "error";
    }
  } catch (error) {
    return "error";
  }
};
 */
