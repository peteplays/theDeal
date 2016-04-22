var _ = require('underscore');
module.exports = function($scope, $http) {

  //   $scope.getDBCheck = function() {
  //       $http.get('/dbCheck')
  //           .then(function(response) {
  //               if(response.data.db == 'ok') {
  //                   $scope.dbActive = true;
  //                   $scope.getDBCount();
  //               } else {
  //                   console.log(response.data);
  //               }
  //           })
  //           .catch(function(err) {
  //               console.log(err);
  //           });
  //   };
  //   $scope.getDBCheck();

    $scope.getAllNames = function() {
        $http.get('/dbGetAllNames')
            .then(function(response) {
                console.log(response.data);
                $scope.outputGetData = response.data;
            })
            .catch(function(err) {
                console.log(err);
            });
    };

  //   $scope.getDBCount = function() {
  //       name = name.toLowerCase();
  //       $http.get('/dbCount')
  //           .then(function(response) {
  //               $scope.outputDBCountRes = response.data;
  //           })
  //           .catch(function(err) {
  //               console.log(err);
  //           });
  //   };

  //   $scope.postFindName = function(name) {
  //       if(name) {
  //           name = name.toLowerCase();
  //           var data = {
  //               name: name
  //           };
  //           $http.post('/dbFindName', data)
  //               .then(function(response) {
  //                   $scope.outputFindName = (_.isEmpty(response.data)) ? 'No Search Matched' : response.data;
  //               })
  //               .catch(function(err) {
  //                   console.log(err);
  //               });
  //       }
  //   };

  // $scope.postInsertName = function(name) {
  //       if(name) {
  //           name = name.toLowerCase();
  //           var data = {
  //               name: name
  //           };
  //           $http.post('/dbInsert', data)
  //               .then(function(response) {
  //                   $scope.outputInsertNameRes = response.data;
  //                   $scope.getDBCount();
  //                   $scope.getAllNames();
  //               })
  //               .catch(function(err) {
  //                   console.log(err);
  //               });
  //       }
  //    };

  //   $scope.postUpdateVal = function(name, color) {
  //       if(name) {
  //           name = name.toLowerCase();
  //           var data = {
  //               name: name,
  //               color: color
  //           };
  //           $http.post('/dbUpdate', data)
  //               .then(function(response) {
  //                   $scope.outputUpdateNameRes = response.data;
  //                   $scope.getAllNames();
  //               })
  //               .catch(function(err) {
  //                   console.log(err);
  //               });
  //       }
  //   };

  //   $scope.postDeleteName = function(name) {
  //       if(name) {
  //           name = name.toLowerCase();
  //           var data = {
  //               name: name
  //           };
  //           $http.post('/dbDelete', data)
  //               .then(function(response) {
  //                   $scope.outputDeleteNameRes = response.data;
  //                   $scope.getDBCount();
  //                   $scope.getAllNames();
  //               })
  //               .catch(function(err) {
  //                   console.log(err);
  //               });
  //       }
  //   };

};