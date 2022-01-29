var express = require('express');
var users = require('./users.json');  
var logger = require('morgan');  
var app = express();  
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(logger('dev'));  
var port = 8080; //setting port no.  
var jwt = require('jsonwebtoken');  
app.set('superSecret', "success is inevitable");  
var router = express.Router();  


// mysql connection
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "client_agency_schema"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// routers 

router.post('/authenticate', function(req, res) { //this will issue token for valid users  
    var username = req.body.user;  
    var password = req.body.password;  
    var isUserFound = false;  
    var foundUser = {};  
    console.log(username + " " + password);  
    for (let user of users) {  
        if (user.user === username) {  
            isUserFound = true;  
            foundUser = user;  
        }  
    }  
    if (isUserFound) {  
        if (foundUser.password == password) {  
            var token = jwt.sign(foundUser, app.get('superSecret'), {  
                expiresIn: 1440 // expires in 24 hours  
            });  
            console.log(token);  
            res.json({  
                success: true,  
                message: 'Enjoy your token!',  
                token: token  
            });  
        } else {  
            res.json({  
                success: false,  
                message: 'Authentication failed. Wrong password.'  
            });  
        }  
        res.send(foundUser);  
    } else {  
        res.json({  
            success: false,  
            message: 'Authentication failed. user not found.'  
        });  
    }  
});  

// middleware  
router.use(function(req, res, next) {  
  
    // check header or url parameters or post parameters for token  
    var token = req.body.token || req.query.token || req.headers['x-access-token'];  
  
    // decode token  
    if (token) {  
        // verifies secret and checks exp  
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {  
            if (err) {  
                return res.json({  
                    success: false,  
                    message: 'Failed to authenticate token.'  
                });  
            } else {  
                // if everything is good, save to request for use in other routes  
                req.decoded = decoded;  
                next();  
            }  
        });  
    } else {  
        // if there is no token  
        // return an error  
        return res.status(403).send({  
            success: false,  
            message: 'No token provided.'  
        });  
    }  
});  


router.get('/users', function(req, res) {  
    //console.log(User);  
    return res.json({  
        status: 'OK',  
        msg: "you are authenticated and all set to consume our services."  
    });  
   
});  

// router.use(function(req, res, next) {  
//     // do logging  
//     console.log('Something is happening.');  
//     next();  
// });  


router.post('/createagency-client', function(req, res) {
    sql = "INSERT INTO `client_agency_schema`.`Agency` (`agency_name`, `address_1`, `address_2`, `state`, `city`, `agency_phone`) VALUES (?, ?, ?, ?, ?, ?)";
    con.query(sql, [req.body.agency_name, req.body.address_1, req.body.address_2, req.body.state, req.body.city, req.body.agency_phone], function (err, result) {
        if (err) throw err;
        console.log("Result Agency: " + JSON.stringify(result));
        let agency_id = result.insertId;

        for(let client of req.body.clients) {
        sql = "INSERT INTO `client_agency_schema`.`Client` (`client_name`, `email`, `client_phone`, `total_bill`,`agency_id`) VALUES (?, ?, ?, ?, ?)";
        con.query(sql, [client.client_name, client.email, client.client_phone, client.total_bill, agency_id], function (err, result) {
            if (err) throw err;
            console.log("Result Client: " + JSON.stringify(result));    
        });
    }
      res.status(200).send("Request successful");
    })
});

// router.
   
app.use('/api', router);  
   
// START THE SERVER  
// =============================================================================  
app.listen(port);  
console.log('Magic happens on port ' + port);  
