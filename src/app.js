const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bodyParser=require("body-parser");

const app =express();
require("./db/conn");
const User = require("./models/signups");
const { json } = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../views");


app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

app.get("/", (req, res)=>{
    res.render("index")
});
app.get("/signup", (req, res) => {
    res.render("signup")
});
app.get("/", (req, res) => {
    res.render("index")
});
app.get("/sell_form_product_details", (req, res) => {
    res.render("sell_form_product_details")
});

app.get("/sell_form_vendor_details", (req, res) => {
    res.render("sell_form_vendor_details")
});
//Create a new user in our database
app.post("/signup", async(req, res) => {
    try {
       const password = req.body.password;
       const cpassword = req.body.confirm_password;

        if(password === cpassword){
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
            const registered = await registerUser.save();
            res.status(201).render("home");

        }
        else{
            res.send("password are not matching");
        }

    }catch(error){
        res.status(400).send(error);
    }
});

app.post("/", async(req, res) => {
    try{

        const email =req.body.email;
        const password = req.body.password;

        const useremail = await User.findOne({email: email});

        if(useremail.password === password){
            res.status(201).render("home");
        }else{
            res.send("password are not matching");
        }

    } catch (error) {
        res.status(400).send("invalid email");
    }
});


app.listen(port, ()=> {
    console.log(`server is running at port no ${port}`);
});