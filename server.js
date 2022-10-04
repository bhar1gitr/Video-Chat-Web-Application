require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || "3000"
const {RtcTokenBuilder, RtcRole} = require('agora-access-token');
const path = require('path')
app.use(express.static(path.join(__dirname +'/public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


const APP_ID = process.env.APP_ID
const APP_CERTIFICATE =process.env.APP_CERTIFICATE
var TOKEN= null
var CHANNEL =null


app.get("/",function(req,res){
    res.render("index.ejs")
});

app.get("/:roomId",function(req,res){
    res.render("room.ejs",{
        APP_ID:APP_ID,
        CHANNEL:req.params.roomId,
        TOKEN:TOKEN
    })
});


app.post("/",(req,res)=>{
  CHANNEL=req.body.channelName
  let uid = 0;
  let role = RtcRole.PUBLISHER;
  let expireTime = 7200;
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;
  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, CHANNEL, uid, role, privilegeExpireTime);
  TOKEN = token
  res.redirect("/"+req.body.channelName)
})

app.listen(port)
