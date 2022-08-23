const Product = require('../models/product');
var nodemailer = require('nodemailer'),
  _ = require('lodash')
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'ananthdakoji007@gmail.com',
    pass: 'ananth@123'
  }
}));

exports.sendMail = async (req, res) => {

  // await Product.find({ quantity: { $lt: 10 } }, ((err, product) => {
  //   if (err || !product) {
  //     return res.status(400).json({
  //       error: 'Product not found',
  //     });
  //   }
  //   if (product) {
  //     send(product);
  //     return res.send("Mail sent successfully");
  //   }
  //   else {
  //     res.send("No products found")
  //   }
  // }))
  res.send("mail sent successfully")
}

async function send(product) {

  product.map(async (list) => {
    const result = await transporter.sendMail({
      from: 'ananthdakoji007@gmail.com',
      to: 'a6370203309@gmail.com',
      subject: `${list.name} have less than 10 stocks`,
      text: `please order ${list.name}'s stocks`
    });

    console.log(JSON.stringify(result, null, 4));

  })

}
