app.controller('meetupsController', ['$scope', '$resource', function ($scope, $resource) {
var Meetup = $resource ('/api/meetups');//assigning the source of the restful services,this will be the base url for models

//To query data from database
Meetup.query(function(results){
$scope.meetups = results;
})

$scope.createMeetup = function(){
//creating new instance of meetup
    var meetup = new Meetup();
    meetup.name = $scope.meetupName;
    meetup.$save(function(result){
    $scope.meetups.push(result);
    $scope.meetupName = '';
    });
    
    }
}]);