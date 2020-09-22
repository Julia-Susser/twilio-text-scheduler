const https = require('https');
const path = require('path');
const fs = require('fs')
const readline = require('readline');
const {google} = require('googleapis');

module.exports = function(app){




  function diff_minutes(dt){
     let date_ob = new Date();

     let date = ("0" + date_ob.getDate()).slice(-2);
     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
     let year = date_ob.getFullYear();
     let hours = date_ob.getHours();
     let minutes = date_ob.getMinutes();
     let seconds = date_ob.getSeconds();

     dtnow = new Date(year,month,date,hours,minutes,seconds);
     console.log(dtnow)

    var diff =(dtnow.getTime() - dt.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));

   }

var n = 0
   var CronJob = require('cron').CronJob;
   var job = new CronJob('* * * * *', function() {
     n += 1
     console.log('You will see this message every minute -- '+n);




}, null, true, 'America/Los_Angeles');
job.start();
}
