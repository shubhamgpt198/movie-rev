const express=require('express');
const https= require('https');
const axios = require('axios');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

const app= express();
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


function getinfo(){

 axios.get('https://www.omdbapi.com/?apikey=df98cf78&t='+global.inputContent)
  .then(response => {
    console.log(response.data);
     global.mydata=response.data;
    //console.log(response.data);
  })
  .catch(error => {
    console.log(error);
	global.mydata=response.error;
  });  
}

app.get('/', function(req, res){
    res.render('main.ejs');
    });

	app.get('/main', function(req, res){
		
    res.render('head.ejs',{buffer:global.mydata,poster:global.mydata.Poster});
    });

	app.post('/fetch', function(req, res){
	global.inputContent = encodeURI(req.body.textField);
	
	getinfo();
	res.render('down.ejs');
    });

    app.get('/about', function(req, res){
      res.render('about.html', );
      });
  


console.log("App running on: localhost:3000");
app.listen(app.get('port'), function() {
});
