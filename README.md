# client-agency
To create REST API for basic CRUD operations on two main entities - Agency and Client using express js

Reference : 

// https://www.c-sharpcorner.com/blogs/setting-up-token-based-authentication-in-node-js-using-express-framework

a.install node runtime environment 

b.npm installs : 

    1. npm init --> to create package.jso, keep pressing enter until the end

    2. npm install body-parser jsonwebtoken morgan sequelize --save
    3. npm install express --save

c. (OR) How to install project dependencies without doing npm install {{package_name}} ?
    1. cd {{project_directory}}
    2. npm install

d. How to run express.js server; the port is set to 8080 in the code

    1. node app.js

e. Install mysql driver to connect to the database from express.js

    1. npm install mysql

f. Put the following key-value pair in the header for all subsequent requests after obtaining token : "x-access-token" : "token"

g. Payload for endpoint : http://localhost:8080/api/createagency-client

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

h. payload for endpoint : http://localhost:8080/api/update-client   [client_name is a unique value in the table 'client']; client is a compulsary field. 

    payload : {
    "client_name":"abc",
    "agency_id":100
    }

    output examples ; 

    1. sql:UPDATE client_agency_schema.Client SET agency_id=100 WHERE client_name='abc';
    Result Client: {"fieldCount":0,"affectedRows":0,"insertId":0,"info":"Rows matched: 0  Changed: 0  Warnings: 0","serverStatus":2,"warningStatus":0,"changedRows":0}
    PATCH /api/update-client 200 19.161 ms - 18
    2. sql:UPDATE client_agency_schema.Client SET agency_id=100 WHERE client_name='cn';
    Result Client: {"fieldCount":0,"affectedRows":1,"insertId":0,"info":"Rows matched: 1  Changed: 1  Warnings: 0","serverStatus":2,"warningStatus":0,"changedRows":1}
    PATCH /api/update-client 200 4.515 ms - 18

i.  payload for endpoint : http://localhost:8080/api/get-topclien, Get the top client whose total_bill is max. replace limit value in the SQL to get more than one top client details. 

    payload : {
        "client_name": "cn3",
        "agency_name": "a",
        "total_bill": "tb3"
    }

    Result : 

    Result Client: [{"client_name":"cn3","agency_name":"a","total_bill":"tb3"}]
    GET /api/get-topclient 200 9.115 ms - 60