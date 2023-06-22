const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const IP = require("ip");
const paypal = require("paypal-rest-sdk");

var {index, login, signup, resendSignupOTP, forgetPassword, forgetPasswordPost, enterotpPost, enterotp, resendotp, signupPost, entersignupotpPost} = require("./functions/index");
var {pay, success, cancel} = require("./functions/payment");
var {home, vendorDetailsForm, profile, productForm, logout, forgotPassword, changePasswordPost, removefromcartPost, search, productFormPost, profilePost, vendorDetailsFormPost, loginPost} = require("./functions/user");
var {buy, buyOption, cart, buyPost, prev, next} = require("./functions/purchasing");

const app = express();
require("./db/conn");

//PAYPAL
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "Ad3bpvG7gO8ZN7Ti9DCXtjzGnaZbj9vWa9-GdPSJQsSRmwbuq8axTQw3FhucgvkbMUnTsl47qP7ltwyk",
  client_secret:
    "EFlTBDJwU2OrOxBto__FV4N8wDw35a_Nf3pvTVIHbIQz3Hf6sqGo3PIkVgfBHnpzvY_zIEqPMbyxW1fh",
});

const { json } = require("express");
const { default: mongoose } = require("mongoose");

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../views");
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

var variables = {
  ipAddress: IP.address(),
  user: undefined,
  i: 0,
  total_products: 0,
  prod: [],
  totalprice: 0,
  signupobject: undefined,
  signupotp: -1,
  sflag: false,
  lastobject: undefined,
  forgotemail: "",
  cartbuy: false,
  flag2: false,
  flag: false,
  otp: -1,
};

//all get API
app.get("/", (req, res)=>{
  index(req, res, variables);
});

app.get("/login", (req, res)=>{
  login(req, res, variables);
});

app.get("/signups", (req, res)=>{
  signup(req, res, variables);
});

app.get("/resendsignupotp", (req, res)=>{
  resendSignupOTP(req, res, variables);
});

app.get("/sell_form_product_details", (req, res)=>{
  vendorDetailsForm(req, res, variables);
});

app.get("/sell_form_vendor_details", (req, res)=>{
  productForm(req, res, variables);
});

app.get("/home",(req, res)=>{
  home(req, res, variables);
});

app.get("/buyoption", (req, res)=>{
  buyOption(req, res, variables);
});

app.get("/buy", (req, res)=>{
  buy(req, res, variables);
});

app.get("/cart", (req, res)=>{
  cart(req, res, variables);
});

app.get("/profile", (req, res)=>{
  profile(req, res, variables);
});

app.get("/forgotpassword", (req, res)=>{
  forgotPassword(req, res, variables);
});

app.get("/logout", (req, res)=>{
  logout(req, res, variables);
});

app.get("/forgetpassword", (req, res)=>{
  forgetPassword(req, res, variables);
});

app.get("/enterotp", (req, res)=>{
  enterotp(req, res, variables);
});

app.get("/resendotp", (req, res)=>{
  resendotp(req, res, variables);
});

app.get("/success", (req, res)=>{
  success(req, res, variables);
});

app.get("/cancel", (req, res)=>{
  cancel(req, res, variables);
});

app.get("*", (req, res) => {
  variables.flag2 = false;
  variables.flag = false;
  variables.otp = -1;
  res.render("error404");
});

//all post API
app.post("/signups", (req, res)=>{
  signupPost(req, res, variables);
});

app.post("/entersignupotp", (req, res)=>{
  entersignupotpPost(req, res, variables);
});

app.post("/login", (req, res)=>{
  loginPost(req, res, variables);
});

app.post("/sell_form_product_details", (req, res)=>{
  productFormPost(req, res, variables);
});

app.post("/sell_form_vendor_details", (req, res)=>{
  vendorDetailsFormPost(req, res, variables);
});

app.post("/next", (req, res)=>{
  next(req, res, variables);
});

app.post("/prev", (req, res)=>{
  prev(req, res, variables);
});

app.post("/profile", (req, res)=>{
  profilePost(req, res, variables);
});

app.post("/search", (req, res)=>{
  search(req, res, variables);
});

app.post("/buy", (req, res)=>{
  buyPost(req, res, variables);
});

app.post("/removefromcart", (req, res)=>{
  removefromcartPost(req, res, variables);
});

app.post("/forgetpassword", (req, res)=>{
  forgetPasswordPost(req, res, variables);
});

app.post("/enterotp", (req, res)=>{
  enterotpPost(req, res, variables);
});

app.post("/changepassword", (req, res)=>{
  changePasswordPost(req, res, variables);
});

app.post("/pay", (req, res)=>{
  pay(req, res, variables);
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
