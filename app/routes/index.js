'use strict';

var moment = require('moment');
// var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');

module.exports = function (app, db) {
   app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });

  app.route('/:time')
      .get(function (req, res) {
        // get user input
        var time = req.params.time;

        // create default return object
        var dateObj = { "unix": null, "natural": null };

        // search regex
        var findLetters = /([A-Z])\w+/gi;
        var findNonWord = /\W+/gi;
        var findNumbers = /^\d+$/gi;

        if(time.match(findLetters)){
          //has letters
          // console.log('has letter: '  + time);
          var iDate = new Date(time);
          var nDate = moment(iDate).format("MMMM DD, YYYY");
          var uDate = Date.parse(nDate);
          if (nDate !== 'Invalid date') {
            dateObj.unix = uDate;
            dateObj.natural = nDate;
          }
        }else if (time.match(findNonWord)) {
          //has special characters
          // console.log('non word characters: ' + time);

          // is it a negative number
          if (+time < 0) {
            console.log('less than zero');
            var nDate = moment(+time).format("MMMM DD, YYYY");
            var uDate = moment(nDate).format("x");
          } else {
            // treat as a date format
            var iDate = new Date(time);
            var nDate = moment(iDate).format("MMMM DD, YYYY");
            var uDate = Date.parse(nDate);
          }
          if (nDate !== 'Invalid date') {
            dateObj.unix = uDate;
            dateObj.natural = nDate;
          }
        }else if (time.match(findNumbers)){
          // numbers only (timestamp)
          // console.log('number only: '  + time);
          var iDate = moment(+time);
          var nDate = moment(+time).format("MMMM DD, YYYY");
          var uDate = moment(iDate).format("x");
          if (nDate !== 'Invalid date') {
            dateObj.unix = +time;
            dateObj.natural = nDate;
          }
        }
        res.send(dateObj);
      });

};
