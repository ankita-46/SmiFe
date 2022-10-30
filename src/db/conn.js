
const  mongoose  = require("mongoose");

var mongoURL= 'mongodb+srv://admin:1234@cluster0.gucmzqt.mongodb.net/SmiFe'

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser:true})

var connection = mongoose.connection;

connection.on('error', ()=>{
    console.log('Mongo DB Connection failed');
})

connection.on('connected', ()=>{
    console.log('Mongo DB Connection successful');
})
