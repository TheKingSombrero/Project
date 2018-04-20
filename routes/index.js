var express = require('express');
var mysql=require('mysql');
var router = express.Router();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Project"
});

//user creation
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
//mission creation
router.post('/makemission', function(req,res,next){
  var name=req.body.name;
  var desc=req.body.desc;
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "INSERT INTO `Project`.`missions` (`name`, `description`,userid) VALUES ("+mysql.escape(name)+','+mysql.escape(desc)+','+req.cookies.user_id+');';
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    res.send("Mission Created!");
  });
});

//login
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
    var sql="SELECT username,password FROM Users WHERE username = "+mysql.escape(name)+" AND password = "+mysql.escape(pass)+';';
    con.query(sql,function (err,result){
      if (err) throw err;
      if (result.length<=0){
        console.log("Login Failed");
        res.redirect("/login.html");
      }
      else{
        var sql="SELECT id,username,password FROM Users WHERE username = "+mysql.escape(name)+" AND password = "+mysql.escape(pass)+';';
        con.query(sql,function (err,result){
          if (err) throw err;
        console.log('user # '+ result[0].id +' logged in');
        if (req.cookie.loggedIn==false) res.clearCookie('loggedIn');
        res.cookie("user_id", result[0].id);
        res.redirect('/');
      });//query
    }//else
    });//query
  });
});

//mission retrieving
router.post('/retmissions', function(req,res,next){
  var id=req.cookies.user_id;
  var sql="SELECT * FROM missions where userid="+id;
  con.query(sql,function (err,result) {
    return result;
  });
});
module.exports=router;