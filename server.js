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
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


let resposta = {}
app.get(
  "/api/:dados",
  (req, res) => {
    let dados = req.params.dados
    //formato data -
    if (dados.includes("-") || dados.includes("/") || dados.includes(" ")){
      resposta['unix'] = new Date(dados).getTime()
      resposta['utc'] = new Date(dados).toUTCString()
    } else {
    //fomato timestamp
      dados = parseInt(dados)
      resposta['unix'] = new Date(dados).getTime()
      resposta['utc'] = new Date(dados).toUTCString()
    }
    //  else {
    //   resposta['unix'] = new Date(dados).getTime()
    //   resposta['utc'] = new Date(dados).toUTCString()
    // }
    if(!resposta['unix'] || !resposta['utc']){
      res.json({error: 'Invalid Date'})
    }
    res.json(resposta)
  }
)
//se nao informar dados
app.get("/api",
  (req, res) => {
    resposta['unix'] = new Date().getTime()
    resposta['utc'] = new Date().toUTCString()
    res.json(resposta)
  }
  
)

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
