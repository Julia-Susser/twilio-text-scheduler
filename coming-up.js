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


   var CronJob = require('cron').CronJob;
   var job = new CronJob('* * * * *', function() {
     console.log('You will see this message every minute');










  // If modifying these scopes, delete token.json.
  const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = 'token.json';
  var message = "NOT FUNCTIONING"
  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), listEvents);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  /**
   * Lists the next 10 events on the user's primary calendar.
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  function listEvents(auth) {
    const calendar = google.calendar({version: 'v3', auth});
    array = [ 'urbanschool.org_151l8696c0cvkfjcd161aqjhe4@group.calendar.google.com', 'urbanschool.org_btoskt8ic4d9ke2c1upb1imtsk@group.calendar.google.com', 'urbanschool.org_37evj8vlg4c74dfeqs30iege68@group.calendar.google.com', 'urbanschool.org_fjk6q206d20g5rmc392euaith8@group.calendar.google.com', 'urbanschool.org_pcn53sms29doc6cc7ek3evpm0o@group.calendar.google.com', 'urbanschool.org_fs89aeekvnn5e1eokvjnc3cggo@group.calendar.google.com', 'urbanschool.org_124b159h4fpa5u6terdvgb8518@group.calendar.google.com', 'urbanschool.org_fs89aeekvnn5e1eokvjnc3cggo@group.calendar.google.com', 'primary',  'urbanschool.org_0prn3mk4j8p4cajuaj06ndi6vg@group.calendar.google.com'];
  for (index = 0; index < array.length; index++) {
      console.log(array[index]);
        calendar.events.list({
          calendarId:array[index],
          timeMin: (new Date()).toISOString(),
          maxResults: 1,
          singleEvents: true,
          orderBy: 'startTime',
        }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          const event = res.data.items[0];

          var time = event.start.dateTime
          var minute = time.split("T")[1].split(":")[1]
          var hours = time.split("T")[1].split(":")[0]
          var year = time.split("T")[0].split("-")[0]
          var month = time.split("T")[0].split("-")[1]
          var date = time.split("T")[0].split("-")[2]
          console.log(event.summary)
          message = "lolo"
          console.log(hours)

          dt = new Date(year,month,date,hours,minute, 00);
          console.log(dt)
          var dif = diff_minutes(dt);
          console.log(dif)
          if (dif <= 10){

            var twilio = require('twilio');

            var accountSid = 'ACba12b2496ef12926253f813be8e1876a'; // Your Account SID from www.twilio.com/console
            var authToken = '28bde1e4f5baba87087e579cd3706ddf';   // Your Auth Token from www.twilio.com/console

            var twilio = require('twilio');
            var client = new twilio(accountSid, authToken);
            client.messages.create({
                body: `${event.summary} is in ${dif} minutes!`,
                to: '4154056458',  // Text this number
                from: '+12162386619' // From a valid Twilio number
            })
            .then((message) => console.log(message.sid));
          }
        });
    }
  }

}, null, true, 'America/Los_Angeles');
job.start();
}