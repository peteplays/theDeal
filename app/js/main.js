//@ngInject
module.exports = ['$scope', '$http', function($scope, $http) {

    console.log('this is awesome!!!!!');

    var hi = document.getElementById('helloFromJs');
    hi.innerHTML += '<em>Hello...</em> from <kbd>app/js/</kbd> <code>main.js</code>!!! <small>this is the <code>bundle.js</code> file served from <kbd>www/js/</kbd></small>';

    $scope.hello = 'Hello From Angular';
    $scope.isCollapsed = true;

    $scope.dbActive = false;

    $scope.clearInput = function(clearInputsArr) {
        clearInputsArr.forEach(function(inputModel) {
            $scope[inputModel] = '';
        });
    };

    //var db = require('../../resources/db/mongodb/mongoDBUI.js');
    var db = require('../../resources/db/couchdb/couchDBUI.js');
    db($scope, $http);

}];