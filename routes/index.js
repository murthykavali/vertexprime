var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'welcome',
  database : 'prime'
});

connection.connect();



/* GET home page. */
router.get('/', function (req, res, next) {
	

    res.render('home', {title: 'home'});
});

/* Get person*/

router.get('/persons', function (req, res, next) {
    

  var self= res;
    connection.query('SELECT first_name,last_name from persons;', function(err, rows, fields) {
    if (!err){
      // rows = JSON.stringify(rows);
      console.log('The solution is: ', rows);
      self.render('persons', {title: 'Persons', personData: rows});
    }else{
      console.log('Error while performing Query.');
    }
});
	  
});

/*Get Registrations*/
router.get('/registrations', function (req, res, next) {
  var self= res;
    connection.query('select person_id, first_name, last_name, GROUP_CONCAT(sport_name) as sports from (select reg.person_id, first_name, last_name, sport_name from registrations reg LEFT JOIN persons p ON p.person_id = reg.person_id LEFT JOIN sports s ON s.sport_id = reg.sport_id ) as temp group by temp.person_id;', function(err, rows, fields) {
    if (!err){
      // rows = JSON.stringify(rows);
      console.log('The solution is: ', rows);
      self.render('registrations', {title: 'Persons', regData: rows});
    }else{
      console.log('Error while performing Query.');
    }

});

});

/*Get Registrations per sport*/
router.get('/sport_id/:sport_id', function (req, res, next) {
  var self= res;
    var sport_id= req.params.sport_id;
    connection.query('select first_name, last_name from persons where persons.person_id in (select person_id from  registrations r where r.sport_id='+sport_id+');', function(err, rows, fields) {
    if (!err){
      // rows = JSON.stringify(rows);
      console.log('The solution is: ', rows);
      self.render('reg-per-sport', {title: 'Registration Per Sport', regData: rows});
    }else{
      console.log('Error while performing Query.');
    }

});

});

/*Get Details per Person*/
router.get('/person/:person_id', function (req, res, next) {
  var self= res;
    var person_id= req.params.person_id;
    console.log("person id: "+person_id);
    console.log('select first_name, age, gender, block, flat from persons where person_id='+person_id+';');
    connection.query('select first_name, age, gender, block, flat from persons where person_id='+person_id+';', function(err, rows, fields) {
    if (!err){
      // rows = JSON.stringify(rows);
      console.log('The solution is: ', rows);
      self.render('person-details', {title: 'Person Details', regData: rows});
    }else{
      console.log('Error while performing Query.');
    }

});

});


/*Home*/
router.get('/home', function (req, res, next) {
    res.render('home', {title: 'home'});
});


module.exports = router;
