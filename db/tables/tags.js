const db = require("../index");

const sql = `CREATE TABLE IF NOT EXISTS tags (
  id INTEGER AUTO_INCREMENT,
  tag VARCHAR(255), 
  PRIMARY KEY(id)
)`;

db.query(sql, function (err, result) {
  if (err) throw err;
  console.log("add tags table");
});

// var query = `INSERT INTO tags(tag) VALUES('javascript')`;

// db.query(query, function (err, result) {
//   if (err) throw err;
// });

// var query = `INSERT INTO tags(tag) VALUES('react.js')`;

// db.query(query, function (err, result) {
//   if (err) throw err;
// });

// var query = `INSERT INTO tags(tag) VALUES('node.js')`;

// db.query(query, function (err, result) {
//   if (err) throw err;
// });

// var query = `INSERT INTO tags(tag) VALUES('vue.js')`;

// db.query(query, function (err, result) {
//   if (err) throw err;
// });

// var query = `INSERT INTO tags(tag) VALUES('angular.js')`;

// db.query(query, function (err, result) {
//   if (err) throw err;
// });

// var query = `INSERT INTO tags(tag) VALUES('swift')`;

// db.query(query, function (err, result) {
//   if (err) throw err;
// });

// var query = `INSERT INTO tags(tag) VALUES('C')`;

// db.query(query, function (err, result) {
//   if (err) throw err;
// });

// var query = `INSERT INTO tags(tag) VALUES('java')`;

// db.query(query, function (err, result) {
//   if (err) throw err;
// });

// var query = `INSERT INTO tags(tag) VALUES('C#')`;

// db.query(query, function (err, result) {
//   if (err) throw err;
// });

// var query = `INSERT INTO tags(tag) VALUES('C++')`;

// db.query(query, function (err, result) {
//   if (err) throw err;
// });

// var query = `INSERT INTO tags(tag) VALUES('python')`;

// db.query(query, function (err, result) {
//   if (err) throw err;
// });

// var query = `INSERT INTO tags(tag) VALUES('Mysql')`;

// db.query(query, function (err, result) {
//   if (err) throw err;
// });