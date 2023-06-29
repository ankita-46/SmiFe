const paypal = require("paypal-rest-sdk");
const Product = require("../models/products");
const cartProduct = require("../models/cartuser");
const Order = require("../models/orders");
const { json } = require("express");

var pay = async (req, res, variables) => {
    variables.cartbuy = false;
  let { productid } = req.body;
  //Handle buy now option
  if (productid) {
    // b cb
    let product = await Product.findById(productid);
    if (!product) {
      //means buy from cart
      product = await cartProduct.findById(productid);
    }
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
    variables.totalprice = product.price.toFixed(2);
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
  } else {
    //c
    //Handle cart payments
    const cartItems = await cartProduct.find({ email: variables.user.email });
    let lineItems = [];
    if (cartItems.length == 0) {
      res.redirect("home");
    } else {
        variables.cartbuy = true;
      const lineItems = cartItems.map((item) => ({
        name: item.product_name,
        price: item.price.toFixed(2),
        currency: "USD",
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
              total: variables.totalprice.toFixed(2),
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
    }
  }
};

var success = async (req, res, variables) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  var pricetosubmit = variables.totalprice;
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: variables.totalprice,
        },
      },
    ],
  };
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        console.log(1);
        console.log(error.response);
        throw error;
      } else {
        // console.log(JSON.stringify(payment));
        const shippingAddress = payment.payer.payer_info.shipping_address;
        const data = JSON.parse(JSON.stringify(payment));
        // Store order details in the database
        let orderItems = [];
        if (variables.cartbuy) {
          const cartItems = await cartProduct.find({ email: variables.user.email });
          orderItems = cartItems.map((item) => ({
            name: item.product_name,
            price: item.price,
            quantity: item.count,
          }));
        } else {
          const items = data.transactions[0].item_list.items;
          orderItems = items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: 1,
          }));
        }
        const order = {
          paymentId,
          payerId,
          items: orderItems,
          total: variables.totalprice,
          address: {
            recipientName: shippingAddress.recipient_name,
            addressLine1: shippingAddress.line1,
            city: shippingAddress.city,
            state: shippingAddress.state,
            country: shippingAddress.country_code,
            postalCode: shippingAddress.postal_code,
          },
        };
        console.log(order);

        // Save the order in the database
        await Order.create(order);
        if (variables.cartbuy) await cartProduct.deleteMany({ email: variables.user.email });

        res.render("success");
      }
    }
  );
};

var cancel = async (req, res, variables) => {
  res.render("cancel");
};

module.exports = {pay, success, cancel};