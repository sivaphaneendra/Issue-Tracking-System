'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function ($scope, $state, $rootScope, $location) {

    $scope.$state = $state;
    if ($rootScope.loginUserDetails)
      $scope.loginUser = $rootScope.loginUserDetails;
    else {
      //$location.path('/login');
      //$rootScope.loginUserDetails = null;
    }

  });
