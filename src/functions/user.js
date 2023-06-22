const User = require("../models/signups");
const Product = require("../models/products");
const Vendor = require("../models/vendor_details");
const Last = require("../models/lastuser");
const cartProduct = require("../models/cartuser");

var home = async (req, res, variables) => {
  variables.signupobject = undefined;
  variables.signupotp = -1;
  variables.sflag = false;
  variables.lastobject = undefined;
  variables.forgotemail = "";
  variables.flag2 = false;
  variables.flag = false;
  variables.otp = -1;
  variables.i = 0;
  try {
    if (variables.user == undefined) {
      variables.user = await Last.findOne({ ip: variables.ipAddress });
      variables.user = await User.findOne({ email: variables.user.email });
    }
    res.render("home");
  } catch (error) {
    variables.user = undefined;
    res.redirect("/");
  }
};

var vendorDetailsForm = async (req, res, variables) => {
  variables.i = 0;
  try {
    if (variables.user == undefined) {
      variables.user = await Last.findOne({ ip: variables.ipAddress });
      variables.user = await User.findOne({ email: variables.user.email });
    }
    var vendor = await Vendor.findOne({ email: variables.user.email });
    if (vendor != null) res.render("sell_form_product_details");
    else res.redirect("sell_form_vendor_details");
  } catch (error) {
    variables.user = undefined;
    res.redirect("/");
  }
};

var profile = async (req, res, variables) => {
  variables.i = 0;
  try {
    if (variables.user == undefined) {
      variables.user = await Last.findOne({ ip: variables.ipAddress });
      variables.user = await User.findOne({ email: variables.user.email });
    }
    if (variables.user != undefined) {
      let vendor1 = await Vendor.findOne({ email: variables.user.email });
      let profile_object;
      if (vendor1 == null) {
        profile_object = {
          firstname: variables.user.first_name,
          lastname: variables.user.last_name,
          age: variables.user.age,
          email: variables.user.email,
          gender: variables.user.gender,
          phoneno: variables.user.phone,
        };
      } else {
        profile_object = {
          firstname: variables.user.first_name,
          lastname: variables.user.last_name,
          age: variables.user.age,
          email: variables.user.email,
          gender: variables.user.gender,
          phoneno: variables.user.phone,
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
    variables.user = undefined;
    res.redirect("/");
  }
};

var productForm = async (req, res, variables) => {
  variables.i = 0;
  try {
    if (variables.user == undefined) {
      variables.user = await Last.findOne({ ip: variables.ipAddress });
      variables.user = await User.findOne({ email: variables.user.email });
    }
    res.render("sell_form_vendor_details");
  } catch (error) {
    variables.user = undefined;
    res.redirect("/");
  }
};

var logout = async (req, res, variables) => {
  variables.user = undefined;
  try {
    await Last.deleteOne({ ip: variables.ipAddress });
  } catch (error) {}
  res.redirect("/");
};

var forgotPassword = async (req, res, variables) => {
  variables.flag2 = false;
  variables.flag = false;
  variables.otp = -1;
  variables.forgotemail = "";
  res.render("forgotpassword", { sendemail: true });
};

var changePasswordPost = async (req, res, variables) => {
  if (variables.flag2) {
    let pss = req.body.newpassword;
    let cpss = req.body.confirm_password;
    if (pss == cpss) {
      var myquery = { email: variables.forgotemail };
      var newvalues = {
        $set: {
          password: pss,
          confirm_password: cpss,
        },
      };
      let result = await User.updateOne(myquery, newvalues);
      variables.flag2 = false;
      variables.flag = false;
      variables.otp = -1;
      // console.log(result);
      res.redirect("login");
    } else {
      res.render("forgotpassword", {
        changepassword: true,
        message: "Password is not matching",
      });
    }
  } else {
    res.render("forgotpassword", { sendemail: true });
  }
};

var removefromcartPost = async function (req, res, variables) {
  // console.log(req.body);
  let obj = await cartProduct.findOne({
    _id: req.body.productid,
    email: variables.user.email,
  });
  if (obj.count == 1) {
    let deletedobj = await cartProduct.findOneAndDelete({
      _id: req.body.productid,
      email: variables.user.email,
    });
    res.redirect("cart");
    // console.log(deletedobj);
  } else {
    let updatedobj = await cartProduct.updateOne(
      { _id: req.body.productid, email: variables.user.email },
      { $inc: { count: -1 } }
    );
    res.redirect("cart");
  }
};

var search = async (req, res, variables) => {
  var word = req.body.value.toLowerCase();
  const regex = new RegExp(word, "i");
  variables.prod = await Product.find({ tags: { $regex: regex } });
  variables.total_products = variables.prod.length;
  if (variables.total_products == 0) res.redirect("home");
  else res.redirect("buy");
};

var profilePost = async (req, res, variables) => {
  try {
    if (req.body.firstname != undefined) {
      var myquery = { email: variables.user.email };
      var newvalues = {
        $set: {
          first_name: req.body.firstname,
          last_name: req.body.lastname,
          age: req.body.age,
          gender: req.body.gender,
        },
      };
      let result = await User.updateOne(myquery, newvalues);
      variables.user.first_name = req.body.firstname;
      variables.user.last_name = req.body.lastname;
      variables.user.age = req.body.age;
      variables.user.gender = req.body.gender;
      res.redirect("profile");
    } else if (req.body.email != undefined) {
      var myquery = { email: variables.user.email };
      var newvalues = {
        $set: { email: req.body.email, phone: req.body.phone },
      };
      let result = await User.updateOne(myquery, newvalues);
      variables.user.email = req.body.email;
      variables.user.phone = req.body.phone;
      res.redirect("profile");
    } else if (req.body.company != undefined) {
      var myquery = { email: variables.user.email };
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
      var myquery = { email: variables.user.email };
      var oldpassword = req.body.currentpassword;
      if (oldpassword === variables.user.password) {
        var newpassword = req.body.newpassword;
        var confirmpassword = req.body.confirmpassword;
        if (newpassword === confirmpassword) {
          var newvalues = {
            $set: { password: newpassword, confirm_password: newpassword },
          };
          let result = await User.updateOne(myquery, newvalues);
          variables.user.password = newpassword;
          res.redirect("profile");
        } else {
          res.redirect("profile");
        }
      } else {
        res.render("profile", { show: "Invalid current password" });
      }
    } else {
      variables.user = undefined;
      await Last.deleteOne({ ip: variables.ipAddress });
      res.redirect("/");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

var vendorDetailsFormPost = async (req, res, variables) => {
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
};

var productFormPost = async (req, res, variables) => {
  try {
    let vendor = await Vendor.findOne({ email: variables.user.email });
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
};

var loginPost = async (req, res, variables) => {
  variables.forgotemail = "";
  variables.flag2 = false;
  variables.flag = false;
  variables.otp = -1;
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await User.findOne({ email: email });

    if (useremail.password === password) {
      const lastu = new Last({
        email: email,
        ip: variables.ipAddress,
      });
      const lu = await lastu.save();
      variables.user = useremail;
      res.status(201).redirect("home");
    } else {
      res.render("login", { show: "Invalid password" });
    }
  } catch (error) {
    res.render("login", { show: "Invalid email" });
  }
};

module.exports = {home, vendorDetailsForm, profile, productForm, logout, forgotPassword, changePasswordPost, removefromcartPost, search, productFormPost, profilePost, vendorDetailsFormPost, loginPost};