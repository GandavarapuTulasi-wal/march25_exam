var express = require('express');
var router = express.Router();
const connector = require('../connect');
router.get('/createTable', function (req, res) {
  var sql =
    'CREATE TABLE User(id int AUTO_INCREMENT PRIMARY KEY,email varchar(100),password varchar(100),userinfo text,dob date)';
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get('/', function (req, res) {
  var sql = 'SELECT * from User';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
});
router.post('/', function (req, res) {
  const { email, password, userinfo, dob } = req.body;
  var sql = `INSERT INTO User (email,password,userinfo,dob) values ("${email}","${password}","${userinfo}","${dob}")`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.delete('/:id', function (req, res) {
  const sql = `DELETE FROM User WHERE id=${parseInt(req.params.id)}`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get('/deleteall', function (req, res) {
  const sql = `DELETE FROM User`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.put('/update/:id', function (req, res) {
  const { email, password, userinfo, dob } = req.body;
  var sql = `UPDATE User SET email="${email}",password="${password}",userinfo="${userinfo}",dob="${dob}" WHERE id=${parseInt(
    req.params.id
  )}`;
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
module.exports = router;
