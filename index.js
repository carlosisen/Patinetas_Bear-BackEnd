    
const express = require("express");
const cors = require("cors");

const validateToken = require('./src/middlewares/validateToken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

const app = express();
const PORT = 3005


//middlewares here
app.use(express.json()); // this to get req.body
app.use(cors());
app.use('/secure-request', validateToken, /*routes*/);

// ROUTES
app.post('/login', require('./src/controllers/loginController'));
app.post('/register', require("./src/controllers/registerController"));
app.post('/api/checkout', require('./src/controllers/paymentsController'),async (req, res) => {
       try{
        console.log(req.body)
        const {id, amount} =req.body    
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:"€",
            description:"Recarga 10€",
            payment_method:id,
            confirm:true  
        })
    console.log(payment)
    res.send({message:"Pago con éxito"});
} catch (error){
    console.log(error);
    res.json({message: "error",error: error.message });
}
});


app.listen(PORT,
    () => { console.log(`server in port ${PORT}`) })