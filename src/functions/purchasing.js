const User = require("../models/signups");
const Product = require("../models/products");
const Last = require("../models/lastuser");
const cartProduct = require("../models/cartuser");
const { json } = require("express");

var buy = async (req, res, variables) => {
  if (variables.user == undefined) {
    variables.user = await Last.findOne({ ip: variables.ipAddress });
    if (variables.user == null) {
      res.redirect("/");
    } else {
        variables.user = await User.findOne({ email: variables.user.email });
      if (variables.total_products == 0) res.redirect("buyoption");
      else {
        res.redirect("buy");
      }
    }
  } else {
    let values;
    if (variables.i == variables.total_products - 1) {
      values = {
        img0: variables.prod[variables.i + 0].image,
        product_name0: variables.prod[variables.i + 0].product_name,
        company_name0: variables.prod[variables.i + 0].company,
        about_item0: variables.prod[variables.i + 0].about_item,
        search_tag0: variables.prod[variables.i + 0].tags,
        rate0: variables.prod[variables.i + 0].price,
        product_id0: variables.prod[variables.i + 0]._id,
      };
    } else if (variables.i == variables.total_products - 2) {
      values = {
        img0: variables.prod[variables.i + 0].image,
        product_name0: variables.prod[variables.i + 0].product_name,
        company_name0: variables.prod[variables.i + 0].company,
        about_item0: variables.prod[variables.i + 0].about_item,
        search_tag0: variables.prod[variables.i + 0].tags,
        rate0: variables.prod[variables.i + 0].price,
        product_id0: variables.prod[variables.i + 0]._id,
        img1: variables.prod[variables.i + 1].image,
        product_name1: variables.prod[variables.i + 1].product_name,
        company_name1: variables.prod[variables.i + 1].company,
        about_item1: variables.prod[variables.i + 1].about_item,
        search_tag1: variables.prod[variables.i + 1].tags,
        rate1: variables.prod[variables.i + 1].price,
        product_id1: variables.prod[variables.i + 1]._id,
      };
    } else if (variables.i == variables.total_products - 3) {
      values = {
        img0: variables.prod[variables.i + 0].image,
        product_name0: variables.prod[variables.i + 0].product_name,
        company_name0: variables.prod[variables.i + 0].company,
        about_item0: variables.prod[variables.i + 0].about_item,
        search_tag0: variables.prod[variables.i + 0].tags,
        rate0: variables.prod[variables.i + 0].price,
        product_id0: variables.prod[variables.i + 0]._id,
        img1: variables.prod[variables.i + 1].image,
        product_name1: variables.prod[variables.i + 1].product_name,
        company_name1: variables.prod[variables.i + 1].company,
        about_item1: variables.prod[variables.i + 1].about_item,
        search_tag1: variables.prod[variables.i + 1].tags,
        rate1: variables.prod[variables.i + 1].price,
        product_id1: variables.prod[variables.i + 1]._id,
        img2: variables.prod[variables.i + 2].image,
        product_name2: variables.prod[variables.i + 2].product_name,
        company_name2: variables.prod[variables.i + 2].company,
        about_item2: variables.prod[variables.i + 2].about_item,
        search_tag2: variables.prod[variables.i + 2].tags,
        rate2: variables.prod[variables.i + 2].price,
        product_id2: variables.prod[variables.i + 2]._id,
      };
    } else if (variables.i == variables.total_products - 4) {
      values = {
        img0: variables.prod[variables.i + 0].image,
        product_name0: variables.prod[variables.i + 0].product_name,
        company_name0: variables.prod[variables.i + 0].company,
        about_item0: variables.prod[variables.i + 0].about_item,
        search_tag0: variables.prod[variables.i + 0].tags,
        rate0: variables.prod[variables.i + 0].price,
        product_id0: variables.prod[variables.i + 0]._id,
        img1: variables.prod[variables.i + 1].image,
        product_name1: variables.prod[variables.i + 1].product_name,
        company_name1: variables.prod[variables.i + 1].company,
        about_item1: variables.prod[variables.i + 1].about_item,
        search_tag1: variables.prod[variables.i + 1].tags,
        rate1: variables.prod[variables.i + 1].price,
        product_id1: variables.prod[variables.i + 1]._id,
        img2: variables.prod[variables.i + 2].image,
        product_name2: variables.prod[variables.i + 2].product_name,
        company_name2: variables.prod[variables.i + 2].company,
        about_item2: variables.prod[variables.i + 2].about_item,
        search_tag2: variables.prod[variables.i + 2].tags,
        rate2: variables.prod[variables.i + 2].price,
        product_id2: variables.prod[variables.i + 2]._id,
        img3: variables.prod[variables.i + 3].image,
        product_name3: variables.prod[variables.i + 3].product_name,
        company_name3: variables.prod[variables.i + 3].company,
        about_item3: variables.prod[variables.i + 3].about_item,
        search_tag3: variables.prod[variables.i + 3].tags,
        rate3: variables.prod[variables.i + 3].price,
        product_id3: variables.prod[variables.i + 3]._id,
      };
    } else {
      values = {
        img0: variables.prod[variables.i + 0].image,
        product_name0: variables.prod[variables.i + 0].product_name,
        company_name0: variables.prod[variables.i + 0].company,
        about_item0: variables.prod[variables.i + 0].about_item,
        search_tag0: variables.prod[variables.i + 0].tags,
        rate0: variables.prod[variables.i + 0].price,
        product_id0: variables.prod[variables.i + 0]._id,
        img1: variables.prod[variables.i + 1].image,
        product_name1: variables.prod[variables.i + 1].product_name,
        company_name1: variables.prod[variables.i + 1].company,
        about_item1: variables.prod[variables.i + 1].about_item,
        search_tag1: variables.prod[variables.i + 1].tags,
        rate1: variables.prod[variables.i + 1].price,
        product_id1: variables.prod[variables.i + 1]._id,
        img2: variables.prod[variables.i + 2].image,
        product_name2: variables.prod[variables.i + 2].product_name,
        company_name2: variables.prod[variables.i + 2].company,
        about_item2: variables.prod[variables.i + 2].about_item,
        search_tag2: variables.prod[variables.i + 2].tags,
        rate2: variables.prod[variables.i + 2].price,
        product_id2: variables.prod[variables.i + 2]._id,
        img3: variables.prod[variables.i + 3].image,
        product_name3: variables.prod[variables.i + 3].product_name,
        company_name3: variables.prod[variables.i + 3].company,
        about_item3: variables.prod[variables.i + 3].about_item,
        search_tag3: variables.prod[variables.i + 3].tags,
        rate3: variables.prod[variables.i + 3].price,
        product_id3: variables.prod[variables.i + 3]._id,
        img4: variables.prod[variables.i + 4].image,
        product_name4: variables.prod[variables.i + 4].product_name,
        company_name4: variables.prod[variables.i + 4].company,
        about_item4: variables.prod[variables.i + 4].about_item,
        search_tag4: variables.prod[variables.i + 4].tags,
        rate4: variables.prod[variables.i + 4].price,
        product_id4: variables.prod[variables.i + 4]._id,
      };
    }
    res.render("buy", values);
  }
};

var buyOption = async (req, res, variables) => {
  try {
    if (variables.user == undefined) {
        variables.user = await Last.findOne({ ip: variables.ipAddress });
        variables.user = await User.findOne({ email: variables.user.email });
    }
    variables.prod = await Product.find();
    variables.total_products = variables.prod.length;
    res.redirect("buy");
  } catch (error) {
    variables.user = undefined;
    res.redirect("/");
  }
};

var cart = async (req, res, variables) => {
    variables.i = 0;
  try {
    if (variables.user == undefined) {
        variables.user = await Last.findOne({ ip: variables.ipAddress });
        variables.user = await User.findOne({ email: variables.user.email });
    }
    let allcartproducts = await cartProduct.find({ email: variables.user.email });
    variables.totalprice = 0;
    let length = allcartproducts.length;
    // console.log(length);
    for (let i = 0; i < length; i++) {
        variables.totalprice =
        variables.totalprice + allcartproducts[i].price * allcartproducts[i].count;
    }
    // console.log(allcartproducts);
    res.render("cart", {
      cartproducts: allcartproducts,
      totalprice: variables.totalprice,
      length: length,
    });
  } catch (error) {
    user = undefined;
    res.redirect("/");
  }
};

var buyPost = async function (req, res, variables) {
  let data = req.body;
  if (req.body.productname) {
    let pr = req.body.productname;
    let checkforprod = await cartProduct.find({
      product_name: pr,
      email: variables.user.email,
    });
    if (checkforprod.length) {
      let updatedproducts = await cartProduct.updateMany(
        { product_name: pr, email: variables.user.email },
        { $inc: { count: 1 } }
      );
    } else {
      let productstobeinserted = await Product.find({ product_name: pr });
      const prod = new cartProduct({
        email: variables.user.email,
        product_name: productstobeinserted[0].product_name,
        company: productstobeinserted[0].company,
        price: productstobeinserted[0].price,
        about_item: productstobeinserted[0].about_item,
        tags: productstobeinserted[0].tags,
        image: productstobeinserted[0].image,
        count: 1,
      });
      const insertedproducts = await prod.save();
    }
    res.json({
      message: "added to cart",
      data: data,
    });
  } else {
    res.json({
      message: "no item added to cart",
    });
  }
};

var prev = async (req, res, variables) => {
  if (variables.i == 0) {
    res.redirect("buy");
  } else {
    variables.i = variables.i - 5;
    res.redirect("buy");
  }
};

var next = async (req, res, variables) => {
  if (variables.i + 5 >= variables.total_products) {
    res.redirect("buy");
  } else {
    variables.i = variables.i + 5;
    res.redirect("buy");
  }
};

module.exports = {buy, buyOption, cart, buyPost, prev, next};