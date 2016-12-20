'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function ($scope, $location, $http, checkuserService, $rootScope) {
    $scope.login = {};
    $scope.submit = function () {
      var promise = checkuserService.verifyUser($scope.login);
      promise.then(function (response) {
        if (response.length === 0)
          $scope.login.error = "Invalid login details";
        else {
          $rootScope.loginUserDetails = response[0];
          $location.path('/dashboard');
        }
      }, function (error) {
        $scope.login.error = "Error occured";
      });
    };

  }).factory('checkuserService', function ($http, $log, $q) {
    return {
      verifyUser: function (details) {
        var config = {
          params: { "username": details.username, "password": details.password }
        };
        var deferred = $q.defer();
        $http.get('http://localhost:3000/checkuser', config)
          .success(function (data) {
            deferred.resolve(data);
          }).error(function (msg, code) {
            deferred.reject(msg);
          });
        return deferred.promise;
      }
    }
  });