const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const IP = require("ip");
const nodemailer = require("nodemailer");
const paypal = require("paypal-rest-sdk");

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


/*--------models-------- */
const User = require("./models/signups");
const Product = require("./models/products");
const Vendor = require("./models/vendor_details");
const Last = require("./models/lastuser");
const cartProduct = require("./models/cartuser");
const Order = require("./models/orders");

const { json } = require("express");
const { default: mongoose } = require("mongoose");

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../views");

//global variables in use below
const ipAddress = IP.address();
let user = undefined;
let i = 0;
let total_products = 0;
let prod = [];
let totalprice = 0;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

//all get API
app.get("/", async (req, res) => {
  forgotemail = "";
  flag2 = false;
  flag = false;
  otp = -1;
  signupobject = undefined;
  signupotp = -1;
  sflag = false;
  lastobject = undefined;
  i = 0;
  try {
    if (user == undefined) {
      user = await Last.findOne({ ip: ipAddress });
      user = await User.findOne({ email: user.email });
    }
    res.redirect("home");
  } catch (error) {
    user = undefined;
    res.render("index");
  }
});

app.get("/login", async (req, res) => {
  forgotemail = "";
  flag2 = false;
  flag = false;
  otp = -1;
  signupobject = undefined;
  signupotp = -1;
  sflag = false;
  lastobject = undefined;
  try {
    if (user == undefined) {
      user = await Last.findOne({ ip: ipAddress });
      user = await User.findOne({ email: user.email });
    }
    res.redirect("home");
  } catch (error) {
    user = undefined;
    res.render("login");
  }
});

let signupobject = undefined;
let signupotp = -1;
let sflag = false;
let lastobject = undefined;
app.get("/signups", (req, res) => {
  forgotemail = "";
  flag2 = false;
  flag = false;
  otp = -1;
  signupobject = undefined;
  signupotp = -1;
  sflag = false;
  if (user == undefined) res.render("signup", { signupoption: true });
  else {
    res.redirect("home");
  }
});

app.get('/resendsignupotp', function (req, res) {
  if (sflag) {
    signupotp = Math.floor(100000 + Math.random() * 900000);
    sendmail(signupotp, signupobject.email,'Reset Password','Forgot Password');
    res.render("signup", { signupotp: true, message: "otp sent" });
  }
  else{
    signupobject = undefined;
    signupotp = -1;
    sflag = false;
    res.render("signups", { signupoption: true});
  }
})

app.get("/sell_form_product_details", async (req, res) => {
  i = 0;
  try {
    if (user == undefined) {
      user = await Last.findOne({ ip: ipAddress });
      user = await User.findOne({ email: user.email });
    }
    var vendor = await Vendor.findOne({ email: user.email });
    if (vendor != null) res.render("sell_form_product_details");
    else res.redirect("sell_form_vendor_details");
  } catch (error) {
    user = undefined;
    res.redirect("/");
  }
});

app.get("/sell_form_vendor_details", async (req, res) => {
  i = 0;
  try {
    if (user == undefined) {
      user = await Last.findOne({ ip: ipAddress });
      user = await User.findOne({ email: user.email });
    }
    res.render("sell_form_vendor_details");
  } catch (error) {
    user = undefined;
    res.redirect("/");
  }
});

app.get("/home", async (req, res) => {
  signupobject = undefined;
  signupotp = -1;
  sflag = false;
  lastobject = undefined;
  forgotemail = "";
  flag2 = false;
  flag = false;
  otp = -1;
  i = 0;
  try {
    if (user == undefined) {
      user = await Last.findOne({ ip: ipAddress });
      user = await User.findOne({ email: user.email });
    }
    res.render("home");
  } catch (error) {
    user = undefined;
    res.redirect("/");
  }
});

app.get("/buyoption", async (req, res) => {
  try {
    if (user == undefined) {
      user = await Last.findOne({ ip: ipAddress });
      user = await User.findOne({ email: user.email });
    }
    prod = await Product.find();
    total_products = prod.length;
    res.redirect("buy");
  } catch (error) {
    user = undefined;
    res.redirect("/");
  }
});

app.get("/buy", async (req, res) => {
  if (user == undefined) {
    user = await Last.findOne({ ip: ipAddress });
    if (user == null) {
      res.redirect("/");
    } else {
      user = await User.findOne({ email: user.email });
      if (total_products == 0) res.redirect("buyoption");
      else {
        res.redirect("buy");
      }
    }
  } else {
    let values;
    if (i == total_products - 1) {
      values = {
        img0: prod[i + 0].image,
        product_name0: prod[i + 0].product_name,
        company_name0: prod[i + 0].company,
        about_item0: prod[i + 0].about_item,
        search_tag0: prod[i + 0].tags,
        rate0: prod[i + 0].price,
        product_id0: prod[i + 0]._id,
      };
    } else if (i == total_products - 2) {
      values = {
        img0: prod[i + 0].image,
        product_name0: prod[i + 0].product_name,
        company_name0: prod[i + 0].company,
        about_item0: prod[i + 0].about_item,
        search_tag0: prod[i + 0].tags,
        rate0: prod[i + 0].price,
        product_id0: prod[i + 0]._id,
        img1: prod[i + 1].image,
        product_name1: prod[i + 1].product_name,
        company_name1: prod[i + 1].company,
        about_item1: prod[i + 1].about_item,
        search_tag1: [i + 1].tags,
        rate1: prod[i + 1].price,
        product_id1: prod[i + 1]._id,
      };
    } else if (i == total_products - 3) {
      values = {
        img0: prod[i + 0].image,
        product_name0: prod[i + 0].product_name,
        company_name0: prod[i + 0].company,
        about_item0: prod[i + 0].about_item,
        search_tag0: prod[i + 0].tags,
        rate0: prod[i + 0].price,
        product_id0: prod[i + 0]._id,
        img1: prod[i + 1].image,
        product_name1: prod[i + 1].product_name,
        company_name1: prod[i + 1].company,
        about_item1: prod[i + 1].about_item,
        search_tag1: [i + 1].tags,
        rate1: prod[i + 1].price,
        product_id1: prod[i + 1]._id,
        img2: prod[i + 2].image,
        product_name2: prod[i + 2].product_name,
        company_name2: prod[i + 2].company,
        about_item2: prod[i + 2].about_item,
        search_tag2: prod[i + 2].tags,
        rate2: prod[i + 2].price,
        product_id2: prod[i + 2]._id,
      };
    } else if (i == total_products - 4) {
      values = {
        img0: prod[i + 0].image,
        product_name0: prod[i + 0].product_name,
        company_name0: prod[i + 0].company,
        about_item0: prod[i + 0].about_item,
        search_tag0: prod[i + 0].tags,
        rate0: prod[i + 0].price,
        product_id0: prod[i + 0]._id,
        img1: prod[i + 1].image,
        product_name1: prod[i + 1].product_name,
        company_name1: prod[i + 1].company,
        about_item1: prod[i + 1].about_item,
        search_tag1: [i + 1].tags,
        rate1: prod[i + 1].price,
        product_id1: prod[i + 1]._id,
        img2: prod[i + 2].image,
        product_name2: prod[i + 2].product_name,
        company_name2: prod[i + 2].company,
        about_item2: prod[i + 2].about_item,
        search_tag2: prod[i + 2].tags,
        rate2: prod[i + 2].price,
        product_id2: prod[i + 2]._id,
        img3: prod[i + 3].image,
        product_name3: prod[i + 3].product_name,
        company_name3: prod[i + 3].company,
        about_item3: prod[i + 3].about_item,
        search_tag3: prod[i + 3].tags,
        rate3: prod[i + 3].price,
        product_id3: prod[i + 3]._id,
      };
    } else {
      values = {
        img0: prod[i + 0].image,
        product_name0: prod[i + 0].product_name,
        company_name0: prod[i + 0].company,
        about_item0: prod[i + 0].about_item,
        search_tag0: prod[i + 0].tags,
        rate0: prod[i + 0].price,
        product_id0: prod[i + 0]._id,
        img1: prod[i + 1].image,
        product_name1: prod[i + 1].product_name,
        company_name1: prod[i + 1].company,
        about_item1: prod[i + 1].about_item,
        search_tag1: [i + 1].tags,
        rate1: prod[i + 1].price,
        product_id1: prod[i + 1]._id,
        img2: prod[i + 2].image,
        product_name2: prod[i + 2].product_name,
        company_name2: prod[i + 2].company,
        about_item2: prod[i + 2].about_item,
        search_tag2: prod[i + 2].tags,
        rate2: prod[i + 2].price,
        product_id2: prod[i + 2]._id,
        img3: prod[i + 3].image,
        product_name3: prod[i + 3].product_name,
        company_name3: prod[i + 3].company,
        about_item3: prod[i + 3].about_item,
        search_tag3: prod[i + 3].tags,
        rate3: prod[i + 3].price,
        product_id3: prod[i + 3]._id,
        img4: prod[i + 4].image,
        product_name4: prod[i + 4].product_name,
        company_name4: prod[i + 4].company,
        about_item4: prod[i + 4].about_item,
        search_tag4: prod[i + 4].tags,
        rate4: prod[i + 4].price,
        product_id4: prod[i + 4]._id,
      };
    }
    res.render("buy", values);
  }
});

app.get("/cart", async (req, res) => {
  i = 0;
  try {
    if (user == undefined) {
      user = await Last.findOne({ ip: ipAddress });
      user = await User.findOne({ email: user.email });
    }
    let allcartproducts = await cartProduct.find({email:user.email});
    totalprice = 0;
    let length = allcartproducts.length;
    // console.log(length);
    for (let i = 0; i < length; i++) {
      totalprice = totalprice + (allcartproducts[i].price * allcartproducts[i].count);
    }
    // console.log(allcartproducts);
    res.render("cart", { cartproducts: allcartproducts, totalprice: totalprice, length: length });
  } catch (error) {
    user = undefined;
    res.redirect("/");
  }
});

app.get("/profile", async (req, res) => {
  i = 0;
  try {
    if (user == undefined) {
      user = await Last.findOne({ ip: ipAddress });
      user = await User.findOne({ email: user.email });
    }
    if (user != undefined) {
      let vendor1 = await Vendor.findOne({ email: user.email });
      let profile_object;
      if (vendor1 == null) {
        profile_object = {
          firstname: user.first_name,
          lastname: user.last_name,
          age: user.age,
          email: user.email,
          gender: user.gender,
          phoneno: user.phone,
        };
      } else {
        profile_object = {
          firstname: user.first_name,
          lastname: user.last_name,
          age: user.age,
          email: user.email,
          gender: user.gender,
          phoneno: user.phone,
          address_line_2: vendor1.address_line2,
          address_line_1: vendor1.address_line1,
          state: vendor1.state,
          city: vendor1.city,
          postalcode: vendor1.postal_code,
          company: vendor1.company,
        };
      }
      res.render("profile", profile_object);
    }
  } catch (error) {
    user = undefined;
    res.redirect("/");
  }
});

let forgotemail = "";
app.get("/forgotpassword", async (req, res) => {
  flag2 = false;
  flag = false;
  otp = -1;
  forgotemail = "";
  res.render("forgotpassword", { sendemail: true });
});

app.get("/logout", async (req, res) => {
  user = undefined;
  try {
    await Last.deleteOne({ ip: ipAddress });
  } catch (error) { }
  res.redirect("/");
});

let flag2 = false;
let flag = false;
let otp = -1;
app.get('/forgetpassword', function (req, res) {
  if (flag) {
    flag2 = false;
    res.render("forgotpassword", { enterotp: true });
  }
  else {
    flag = false;
    flag2 = false;
    res.render("forgotpassword", { sendemail: true });
  }
})
app.get('/enterotp', function (req, res) {
  if (flag) {
    if (flag2) {
      res.render("forgotpassword", { changepassword: true });
    }
    else {
      res.render("forgotpassword", { enterotp: true });
    }
  }
  else {
    res.render("forgotpassword", { sendemail: true });
  }
})
app.get('/resendotp', function (req, res) {
  otp = Math.floor(100000 + Math.random() * 900000);
  flag = true;
  sendmail(otp, forgotemail,'Email Verification','Email Verification');
  res.render("forgotpassword", { enterotp: true });
})
//////////////////////UPDATE IT!!
// app.get("*", (req, res) => {
//   flag2 = false;
//   flag = false;
//   otp = -1;
//   res.render("error404")
// })

//Create a new user in our database
signupobject = undefined;
signupotp = -1;
sflag = false;
lastobject = undefined;
app.post("/signups", async (req, res) => {
  forgotemail = "";
  flag2 = false;
  flag = false;
  otp = -1;
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
      signupobject = registerUser;
      const lastu = new Last({
        email: req.body.email,
        ip: ipAddress,
      });
      lastobject = lastu;
      signupotp = Math.floor(100000 + Math.random() * 900000);
      sflag = true;
      sendmail(signupotp, req.body.email,'Email Verification','Email Verification');
      res.render("signup", { signupotp: true });
    } else {
      signupobject = undefined;
      signupotp = -1;
      sflag = false;
      lastobject = undefined;
      res.redirect("signups");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/entersignupotp', async function (req, res) {
  if (sflag) {
    let checksotp = req.body.otp;
    if (signupotp == checksotp) {
      const registered = await signupobject.save();
      const lu = await lastobject.save();
      user = signupobject;
      res.status(201).redirect("home");
    }
    else {
      res.render('signup', { message: "Enter OTP again", signupotp: true });
    }
  }
  else {
    signupobject = undefined;
    signupotp = -1;
    sflag = false;
    lastobject = undefined;
    res.redirect("signups");
  }
})

//login

app.post("/login", async (req, res) => {
  forgotemail = "";
  flag2 = false;
  flag = false;
  otp = -1;
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await User.findOne({ email: email });

    if (useremail.password === password) {
      const lastu = new Last({
        email: email,
        ip: ipAddress,
      });
      const lu = await lastu.save();
      user = useremail;
      res.status(201).redirect("home");
    } else {
      res.render("login", { show: "Invalid password" });
    }
  } catch (error) {
    res.render("login", { show: "Invalid email" });
  }
});

//sell product details
app.post("/sell_form_product_details", async (req, res) => {
  try {
    let vendor = await Vendor.findOne({ email: user.email });
    const addProduct = new Product({
      product_name: req.body.product_name,
      company: vendor.company,
      price: req.body.price,
      about_item: req.body.about_item,
      tags: req.body.tags.toLowerCase(),
      image: req.body.image,
    });
    const added_Product = await addProduct.save();
    res.status(201).redirect("home");
  } catch (error) {
    res.status(400).send(error);
  }
});

//vendor details
app.post("/sell_form_vendor_details", async (req, res) => {
  try {
    const vendor = new Vendor({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      company: req.body.company,
      gender: req.body.gender,
      address_line1: req.body.address_line1,
      address_line2: req.body.address_line2,
      postal_code: req.body.postal_code,
      city: req.body.city,
      state: req.body.state,
      details_of_service: req.body.details_of_service,
    });

    const seller = await vendor.save();
    res.status(201).redirect("home");
  } catch (error) {
    res.status(400).send(error);
  }
});

//next button in buy page
app.post("/next", async (req, res) => {
  if (i + 5 >= total_products) {
    res.redirect("buy");
  } else {
    i = i + 5;
    res.redirect("buy");
  }
});

//prev button in buy page
app.post("/prev", async (req, res) => {
  if (i == 0) {
    res.redirect("buy");
  } else {
    i = i - 5;
    res.redirect("buy");
  }
});
//updation of profile page
app.post("/profile", async (req, res) => {
  try {
    if (req.body.firstname != undefined) {
      var myquery = { email: user.email };
      var newvalues = {
        $set: {
          first_name: req.body.firstname,
          last_name: req.body.lastname,
          age: req.body.age,
          gender: req.body.gender,
        },
      };
      let result = await User.updateOne(myquery, newvalues);
      user.first_name = req.body.firstname;
      user.last_name = req.body.lastname;
      user.age = req.body.age;
      user.gender = req.body.gender;
      res.redirect("profile");
    } else if (req.body.email != undefined) {
      var myquery = { email: user.email };
      var newvalues = {
        $set: { email: req.body.email, phone: req.body.phone },
      };
      let result = await User.updateOne(myquery, newvalues);
      user.email = req.body.email;
      user.phone = req.body.phone;
      res.redirect("profile");
    } else if (req.body.company != undefined) {
      var myquery = { email: user.email };
      var newvalues = {
        $set: {
          company: req.body.company,
          address_line1: req.body.address_line1,
          address_line2: req.body.address_line2,
          state: req.body.state,
          city: req.body.city,
          postal_code: req.body.postalcode,
        },
      };
      let result = await Vendor.updateOne(myquery, newvalues);
      res.redirect("profile");
    } else if (req.body.currentpassword != undefined) {
      var myquery = { email: user.email };
      var oldpassword = req.body.currentpassword;
      if (oldpassword === user.password) {
        var newpassword = req.body.newpassword;
        var confirmpassword = req.body.confirmpassword;
        if (newpassword === confirmpassword) {
          var newvalues = {
            $set: { password: newpassword, confirm_password: newpassword },
          };
          let result = await User.updateOne(myquery, newvalues);
          user.password = newpassword;
          res.redirect("profile");
        } else {
          res.redirect("profile");
        }
      } else {
        res.render("profile", { show: "Invalid current password" });
      }
    } else {
      user = undefined;
      await Last.deleteOne({ ip: ipAddress });
      res.redirect("/");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/search", async (req, res) => {
  var word = req.body.value.toLowerCase();
  const regex = new RegExp(word, "i");
  prod = await Product.find({ tags: { $regex: regex } });
  total_products = prod.length;
  if (total_products == 0) res.redirect("home");
  else res.redirect("buy");
});

app.post('/buy', async function (req, res) {
  let data = req.body;
  if (req.body.productname) {
    let pr = req.body.productname;
    let checkforprod = await cartProduct.find({ product_name: pr , email:user.email});
    if (checkforprod.length) {
      let updatedproducts = await cartProduct.updateMany({ product_name: pr ,email:user.email}, { $inc: { count: 1 } });
    }
    else {
      let productstobeinserted = await Product.find({ product_name: pr });
      const prod = new cartProduct({
        email: user.email,
        product_name: productstobeinserted[0].product_name,
        company: productstobeinserted[0].company,
        price: productstobeinserted[0].price,
        about_item: productstobeinserted[0].about_item,
        tags: productstobeinserted[0].tags,
        image: productstobeinserted[0].image,
        count: 1
      });
      const insertedproducts = await prod.save();
    }
    res.json({
      message: "added to cart",
      data: data
    });
  }
  else {
    res.json({
      message: "no item added to cart"
    });
  }
})

app.post('/removefromcart', async function (req, res) {
  // console.log(req.body);
  let obj = await cartProduct.findOne({ _id: req.body.productid,email:user.email });
  if (obj.count == 1) {
    let deletedobj = await cartProduct.findOneAndDelete({ _id: req.body.productid,email:user.email });
    res.redirect("cart");
    // console.log(deletedobj);
  }
  else {
    let updatedobj = await cartProduct.updateOne({ _id: req.body.productid,email:user.email }, { $inc: { count: -1 } })
    res.redirect("cart");
  }
})

app.post('/forgetpassword', async (req, res) => {
  let emailentered = req.body.email;
  if (emailentered != '') {
    forgotemail = emailentered;
    let founduser = await User.findOne({ email: emailentered });
    if (founduser) {
      otp = Math.floor(100000 + Math.random() * 900000);
      flag = true;
      sendmail(otp, emailentered,'Reset Password','Forgot Password');
      res.render("forgotpassword", { enterotp: true });
    }
    else {
      flag = false;
      res.render("forgotpassword", { sendemail: true, message: "email does not exist" });
    }
  }
  else {
    flag = false;
    res.render("forgotpassword", { sendemail: true });
  }
})


app.post('/enterotp', async (req, res) => {
  if (flag) {
    let checkotp = req.body.otp;
    checkotp = Number(checkotp);
    if (otp == checkotp) {
      flag2 = true;
      res.render("forgotpassword", { changepassword: true });
    }
    else {
      flag2 = false;
      res.render("forgotpassword", { enterotp: true, message: "Incorrect OTP , Enter OTP again" });
    }
  }
  else {
    flag = false;
    flag2 = false;
    res.render("forgotpassword", { sendemail: true });
  }
})

app.post('/changepassword', async (req, res) => {
  if (flag2) {
    let pss = req.body.newpassword;
    let cpss = req.body.confirm_password;
    if (pss == cpss) {
      var myquery = { email: forgotemail };
      var newvalues = {
        $set: {
          password: pss,
          confirm_password: cpss
        }
      };
      let result = await User.updateOne(myquery, newvalues);
      flag2 = false;
      flag = false;
      otp = -1;
      // console.log(result);
      res.redirect("login");
    }
    else {
      res.render("forgotpassword", { changepassword: true, message: "Password is not matching" });
    }
  }
  else {
    res.render("forgotpassword", { sendemail: true });
  }
})

//paypal payment integration

app.post("/pay", async (req, res) => {
 let { productid } = req.body;
 //Handle buy now option 
 if (productid) {
   const product = await Product.findById(productid);
   if (!product) {
     return res.status(404).send("Product not found");
   }

   const lineItems = [
     {
       name: product.product_name,
       price: product.price.toFixed(2),
       currency: "USD",
       quantity: 1,
     },
   ];
   totalprice=product.price.toFixed(2);
   const create_payment_json = {
     intent: "sale",
     payer: {
       payment_method: "paypal",
     },
     redirect_urls: {
       return_url: "http://localhost:3000/success",
       cancel_url: "http://localhost:3000/cancel",
     },
     transactions: [
       {
         item_list: {
           items: lineItems,
         },
         amount: {
           currency: "USD",
           total: product.price.toFixed(2),
         },
         description: product.about_item,
       },
     ],
   };
   // Create payment for a specific product
   paypal.payment.create(create_payment_json, function (error, payment) {
     if (error) {
       throw error;
     } else {
       for (let i = 0; i < payment.links.length; i++) {
         if (payment.links[i].rel === "approval_url") {
           res.redirect(payment.links[i].href);
         }
       }
     }
   });
 }
 else{
   //Handle cart payments
   const cartItems = await cartProduct.find({ email: user.email });
   let lineItems = [];
   if (cartItems.length == 0) 
   {
     res.redirect("home");
   }
   else{
 const lineItems = cartItems.map(item => ({
 name: item.product_name,
 price: item.price.toFixed(2),
 currency: 'USD',
 quantity: item.count,
}));
 const create_payment_json = {
   intent: "sale",
   payer: {
     payment_method: "paypal",
   },
   redirect_urls: {
     return_url: "http://localhost:3000/success",
     cancel_url: "http://localhost:3000/cancel",
   },
   transactions: [
     {
       item_list: {
         items: lineItems,
       },
       amount: {
         currency: "USD",
         total: totalprice.toFixed(2),
       },
       description: "Hat for the best team ever",
     },
   ],
 };

 paypal.payment.create(create_payment_json, function (error, payment) {
   if (error) {
     throw error;
   } else {
     for (let i = 0; i < payment.links.length; i++) {
       if (payment.links[i].rel === "approval_url") {
         res.redirect(payment.links[i].href);
       }
     }
   }
 });
}}});

//success route
app.get("/success", (req, res) => {
 const payerId = req.query.PayerID;
 const paymentId = req.query.paymentId;
  var pricetosubmit = totalprice;
 const execute_payment_json = {
   payer_id: payerId,
   transactions: [
     {
       amount: {
         currency: "USD",
         total: totalprice,
       },
     },
   ],
 };
 paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
   if (error) {
    console.log(1);
     console.log(error.response);
     throw error;
   } else {
     // console.log(JSON.stringify(payment));
     const shippingAddress = payment.payer.payer_info.shipping_address;
    const data = JSON.parse(JSON.stringify(payment));
     // Store order details in the database
     const cartItems = await cartProduct.find({ email: user.email });
     let orderItems =[]
     if (cartItems.length == 0) 
     {
      const items = data.transactions[0].item_list.items;
      orderItems = items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: 1,
      }));
     }
     else{
     orderItems = cartItems.map(item => ({
       name: item.product_name,
       price: item.price,
       quantity: item.count,
     }));
    }
     const order = {
       paymentId,
       payerId,
       items: orderItems,
       total: totalprice,
       address: {
         recipientName: shippingAddress.recipient_name,
         addressLine1: shippingAddress.line1,
         city: shippingAddress.city,
         state: shippingAddress.state,
         country: shippingAddress.country_code,
         postalCode: shippingAddress.postal_code,
       },
     };
     console.log(order)

     // Save the order in the database
     await Order.create(order);
     await cartProduct.deleteMany({ email: user.email });

     res.render("success")
     }
 }
 );
});

app.get("/cancel", async (req, res) => {
 res.render("cancel");
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});


async function sendmail(otp, email,subject,bodystring) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'SmiFe2023178909@gmail.com',
        pass: 'fiheqhpgcqelqoct'
      }
    });
    const mailOptions = {
      from: 'SmiFe2023178909@gmail.com',
      to: email,
      subject: subject,
      html: '<h1>From SmiFe</h1><h2>'+bodystring+' OTP</h2><h3>' + otp.toString() + '</h3>'
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
      else {
        // console.log("Email has been sent");
      }
    });

  } catch (error) {
    console.log(error);
  }
}