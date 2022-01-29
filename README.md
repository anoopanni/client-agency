# client-agency
To create REST API for basic CRUD operations on two main entities - Agency and Client using express js

Reference : 

// https://www.c-sharpcorner.com/blogs/setting-up-token-based-authentication-in-node-js-using-express-framework

a.install node runtime environment 

b.npm installs : 

    1. npm init --> to create package.jso, keep pressing enter until the end

    2. npm install body-parser jsonwebtoken morgan sequelize --save
    3. npm install express --save

c. How to run express.js server; the port is set to 8080 in the code

    1. node app.js

d. Install mysql driver to connect to the database from express.js

    1. npm install mysql

e. Put the following key-value pair in the header for all subsequent requests after obtaining token : "x-access-token" : "token"

f. Payload for endpoint : http://localhost:8080/api/createagency-client

    payload : 
    {
        "agency_name": "a", 
        "address_1":"a1", 
        "address_2":"a2", 
        "state": "s", 
        "city": "c", 
        "agency_phone": "1234",
        "clients":
            [
                {"client_name":"cn",
                "email":"ce",
                "client_phone":"cp",
                "total_bill":"tb"}, 

                {"client_name":"cn2",
                "email":"ce2",
                "client_phone":"cp2",
                "total_bill":"tb2"},

                {"client_name":"cn3",
                "email":"ce3",
                "client_phone":"cp3",
                "total_bill":"tb3"}
            ]
    }

    Result : 
        Result Agency: {"fieldCount":0,"affectedRows":1,"insertId":19,"info":"","serverStatus":2,"warningStatus":0}
        POST /api/createagency-client 200 4.129 ms - 18
        Result Client: {"fieldCount":0,"affectedRows":1,"insertId":6,"info":"","serverStatus":2,"warningStatus":0}
        Result Client: {"fieldCount":0,"affectedRows":1,"insertId":7,"info":"","serverStatus":2,"warningStatus":0}
        Result Client: {"fieldCount":0,"affectedRows":1,"insertId":8,"info":"","serverStatus":2,"warningStatus":0}

