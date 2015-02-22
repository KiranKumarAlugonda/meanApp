var Meetup = require('../models/meetups');//new model

module.exports.create = function(req,res){
//instance of the new model
var meetup = new Meetup(req.body);//passing json to the model
meetup.save(function(err,result){
   res.json(result);
});

}
//module to display the list from database
module.exports.list = function(req,res){
Meetup.find({},function(err,results){
    res.json(results);
});
}