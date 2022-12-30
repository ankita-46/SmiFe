const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bodyParser=require("body-parser");

const app =express();
require("./db/conn");


/*--------models-------- */
const User = require("./models/signups");
const Product = require("./models/products");

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

app.get("/login", (req, res) => {
    res.render("login")
});

app.get("/signups", (req, res) => {
    res.render("signup")
});

app.get("/sell_form_product_details", (req, res) => {
    res.render("sell_form_product_details")
});

app.get("/sell_form_vendor_details", (req, res) => {
    res.render("sell_form_vendor_details")
});
/*----------------REMOVE------------*/ 
app.get("/home", (req, res)=>{
    res.render("home")
})

//////////////////////UPDATE IT!!
//app.get("*",(req, res) =>{
 //   res.render("error404")
//})

//Create a new user in our database

app.post("/signups", async(req, res) => {
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
            console.log(req.body)
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


//login

app.post("/login", async(req, res) => {
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


//sell product details
app.post("/sell_form_product_details", async(req, res) => {
    try {
            const addProduct = new Product({
                product_name: req.body.product_name,
                price: req.body.price,
                about_item: req.body.about_item,
                tags: req.body.tags,
                image: req.body.image,
            })
            const added_Product = await addProduct.save();
            res.status(201).render("home");
    }catch(error){
        res.status(400).send(error);
    }
});


app.listen(port, ()=> {
    console.log(`server is running at port no ${port}`);
});