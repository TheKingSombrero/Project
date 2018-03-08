var express = require('express');
var mysql=require('mysql');
var router = express.Router();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Project"
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/register.html');
});
router.post('/newuser',function(req,res,next){
  var name=req.body.user;
  var password=req.body.pass1;
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO Users (username, password) VALUES ("+mysql.escape(name)+','+mysql.escape(password)+')';
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
      res.send("Thank You!");
    });
});

router.post('/makemission', function(req,res,next){
  var name=req.body.name;
  var desc=req.body.desc;
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO `Project`.`missions` (`name`, `description`) VALUES ("+mysql.escape(name)+','+mysql.escape(desc)+');';
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    res.send("Mission Created!");
  });
});


router.post('/login', function(req,res,next){
  var name=req.body.username;
  var pass=req.body.pass;

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Project"
  });

  con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
    var sql="SELECT id,username,password FROM Users WHERE username = "+mysql.escape(name)+" AND password = "+mysql.escape(pass)+';';
    console.log(sql);
    con.query(sql,function (err,result){
      if (err) throw err;
      var resa=result;
      console.log("a");
      if (resa.length<=0){
        res.send("User Doesn't exist");
      }
      else{
        res.cookie("user_id", resa[0]);
        res.redirect('/');
      }
    });

  });
});






module.exports = router;
