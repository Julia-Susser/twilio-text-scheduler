
const https = require('https');
const path = require('path');
const fs = require('fs')
const readline = require('readline');
const {google} = require('googleapis');
const date = require('date-and-time');

const today = new Date(2015, 0, 2);
const yesterday = new Date(2015, 0, 1);

date.subtract(today, yesterday).toDays();           // => 1 = today - yesterday
date.subtract(today, yesterday).toHours();          // => 24
console.log(date.subtract(today, yesterday).toMinutes())



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
          var minute = parseInt(time.split("T")[1].split(":")[1])
          var hours = parseInt(time.split("T")[1].split(":")[0])+7
          var year = parseInt(time.split("T")[0].split("-")[0])
          var month = parseInt(time.split("T")[0].split("-")[1])-1
          var datee = parseInt(time.split("T")[0].split("-")[2])
          console.log(event.summary)
          message = "lolo"



          dt = new Date(year,month,datee,hours,minute, 00);
          console.log(dt)
          const today = new Date()
          console.log(today)
          var hey = (date.subtract(dt, today).toMinutes())
          console.log(hey)
          if (hey < 10){
            console.log("whoop")
            
            var twilio = require('twilio');
            var client = new twilio(accountSid, authToken);

            client.messages.create({
                body: 'You have' +event.summary+'in' + date.subtract(dt, today).toMinutes(),
                to: '4154056458',  // Text this number
                from: '+12162386619' // From a valid Twilio number
            })
            .then((message) => console.log(message.sid));
          }

          //date.subtract(dt, today).toDays();
        });
    }
  }
