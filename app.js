
// #region variables 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var engine = require('ejs-locals')
var mongoose = require("mongoose")
var user = require('./models/User')
app.use(express.static('public'));


var auth = require('./routes/auth');
var home = require('./routes/home');
var admin = require('./routes/admin');
var admin = require('./routes/admin');
var user = require('./routes/user');

var businessbookapi = require('./routes/businessbookapi');



var app = express();
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/ravicosoft', {
  useNewUrlParser: true,useUnifiedTopology: true
});
app.use(bodyParser.json({
  limit: '100mb'
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, PATCH, OPTIONS,DELETE");
  next()
});
app.use(express.static("public"));


//dbsetting();
async function dbsetting() {
  await user.remove({});
  var adminuser  = await user.findOne({username: 'admin',role: 'admin'});
  if(!adminuser){
    await user.create({
      activestatus: 'active',
      createdDate: Date.now(),
      designation: 'web admin',
      description:"I am web admin",
      email: "admin@admin.com",
      emailsecondary: "admin2@admin.com",
      fullname: 'web admin',
      facebook: 'facebook',
      lastlogindate: Date.now(),
      linkedin: "linkedin",
      phone: '03024759550',
      phonesecondary: 'phonesecondary',
      password: "admin@123",
      profileimage: "/uploads/defaultprofileimage.png",
      role: 'admin',
      skype: 'skype',
      twitter: 'twitter',
      username: 'admin',
      website: 'www.agencywebsite.com',
      whatsapp: '123456',
      youtube: 'youtube',
    })
  }
}

app.use('/auth', auth);
app.use('/admin', admin);
app.use('/home', home);
app.use('/user', user);
app.use('/businessbookapi', businessbookapi);

app.get('/', (req, res) => {
  res.redirect("/home/index")
});

app.get('/admin/users',function(req,res)
{
  res.render('admin/users');
  console.log("this is render page");
})

module.exports = app;