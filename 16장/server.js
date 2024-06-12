const dotenv = require('dotenv').config();

const mongoclient = require("mongodb").MongoClient;
const ObjId = require("mongodb").ObjectId;
//const url = process.env.DB_URL;
const url = "mongodb+srv://admin:1111@cluster0.hmvwkf5.mongodb.net/?retryWrites=true&w=majority";
let mydb;
mongoclient
  .connect(url)
  .then((client) => {
    mydb = client.db("myboard");
    // app.listen(process.env.PORT, function () {
    //   console.log("포트 8080으로 서버 대기중 ... ");
    // });
    app.listen(8080, function () {
      console.log("포트 8080으로 서버 대기중 ... ");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// MySQL + nodejs 접속 코드
// var mysql = require("mysql");
// var conn = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "123456",
//   database: "myboard",
// });

// conn.connect();

const express = require("express");
const app = express();

// const sha = require('sha256');

// let session = require("express-session");
// app.use(
//   session({
//     secret: "dkufe8938493j4e08349u",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

//body-parser 라이브러리 추가
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//정적 파일 라이브러리 추가
//app.use(express.static("public"));
app.use("/public", express.static("public"));

app.use('/', require('./routes/post.js'))
app.use('/', require('./routes/add.js'))
app.use('/', require('./routes/auth.js'))

app.get("/book", function (req, res) {
  res.send("도서 목록 관련 페이지입니다.");
});

// app.get("/", function (req, res) {
//   //res.render("index.ejs");
//   if (req.session.user) {
//     console.log("세션 유지");
//     //res.send('로그인 되었습니다.');
//     res.render("index.ejs", { user: req.session.user });
//   } else {
//     console.log("user : null");
//     res.render("index.ejs", { user: null });
//   }
// });

// //'/enter' 요청에 대한 처리 루틴
// app.get("/enter", function (req, res) {
//   // res.sendFile(__dirname + '/enter.html');
//   res.render("enter.ejs");
// });

// //'/save' 요청에 대한 post 방식의 처리 루틴
// app.post("/save", function (req, res) {
//   console.log(req.body.title);
//   console.log(req.body.content);
//   //몽고DB에 데이터 저장하기
//   mydb
//     .collection("post")
//     .insertOne({
//       title: req.body.title,
//       content: req.body.content,
//       date: req.body.someDate,
//       path: imagepath
//     })
//     .then((result) => {
//       console.log(result);
//       console.log("데이터 추가 성공");
//     });

//   res.redirect("/list");
// });



let cookieParser = require("cookie-parser");

app.use(cookieParser("ncvka0e398423kpfd"));
app.get("/cookie", function (req, res) {
  let milk = parseInt(req.signedCookies.milk) + 1000;
  if (isNaN(milk)) {
    milk = 0;
  }
  res.cookie("milk", milk, { signed: true });
  //res.clearCookie('milk');
  res.send("product : " + milk + "원");
});

// app.get("/session", function (req, res) {
//   console.log(req.session.milk);
//   if(isNaN(req.session.milk))
//   {
//     req.session.milk = 0;
//   }
//   req.session.milk = req.session.milk + 1000;
//   res.send("session : " + req.session.milk + "원");
// });

// app.get("/login", function (req, res) {
//   console.log(req.session);
//   if (req.session.user) {
//     console.log("세션 유지");
//     //res.send('로그인 되었습니다.');
//     res.render("index.ejs", { user: req.session.user });
//   } else {
//     console.log("로그인 페이지");
//     res.render("login.ejs");
//   }
// });

// app.post("/login", function (req, res) {
//   console.log("아이디 : " + req.body.userid);
//   console.log("비밀번호 : " + req.body.userpw);
//   //res.send('로그인 되었습니다.');
//   mydb
//     .collection("account")
//     .findOne({ userid: req.body.userid })
//     .then((result) => {
//       // console.log(result);
//       // console.log(md5(req.body.userpw));
//       if (result.userpw == sha(req.body.userpw)) {
//         req.session.user = req.body;
//         console.log("새로운 로그인");
//         //res.send('로그인 되었습니다.');
//         res.render("index.ejs", { user: req.session.user });
//       } else {
//         //res.send('비밀번호가 틀렸습니다.');
//         res.render("login.ejs");
//       }
//     });
// });

// app.get("/logout", function (req, res) {
//   console.log("로그아웃");
//   req.session.destroy();
//   res.render("index.ejs", { user: null });
// });

// app.get("/signup", function (req, res) {
//   res.render("signup.ejs");
// });

// app.post("/signup", function (req, res) {
//   console.log(req.body.userid);
//   console.log(sha(req.body.userpw));
//   console.log(req.body.usergroup);
//   console.log(req.body.useremail);

//   mydb
//     .collection("account")
//     .insertOne({
//       userid: req.body.userid,
//       userpw: sha(req.body.userpw),
//       usergroup: req.body.usergroup,
//       useremail: req.body.useremail,
//     })
//     .then((result) => {
//       console.log("회원가입 성공");
//     });
//   res.redirect("/");
// });

// let multer = require('multer');

// let storage = multer.diskStorage({
//   destination : function(req, file, done){
//     done(null, './public/image')
//   },
//   filename : function(req, file, done){
//     done(null, file.originalname)
//   }
// })

// let upload = multer({storage : storage});

// app.get('/upload', function(req, res){
//   res.render('upload.ejs');
// })

// app.post('/photo', function(req, res){
//   console.log("서버에 파일 첨부하기");
// })
// let imagepath = '';
// app.post('/photo', upload.single('picture'), function(req, res){
//  console.log(req.file.path);
//  imagepath = '\\' + req.file.path;
// })

app.get('/search', function(req, res){
  console.log(req.query);
  mydb
  .collection("post")
  .find({ title:req.query.value }).toArray()
  .then((result) => {
    console.log(result);
    res.render("sresult.ejs", { data: result });
  })
})


//app.get('/image/:imgname', function(req, res){
//  res.sendFile(__dirname + '/public/image/' + req.params.imgname);
//})