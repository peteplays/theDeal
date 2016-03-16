require('angular/angular.min');
require('angular-animate/angular-animate.min');
require('angular-ui-bootstrap/dist/ui-bootstrap-tpls');

console.log('this is awesome!!!!!');

var hi = document.getElementById('helloFromJs');
hi.innerHTML += '<em>Hello...</em> from <kbd>app/js/</kbd> <code>main.js</code>!!!';

var theApp = angular.module('theApp', ['ui.bootstrap', 'ngAnimate'])
    .controller('template', function($scope){
        $scope.hello = 'Hello From Angular';
        $scope.isCollapsed = true;
    });

