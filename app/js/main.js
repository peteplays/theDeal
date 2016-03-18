//@ngInject
var _ = require('underscore');
module.exports = ['$scope', '$http', function($scope, $http) {
    console.log('this is awesome!!!!!');

    var hi = document.getElementById('helloFromJs');
    hi.innerHTML += '<em>Hello...</em> from <kbd>app/js/</kbd> <code>main.js</code>!!!';

    $scope.hello = 'Hello From Angular';
    $scope.isCollapsed = true;

    $scope.getData = function() {
        $http.get('/dbGet')
            .then(function(response) {
                $scope.outputGetData = response.data;
            })
            .catch(function(err) {
                console.log(err);
            });
    };

    $scope.postData = function(name) {
        if(name) {
            name = name.toLowerCase();
            var data = {
                name: name
            };
            $http.post('/dbPost', data)
                .then(function(response) {
                    $scope.outputPostData = (_.isEmpty(response.data)) ? 'No Search Matched' : response.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    };
}];