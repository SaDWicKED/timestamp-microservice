// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  return res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res) {
  return res.json({"unix": new Date().getTime(), "utc": new Date().toUTCString()});
})
 
app.get("/api/:date", function (req, res) {
  const unixRegex = /\d{13}/g;
  let date = new Date(req.params.date);
  
  if(unixRegex.test(req.params.date)) {
    date=new Date(parseInt(req.params.date));
  } else if(!(date instanceof Date) || isNaN(date)) {
    return res.status(400).send({
      error: 'Invalid Date'
    });
  }
  return res.json({"unix": date.getTime(), "utc": date.toUTCString()});
});

const port = process.env.PORT || 5000;
// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
