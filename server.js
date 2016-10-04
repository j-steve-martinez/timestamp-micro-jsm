'use strict';
// User Story: I can pass a string as a parameter, and it will check to see whether
//    that string contains either a unix timestamp or a natural language date (example: January 1, 2016).
// User Story: If it does, it returns both the Unix timestamp and the natural language form of that date.
// User Story: If it does not contain a date or Unix timestamp, it returns null for those properties.
var express = require('express');
// var mongo = require('mongodb');
var routes = require('./app/routes/index.js');
var app = express();

// mongo.connect('mongodb://localhost:27017/clementinejs', function (err, db) {
//
//    if (err) {
//       throw new Error('Database failed to connect!');
//    } else {
//       console.log('Successfully connected to MongoDB on port 27017.');
//    }

   app.use('/public', express.static(process.cwd() + '/public'));
  //  app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

  //  routes(app, db);
   routes(app);

   app.listen(3000, function () {
      console.log('Node.js listening on port 3000...');
   });

// });
