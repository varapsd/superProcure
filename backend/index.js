const express = require('express');
const mongoose = require('mongoose');
const csvtojson = require('csvtojson');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())

var url = "mongodb+srv://vara:vara@mycluster.zucif.gcp.mongodb.net/beetle?retryWrites=true&w=majority"
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', function (callback) {
    console.log('Successfully connected to MongoDB.');
});

var Branch = require('./Models/Branch').Branch;
var BranchLogin = require('./Models/BranchLogin').BranchLogin;
var Notification = require('./Models/Notificaiton').Notification;
var Admin = require('./Models/Admin').Admin;

    /*
    csvtojson()
	  .fromFile("./Models/inputFile.csv")
	  .then(csvData => {
	  	branchesList = [];
        branchesLoginList = [];
	    for(let i = 0; i < csvData.length ; i++){
	    	var fieldkeys = Object.keys(csvData[0]);
            //console.log(csvData[i][fieldkeys[6]].split(',').map(num=> num.trim()!='' ? Number(num) : null).filter((num)=> {return num!=null}) );
	    	var branch = new Branch({
                bId : i+1,
                institutionName : csvData[i][fieldkeys[0]],
                branchName : csvData[i][fieldkeys[1]],
                address : csvData[i][fieldkeys[2]],
                city : csvData[i][fieldkeys[3]],
                contactNumbers : csvData[i][fieldkeys[4]].split(',').map(num=> num.trim()),
                branchInchanrge : csvData[i][fieldkeys[5]],
                Pincodes : csvData[i][fieldkeys[6]].split(',').map(num=> num.trim()!='' ? Number(num) : null).filter((num)=> {return num!=null})
	    	})
	    	branchesList.push(branch);
            var branchLogin = new BranchLogin({
                bId : i+1,
                userName : csvData[i][fieldkeys[1]],
                password : csvData[i][fieldkeys[1]],
                notifications : [],
                newNotificaitons : []
            })
            branchesLoginList.push(branchLogin);
	    }
        Branch.insertMany(branchesList,(err,data)=>{
            if(err) throw err;
            console.log('success');
        });
        BranchLogin.insertMany(branchesLoginList,(err,data)=>{
            if(err) throw err;
            console.log('added logins')
        })
      });
      var admin = new Admin({
        userName : 'admin',
        password : 'admin',
        notifications : [],
        newNotificaitons : []
      })
      admin.save(err=>{
          if(err) throw err;
          console.log('admin added');
      })
      */

app.get('/',async(req,res)=>{
    res.send("helo world");
    Branch.find({Pincodes : { $all : [700001]}},(err,validBranches)=>{
        var branchesList = [];
        validBranches.forEach(branch => {
            branchesList.push(branch.bId);
        });
        console.log(branchesList);
        BranchLogin.find({bId : { $in : branchesList}},(err,validBranchLogin)=>{
            console.log(validBranchLogin);
        })
    })
})

app.get('/search/:pin',(req,res)=>{
    Branch.find({ Pincodes : { $all : [Number(req.params.pin)]}},(err,data)=>{
        res.send(data);
    });
})
app.post('/search',async(req,res)=>{
    var notificaitonId = await Notification.countDocuments({});
    var notification = new Notification({
        notificaitonId : notificaitonId,
        name : req.body.name,
        phone : req.body.phone,
        pin : req.body.pin,
        email : req.body.email
    })
    notification.save((err)=>{
        if(err) throw err;
        Branch.find({Pincodes : { $all : [Number(req.body.pin)]}},(err,validBranches)=>{
            var branchesList = [];
            validBranches.forEach(branch => {
                branchesList.push(branch.bId);
            });
            BranchLogin.find({bId : { $in : branchesList}},(err,validBranchLogin)=>{
                console.log(validBranchLogin);
                validBranchLogin.forEach(branchLogin=>{
                    branchLogin.notifications.push(notificaitonId);
                    branchLogin.newNotificaitons.push(notificaitonId);
                    branchLogin.save(err=>{
                        if(err) throw err;
                    })
                })
                Admin.findOne({},(err,validAdmin)=>{
                    validAdmin.notifications.push(notificaitonId);
                    validAdmin.newNotificaitons.push(notificaitonId);
                    validAdmin.save(err=>{
                        if(err) throw err;
                    })
                })
            })
            res.send(validBranches);
        })
    })
});

app.post("/login",(req,res)=>{
    var resObj = {
        isSuccess : false,
        branchData : null,
        notifications : null,
        newNotificaitons : null,
    }
    BranchLogin.findOne({userName : req.body.uName , password : req.body.passwd},(err,validBranch)=>{
        if(err || !validBranch){
            res.send(resObj);
        }
        else{
            resObj.isSuccess = true;
            resObj.newNotificaitons = validBranch.newNotificaitons;
            Notification.find({notificaitonId : {$in : validBranch.notifications}},(err,validNotifications)=>{
                resObj.notifications = validNotifications;
                Branch.findOne({bId : validBranch.bId},(err,validBranchData)=>{
                    resObj.branchData = validBranchData;
                    validBranch.newNotificaitons = [];
                    validBranch.save(err=>{
                        if(err) throw err;
                    })
                    res.send(resObj);
                })
            })
        }
    })
})

app.post('/adminLogin',(req,res)=>{
    console.log(req.body.uName,req.body.passwd);
    var resObj = {
        isSuccess : false,
        notifications : null,
        newNotificaitons : null,
    }
    Admin.findOne({userName : req.body.uName , password : req.body.passwd},(err,validAdmin)=>{
        if(err || !validAdmin){
            res.send(resObj);
        }
        else{
            resObj.isSuccess = true;
            resObj.newNotificaitons = validAdmin.newNotificaitons;
            Notification.find({notificaitonId : {$in : validAdmin.notifications}},(err,validNotifications)=>{
                resObj.notifications = validNotifications;
                validAdmin.newNotificaitons = [];
                validAdmin.save(err=>{
                    if(err) throw err;
                })
                res.send(resObj);
            })
        }
    })
})
port = process.env.PORT || 8080;

app.listen(port,(err)=>{
    if(err) throw err;
    console.log("server started at "+port);
});