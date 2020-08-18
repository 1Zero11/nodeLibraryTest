exports.getForm = function(req, res){
  res.render('form', { title: 'Send Form'});
}

exports.postForm = function(req, res){
  var username = req.body.Name;
  console.log(username);
  console.log(req.body.Reason);
  console.log(req.body.cost);

  const dotenv = require('dotenv');
  dotenv.config();
  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });


  var mailOptions = {
    from: process.env.USER,
    to: process.env.OTHERUSER,
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome ' + req.body.Name + '</h1><p>Reason: '
      + req.body.Reason +'</p><p>Cost: '+ req.body.cost +'</p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  res.send('OK');
}
