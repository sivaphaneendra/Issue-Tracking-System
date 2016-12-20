'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('OverviewCtrl', function ($scope, $state, GetUsersAndRolesService) {

        $scope.$state = $state;
        $scope.usersList = [];

        function init() {
            var promise = GetUsersAndRolesService.getUsersAndRoles();
            promise.then(function (response) {
                if (response.length === 0)
                    $scope.login.error = "Unable to get Users list";
                else {
                    $scope.usersList = response;
                }
            }, function (error) {
                $scope.login.error = "Error occured";
            });
        }
        init();

        $scope.removeRow = function removeRow(row) {
            var index = $scope.usersList.indexOf(row);
            if (index !== -1) {
                $scope.usersList.splice(index, 1);
            }
        };

    }).factory('GetUsersAndRolesService', function ($http, $log, $q) {
        return {
            getUsersAndRoles: function () {
                var deferred = $q.defer();
                $http.get('http://localhost:3000/getusersroles')
                    .success(function (data) {
                        deferred.resolve(data);
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                    });
                return deferred.promise;
            }
        }
    });