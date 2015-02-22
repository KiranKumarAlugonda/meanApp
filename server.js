var express = require('express'),
     app = express(),
     mongoose = require('mongoose'),
     bodyParser = require('body-parser'),
     meetupsController = require ('./server/controllers/meetups-controller')

//creating new connection for mongodb
mongoose.connect('mongodb://localhost:27017/mean-demo');
//body parser
app.use(bodyParser.urlencoded({
extended:true
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/views/index.html');
});
app.use('/js',express.static(__dirname + '/client/js'));

//REST Api req from client side
app.get('/api/meetups',meetupsController.list);

app.post('/api/meetups',meetupsController.create);
app.listen(3000, function () {

  console.log('Example app listening ');

})