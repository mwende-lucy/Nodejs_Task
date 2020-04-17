//All my routes are done here

const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'students_apidb'
}); 

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected');
});

//setting views file
app.set('views' ,path.join(__dirname,'views'));

//setting view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//rest api to get aal results
app.get('/',(req, res) => {
    //res.send('Lucy NodeJs Student Task');
    let sql = "SELECT * FROM students";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
    res.render('student_index' ,{
        title : 'Lucy NodeJs Student Task',
        students : rows
        });
    });
});

/*
//rest api to create a new record into mysql database
app.post('/students', function (req, res) {
    var postData  = req.body;
    connection.query('INSERT INTO students SET ?', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });
*/

 //add new records 
app.get('/add',(req, res) => {
    //res.send('New Student Form Page');
    res.render('student_add' ,{
        title : 'Lucy NodeJs Student Task'
     });
});

/*
//rest api to get a single student data
app.get('/students/:id', function (req, res) {
    console.log(req);
    connection.query('select * from students where id=?', [req.params.id], function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });
*/

//creating students
app.post('/save',(req, res) => {
    let data = {fullname: req.body.fullname, email: req.body.email, phone_no: req.body.phone_no};
    let sql = "INSERT INTO students SET ?";
    let query = connection.query(sql, data,(err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});


/*
//rest api to update record into mysql database
app.put('/students', function (req, res) {
    connection.query('UPDATE `students` SET `students_fullname`=?,`students_email`=?,`students_phone_no`=? where `id`=?', [req.body.students_fullname,req.body.students_email, req.body.students_phone_no, req.body.id], function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });
*/

//updating or Reading students
app.get('/edit/:studentId',(req, res) => {
    const studentId = req.params.studentId;
    let sql = `Select * from students where id = ${studentId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('student_edit', {
            title : 'Lucy NodeJs Student Task',
            student : result[0]
        });
    });
});

app.post('/update',(req, res) => {
    const studentId = req.body.id;
    let sql = "update students SET fullname='"+req.body.fullname+"',  email='"+req.body.email+"',  phone_no='"+req.body.phone_no+"' where id ="+studentId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});


/*rest api to delete record from mysql database
app.delete('/students', function (req, res) {
    console.log(req.body);
    connection.query('DELETE FROM `students` WHERE `id`=?', [req.body.id], function (error, results, fields) {
       if (error) throw error;
       res.end('Record has been deleted!');
     });
 });
*/

//Deleting Students
app.get('/delete/:studentId',(req, res) => {
    const studentId = req.params.studentId;
    let sql = `DELETE from students where id = ${studentId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});
 

/*//server listening
app.listen(5000, () => {
    console.log('Server is running at port 5000');
});*/
app.listen(process.env.PORT || 5000, function () { 
    console.log("SERVER STARTED PORT: 5000"); 
}); 