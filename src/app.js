const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const IP = require("ip");

const app = express();
require("./db/conn");


/*--------models-------- */
const User = require("./models/signups");
const Product = require("./models/products");
const Vendor = require("./models/vendor_details");
const Last = require("./models/lastuser");

const { json } = require("express");
const { default: mongoose } = require("mongoose");

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../views");

//global variables in use below
const ipAddress = IP.address();
let user = undefined;
let i=0;
let total_products;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

//all get API
app.get("/", async(req, res) => {
    i=0;
    try{
        if(user==undefined)
        {
            user = await Last.findOne({ip:ipAddress});
            user = await User.findOne({email: user.email});
        }
        res.render("home");
    }
    catch{
        user = undefined;
        res.render("index");
    }
});

app.get("/login", (req, res) => {
    res.render("login")
});

app.get("/signups", (req, res) => {
    res.render("signup")
});

app.get("/sell_form_product_details", (req, res) => {
    i = 0;
    res.render("sell_form_product_details")
});

app.get("/sell_form_vendor_details", (req, res) => {
    i = 0;
    res.render("sell_form_vendor_details")
});

app.get("/home", (req, res) => {
    i = 0;
    if (user != undefined)
        res.render("home");
    else
        res.redirect("index");
})

app.get("/buy", async (req, res) => {
    let prod = [];
    prod = await Product.find();
    total_products = prod.length;
    let values;
    if (i == total_products - 1) {
        values = {
            img0: prod[i + 0].image,
            product_name0: prod[i + 0].product_name,
            company_name0: prod[i + 0].company,
            about_item0: prod[i + 0].about_item,
            search_tag0: prod[i + 0].tags,
            rate0: prod[i + 0].price,
        };
    }
    else if (i == total_products - 2) {
        values = {
            img0: prod[i + 0].image,
            product_name0: prod[i + 0].product_name,
            company_name0: prod[i + 0].company,
            about_item0: prod[i + 0].about_item,
            search_tag0: prod[i + 0].tags,
            rate0: prod[i + 0].price,
            img1: prod[i + 1].image,
            product_name1: prod[i + 1].product_name,
            company_name1: prod[i + 1].company,
            about_item1: prod[i + 1].about_item,
            search_tag1: [i + 1].tags,
            rate1: prod[i + 1].price,
        };
    }
    else if (i == total_products - 3) {
        values = {
            img0: prod[i + 0].image,
            product_name0: prod[i + 0].product_name,
            company_name0: prod[i + 0].company,
            about_item0: prod[i + 0].about_item,
            search_tag0: prod[i + 0].tags,
            rate0: prod[i + 0].price,
            img1: prod[i + 1].image,
            product_name1: prod[i + 1].product_name,
            company_name1: prod[i + 1].company,
            about_item1: prod[i + 1].about_item,
            search_tag1: [i + 1].tags,
            rate1: prod[i + 1].price,
            img2: prod[i + 2].image,
            product_name2: prod[i + 2].product_name,
            company_name2: prod[i + 2].company,
            about_item2: prod[i + 2].about_item,
            search_tag2: prod[i + 2].tags,
            rate2: prod[i + 2].price,
        };
    }
    else if (i == total_products - 4) {
        values = {
            img0: prod[i + 0].image,
            product_name0: prod[i + 0].product_name,
            company_name0: prod[i + 0].company,
            about_item0: prod[i + 0].about_item,
            search_tag0: prod[i + 0].tags,
            rate0: prod[i + 0].price,
            img1: prod[i + 1].image,
            product_name1: prod[i + 1].product_name,
            company_name1: prod[i + 1].company,
            about_item1: prod[i + 1].about_item,
            search_tag1: [i + 1].tags,
            rate1: prod[i + 1].price,
            img2: prod[i + 2].image,
            product_name2: prod[i + 2].product_name,
            company_name2: prod[i + 2].company,
            about_item2: prod[i + 2].about_item,
            search_tag2: prod[i + 2].tags,
            rate2: prod[i + 2].price,
            img3: prod[i + 3].image,
            product_name3: prod[i + 3].product_name,
            company_name3: prod[i + 3].company,
            about_item3: prod[i + 3].about_item,
            search_tag3: prod[i + 3].tags,
            rate3: prod[i + 3].price,
        };
    }
    else {
        values = {
            img0: prod[i + 0].image,
            product_name0: prod[i + 0].product_name,
            company_name0: prod[i + 0].company,
            about_item0: prod[i + 0].about_item,
            search_tag0: prod[i + 0].tags,
            rate0: prod[i + 0].price,
            img1: prod[i + 1].image,
            product_name1: prod[i + 1].product_name,
            company_name1: prod[i + 1].company,
            about_item1: prod[i + 1].about_item,
            search_tag1: [i + 1].tags,
            rate1: prod[i + 1].price,
            img2: prod[i + 2].image,
            product_name2: prod[i + 2].product_name,
            company_name2: prod[i + 2].company,
            about_item2: prod[i + 2].about_item,
            search_tag2: prod[i + 2].tags,
            rate2: prod[i + 2].price,
            img3: prod[i + 3].image,
            product_name3: prod[i + 3].product_name,
            company_name3: prod[i + 3].company,
            about_item3: prod[i + 3].about_item,
            search_tag3: prod[i + 3].tags,
            rate3: prod[i + 3].price,
            img4: prod[i + 4].image,
            product_name4: prod[i + 4].product_name,
            company_name4: prod[i + 4].company,
            about_item4: prod[i + 4].about_item,
            search_tag4: prod[i + 4].tags,
            rate4: prod[i + 4].price
        };
    }
    res.render("buy", values);
});

app.get("/cart", (req, res) => {
    i = 0;
    res.render("cart");
});

app.get("/profile", async (req, res) => {
    i = 0;
    let vendor1 = await Vendor.findOne({ email: user.email });
    let profile_object
    if (vendor1 == null) {
        profile_object = {
            firstname: user.first_name,
            lastname: user.last_name,
            age: user.age,
            email: user.email,
            gender: user.gender,
            phoneno: user.phone
        }
    }
    else {
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
            company: vendor1.company
        }
    }
    res.render("profile", profile_object)
});

app.get("/forgotpassword", (req, res) => {
    res.render("forgotpassword");
});

//////////////////////UPDATE IT!!
//app.get("*",(req, res) =>{
//   res.render("error404")
//})

//Create a new user in our database

app.post("/signups", async (req, res) => {
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
                confirm_password: req.body.confirm_password
            })
            const lastu = new Last({
                email: req.body.email,
                ip: ipAddress
            })
            const registered = await registerUser.save();
            const lu = await lastu.save();
            user = registerUser;
            res.status(201).redirect("home");
        }
        else {
            res.send("<h1>Password are not matching.</h1>");
        }

    } catch (error) {
        res.status(400).send(error);
    }
});


//login

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await User.findOne({ email: email });

        if (useremail.password === password) {
            const lastu = new Last({
                email: email,
                ip: ipAddress
            })
            const lu = await lastu.save();
            user= useremail;
            res.status(201).redirect("home");
        } else {
            res.send("<h1>Password are not matching.</h1>");
        }

    } catch (error) {
        res.status(400).send("<h1>invalid email</h1>");
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
            tags: req.body.tags,
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
            details_of_service: req.body.details_of_service
        });

        const seller = await vendor.save();
        res.status(201).redirect("home");
    }
    catch (error) {
        res.status(400).send(error);
    }
});

//next button in buy page
app.post("/next", async (req, res) => {
    if (i + 5 >= total_products) {
        res.redirect("buy");
    }
    else {
        i = i + 5;
        res.redirect("buy");
    }
})

//prev button in buy page
app.post("/prev", async (req, res) => {
    if (i == 0) {
        res.redirect("buy");
    }
    else {
        i = i - 5;
        res.redirect("buy");
    }
})
//updation of profile page
app.post("/profile", async (req, res) => {
    try {
        if (req.body.firstname != undefined) {
            var myquery = { email: user.email };
            var newvalues = { $set: { first_name: req.body.firstname, last_name: req.body.lastname, age: req.body.age, gender: req.body.gender } };
            let result = await User.updateOne(myquery, newvalues);
            user.first_name = req.body.firstname;
            user.last_name = req.body.lastname;
            user.age = req.body.age;
            user.gender = req.body.gender;
            res.redirect("profile");
        }
        else if (req.body.email != undefined) {
            var myquery = { email: user.email };
            var newvalues = { $set: { email: req.body.email, phone: req.body.phone } };
            let result = await User.updateOne(myquery, newvalues);
            user.email = req.body.email;
            user.phone = req.body.phone;
            res.redirect("profile");
        }
        else if (req.body.company != undefined) {
            var myquery = { email: user.email };
            var newvalues = { $set: { company: req.body.company, address_line1: req.body.address_line1, address_line2: req.body.address_line2, state: req.body.state, city: req.body.city, postal_code: req.body.postalcode } };
            let result = await Vendor.updateOne(myquery, newvalues);
            res.redirect("profile");
        }
        else if(req.body.currentpassword!=undefined) {
            var myquery = { email: user.email };
            var oldpassword = req.body.currentpassword;
            if (oldpassword === user.password) {
                var newpassword = req.body.newpassword;
                var confirmpassword = req.body.confirmpassword;
                if (newpassword === confirmpassword) {
                    var newvalues = { $set: { password : newpassword ,  confirm_password:newpassword } };
                    let result = await User.updateOne(myquery, newvalues);
                    user.password = newpassword;
                    res.redirect("profile");
                }
                else{
                    res.send("confirm password is different from new password");
                }
            }
            else {
                res.send("wrong current password");
            }
        }
        else{
            user = undefined;
            await Last.deleteOne({ip: ipAddress});
            res.render("index");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});