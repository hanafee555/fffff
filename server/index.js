var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser');
const mysql = require('mysql2');

app.use(cors())
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: '123456789',
    database: 'finalproject'

});

app.get('/User', function (req, res, next) {
    connection.query(
  'SELECT * FROM Users',
  function(err, results, fields) {
    res.json(results);
    
   
    }
  );
  

})

app.post("/create", (req,res) =>{
    connection.query(
        "INSERT INTO `Users`(`Username`, `Email`, `Password`)VALUES (?,?,?)",
        [req.body.name,req.body.email,req.body.password],
        (err,result)=>{
            if(err){
                res.json({error: "Error inserting data in to database"});
            }else{
                res.json({message: "Data inserted successfully"});
            }
        }

    );

});

app.listen(3333, function () {
    console.log('CORS-enabled web server listening on port 3333')
  })