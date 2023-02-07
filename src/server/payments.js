const express= require ('express');
const stripe= requiere('stripe');
const cors= require('cors');
const { application } = require('express');


const payments= express()

payments.listen(3002,()=> {
    console.log('Server running')
})