const { v4: uuidv4 } = require("uuid");
const https = require('https')
const Razorpay = require('razorpay');
const { response } = require("express");


var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

const PaymentController = {
    payment: async function(req, res){
      const {amount} = req.body;
    let receipt_id = Math.random()
    receipt_id = receipt_id *10000;
    receipt_id = Math.floor(receipt_id)
      var options = {
        amount: amount *100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_"+receipt_id,
      };
      try{
      let  order = await instance.orders.create(options);
      res.status(200).send({
        status:true,
        order,
      
      })

      }catch(error){
        res.status(500).send({
            status: false,
            message : " server Error",
            error,
        })
       
        
      }
    //   instance.orders.create(options, function(err, order) {
    //     console.log(order);
    //   });

    }

}

module.exports = PaymentController;