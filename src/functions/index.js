const User = require("../models/signups");
const nodemailer = require("nodemailer");
const Last = require("../models/lastuser");

var index = async (req, res, variables) => {
    variables.forgotemail = "";
    variables.flag2 = false;
    variables.flag = false;
    variables.otp = -1;
    variables.signupobject = undefined;
    variables.signupotp = -1;
    variables.sflag = false;
    variables.lastobject = undefined;
    variables.i = 0;
  try {
    if (variables.user == undefined) {
        variables.user = await Last.findOne({ ip: variables.ipAddress });
        variables.user = await User.findOne({ email: variables.user.email });
    }
    res.redirect("home");
  } catch (error) {
    variables.user = undefined;
    res.render("index");
  }
};

var login = async (req, res, variables) => {
    variables.forgotemail = "";
    variables.flag2 = false;
    variables.flag = false;
    variables.otp = -1;
    variables.signupobject = undefined;
    variables.signupotp = -1;
    variables.sflag = false;
    variables.lastobject = undefined;
  try {
    if (variables.user == undefined) {
        variables.user = await Last.findOne({ ip: variables.ipAddress });
        variables.user = await User.findOne({ email: variables.user.email });
    }
    res.redirect("home");
  } catch (error) {
    variables.user = undefined;
    res.render("login");
  }
};

var signup = async (req, res, variables) => {
    variables.forgotemail = "";
    variables.flag2 = false;
    variables.flag = false;
    variables.otp = -1;
    variables.signupobject = undefined;
    variables.signupotp = -1;
    variables.sflag = false;
  if (variables.user == undefined) res.render("signup", { signupoption: true });
  else {
    res.redirect("home");
  }
};

var resendSignupOTP = function (req, res, variables) {
  if (variables.sflag) {
    variables.signupotp = Math.floor(100000 + Math.random() * 900000);
    sendmail(
    variables.signupotp,
    variables.signupobject.email,
      "Reset Password",
      "Forgot Password"
    );
    res.render("signup", { signupotp: true, message: "otp sent" });
  } else {
    variables.signupobject = undefined;
    variables.signupotp = -1;
    variables.sflag = false;
    res.render("signups", { signupoption: true });
  }
};

var forgetPassword = function (req, res, variables) {
  if (variables.flag) {
    variables.flag2 = false;
    res.render("forgotpassword", { enterotp: true });
  } else {
    variables.flag = false;
    variables.flag2 = false;
    res.render("forgotpassword", { sendemail: true });
  }
};

var forgetPasswordPost = async (req, res, variables) => {
  let emailentered = req.body.email;
  if (emailentered != "") {
    variables.forgotemail = emailentered;
    let founduser = await User.findOne({ email: emailentered });
    if (founduser) {
        variables.otp = Math.floor(100000 + Math.random() * 900000);
        variables.flag = true;
      sendmail(variables.otp, emailentered, "Reset Password", "Forgot Password");
      res.render("forgotpassword", { enterotp: true });
    } else {
        variables.flag = false;
      res.render("forgotpassword", {
        sendemail: true,
        message: "email does not exist",
      });
    }
  } else {
    variables.flag = false;
    res.render("forgotpassword", { sendemail: true });
  }
};

async function sendmail(otp, email, subject, bodystring) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "SmiFe2023178909@gmail.com",
        pass: "fiheqhpgcqelqoct",
      },
    });
    const mailOptions = {
      from: "SmiFe2023178909@gmail.com",
      to: email,
      subject: subject,
      html:
        "<h1>From SmiFe</h1><h2>" +
        bodystring +
        " OTP</h2><h3>" +
        otp.toString() +
        "</h3>",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // console.log("Email has been sent");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

var enterotpPost = async (req, res, variables) => {
  if (variables.flag) {
    let checkotp = req.body.otp;
    checkotp = Number(checkotp);
    if (variables.otp == checkotp) {
        variables.flag2 = true;
      res.render("forgotpassword", { changepassword: true });
    } else {
        variables.flag2 = false;
      res.render("forgotpassword", {
        enterotp: true,
        message: "Incorrect OTP , Enter OTP again",
      });
    }
  } else {
    variables.flag = false;
    variables.flag2 = false;
    res.render("forgotpassword", { sendemail: true });
  }
};

var enterotp = function (req, res, variables) {
  if (variables.flag) {
    if (variables.flag2) {
      res.render("forgotpassword", { changepassword: true });
    } else {
      res.render("forgotpassword", { enterotp: true });
    }
  } else {
    res.render("forgotpassword", { sendemail: true });
  }
};

var resendotp = function (req, res, variables) {
    variables.otp = Math.floor(100000 + Math.random() * 900000);
    variables.flag = true;
  sendmail(variables.otp, variables.forgotemail, "Email Verification", "Email Verification");
  res.render("forgotpassword", { enterotp: true });
};

var signupPost = async (req, res, variables) => {
    variables.forgotemail = "";
    variables.flag2 = false;
    variables.flag = false;
    variables.otp = -1;
  try {
    const password = req.body.password;
    const cpassword = req.body.confirm_password;
    if (password === cpassword) {
      const registerUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
      });
      variables.signupobject = registerUser;
      const lastu = new Last({
        email: req.body.email,
        ip: variables.ipAddress,
      });
      variables.lastobject = lastu;
      variables.signupotp = Math.floor(100000 + Math.random() * 900000);
      variables.sflag = true;
      sendmail(
        variables.signupotp,
        req.body.email,
        "Email Verification",
        "Email Verification"
      );
      res.render("signup", { signupotp: true });
    } else {
        variables.signupobject = undefined;
        variables.signupotp = -1;
        variables.sflag = false;
        variables.lastobject = undefined;
      res.redirect("signups");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

var entersignupotpPost = async function (req, res, variables) {
  if (variables.sflag) {
    let checksotp = req.body.otp;
    if (variables.signupotp == checksotp) {
      const registered = await variables.signupobject.save();
      const lu = await variables.lastobject.save();
      variables.user = variables.signupobject;
      res.status(201).redirect("home");
    } else {
      res.render("signup", { message: "Enter OTP again", signupotp: true });
    }
  } else {
    variables.signupobject = undefined;
    variables.signupotp = -1;
    variables.sflag = false;
    variables.lastobject = undefined;
    res.redirect("signups");
  }
};

module.exports = {index, login, signup, resendSignupOTP, forgetPassword, forgetPasswordPost, enterotpPost, enterotp, resendotp, signupPost, entersignupotpPost};