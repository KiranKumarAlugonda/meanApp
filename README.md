# This Mean js app Includes:
* mongodb
* expressjs
* angularjs
* nodejs

# Mondodb Features:
* Dynamic scheme
* Binary json
* Full index support
* map/reduce and aggregation
* scale and availability

# Running Mongodb and creating new db:

Open a terminal and run the mongod server.
`mongod` 
Open another terminal and run
`mongo`

To create a new db: 
`use mean-demo`

Initially we see that there are no collections
`show collections `
To insert a new key value pair(document)into the db
`db.meetups.insert({ name: “MEAN Developers”})`

Check now the db, you can see the meetups db is created 
`show collections`
`To display the data` 
db.meetups.find()


# Nodejs Features:

* Javascript on the server
* Google’s V8 engine
* Non-blocking asyn model
* NPM(Node package Manager):access to modules(ex:express)

# Running nodejs
Create a folder “meanApp”
,in that folder create two files
**server.js**
**package.json**


In package.json include:

    {
      name:"mean-demo",
      version:"0.0.1"
     }

In **server.js**

     console.log(“Hello from node‘);

When you to terminal and run:
`node server`
 you can see the output from terminal:
`Hello from node`

#Express Features:
* Web app Framework for node
* Http Server
* Routes
* middleware components

#Running Express
First, install the express in meanApp folder, after installing you will see a new module in node-modules folder, there will be a dependency created in package.json file.

`sudo npm install express --save`

After installing create folder and files
**/client/views/index.html**.

In **server.js**, put the lines:


     var express = require('express'),
     app = express();
     app.get('/', function (req, res) {
     res.sendfile(__dirname + '/client/views/index.html');
     })
     app.listen(3000, function () {
     console.log('Example app listening ');
      })


Run on terminal
`node server`
you can see the output on terminal
`Example app listening`
you can see at port 3000:

`localhost:3000`
`Hello`


#AngularJS Features:
* Client-side MVC Framework
* Build dynamic web apps
* Separate concerns
* Declarative UI Bindings
* Embeddable(use a little or as a much)
* Testable

#Running AngularJS


**Part 1: Displaying basic data**

_1.Create a basic index.html in **/client/views ** folder as below:_


     <!DOCTYPE html>
     <html ng-app="meetupApp"> 
       <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title></title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
       <body>

      <!-- Meetups View -->
      <div ng-controller="meetupsController">
        <h1>There are {{meetupsCount}} meetups</h1>
    
      </div>

      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.js"></script>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-resource.js"></script>

      <script type="text/javascript" src="/js/app.js"></script>
      <script type="text/javascript" src="/js/controllers/meetups-controller.js"></script>
      </body>
      </html>



We create a controller in **/client/js/controllers/meetup-controller.js** folder with:

    app.controller('meetupsController', ['$scope', '$resource', function ($scope, $resource) {
        $scope.meetups = [
         { name:"mean developer1"},
         {name:"mean deve2"}
         ]

        $scope.createMeetup = function(){
        $scope.meetups.push({name:$scope.meetupName});
        $scope.meetupName = '';
      }
     }]);

resource allows us to do http server calls 
which we have to declare it in file **/client/js/app.js**

    var app = angular.module('meetupApp', ['ngResource'])

We have to give a reference in index.html as below:
` <script type="text/javascript" src="/js/app.js"></script>`


**Part 2: Displaying form data and adding functionality**


In **index.html** add below lines:
       
       <div ng-controller="meetupsController">
        <h1>There are {{meetups.length}} meetups</h1>//displays the length
        <ul>
          <li ng-repeat="meetup in meetups">
            {{meetup.name}}
          </li>
        </ul>
        <form ng-submit="createMeetup()">
          <input type="text" placeholder="Meetup name" ng-model="meetupName"></input>
          <button type="submit">Add</button>
        </form> 
       </div>


Here we are creating a function ng-submit =”createMeetup “,and defining a ng-model , when ever there is any thing added it will be add to the text.

In controller:

     $scope.createMeetup = function(){
      $scope.meetups.push({name:$scope.meetupName});
      $scope.meetupName = ' ';
     }

We push the data to the “meetups” using push and it will be added to “meetup.name”

**Part 3:Adding resource to handle http request, by assinging the base url of the restful server.**

ngResource handles all the http request , instead of handling through the angular we have to create a folder for services and pass those links to the resource


_i)Creating a var to define the base url of our service_

     var Meetup = $resource(‘/api/meetups’)


_ii)Creating a new instance of the Meetup we have created in the createMeetup function_

     var meetup = new Meetup();
     meetup.name = $scope.meetupName;//setting a property 
     meetup.$save();


If you run the app now, you will receive a POST error.


_iii)Adding routes in **server.js**, which is post with a req and res function_

      app.post(‘/api/meetups’,function(req,res)){
        });

_iv)Till now we have mvc on client side we will have mvc in server side as well_

We create a folder **server/controllers/meetups-controller.js**

In this file we export the module, we give a reference about this in **server.js** so that express will handle the server side routing for us.

In meetups-controller.js, 

     module.exports.create = function(req,res){
     console.log(req.body);
      }

v)In **server.js** give reference of this controller:

     var express = require('express'),
     app = express(),
     meetupsController = require ('./server/controllers/meetups-controller')


When you run the app now you will see in the terminal as undefined.
Because by default express does not handle body request. we have to install another express module called body parser to handle this.

     npm install body-parser --save

give reference of this in **server.js**

     bodyParser = require(‘body-parser’)

     app.use(bodyParser.urlencoded({
     extended:true
      }));

     app.use(bodyParser.json());

When we run the app and type something in the 

we will see on server the message sent by the client as json object.

`This is from client `

**Part 4: To store from server into Mongodb** 

We could use mongodb drivers to do that.
Module called mongoose can be used to ,it is an ODM,  it allows you to define your schema in your application and it will gives you nice syntax around the driver.
There are performance overheads to that.
_i)installing mongoose_

      npm install mongoose --save
_ii)Create new folder **models/meetups.js**, which will serve as model for mongoose_
In this we create a require for mongoose, and export the model “Meetup”


    var mongoose = require('mongoose');

     module.exports = mongoose.model('Meetup',{
       name: String
     });

_iii) In server controller we are going to create “Meetup” model and create an instance “meetup”of the model._
This will save the data to mongodb database.

      var Meetup = require('../models/meetup');//new model
      module.exports.create = function(req,res){
     //instance of the new model
     var meetup = new Meetup(req.body);//passing json to the model
     meetup.save();
     }

_iv) we have to create a connection in server.js_

      mongoose = require(‘mongoose’)
      mongoose.connect('mongodb://localhost:27017/mean-demo');


Make sure mongodb is running if not run using
`monogd`
and in other terminal run :`mongo`
run the node server:
goto to the app and enter: this is from client side and click on add.
on the mongo terminal switch to mean-demo db
`use meanApp`.
To check whether fields are added or not, you can see the output.
`db.meetups.find()`



**Part 5: Displaying data on the app.**
We know that we have data in database, to display it in our app we have to add it to meetups object.

In server controller

     replace meetup.save() with
     meetup.save(function(err,result){
     res.json(result);
     });


In client controller

     replace meetup.save() with
     meetup.$save(function(result){
     $scope.meetups.push(result);
     });

To clear the text field after entering text include:

    meetup.$save(function(result){
    $scope.meetups.push(result);
    $scope.meetupName = '';
    });

**Part 6: To pull data from database through query.**

We remove the hard coded data with a query  in client side

     Meetup.query(function(results){
     $scope.meetups = results;
      })

On server side we  create  a get to call the list method

     app.get('/api/meetups',meetupsController.list);

On the server side controller we have a module which exports the list and mongoose reponds to it using res.json.

     module.exports.list = function(req,res){
     Meetup.find({},function(err,results){
     res.json(results);
     });
    }

Lastly run the `node server` on the terminal, you can see that the data will be fetched from mongodb..!

To see the data in the mongodb database, switch to `mean-demo` and run `db.meetups.find()`.


    
