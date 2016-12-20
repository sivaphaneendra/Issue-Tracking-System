'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('ReportsCtrl', function ($scope, $state, TicketsListService) {

        $scope.$state = $state;
        $scope.ticketsList = [];

        function init() {
            var promise = TicketsListService.getTicketsList();
            promise.then(function (response) {
                if (response.length === 0)
                    $scope.login.error = "Unable to get tickets details";
                else {
                    $scope.ticketsList = response;
                }
            }, function (error) {
                $scope.login.error = "Error occured";
            });
        }
        init();

        $scope.removeRow = function removeRow(row) {
            var index = $scope.ticketsList.indexOf(row);
            if (index !== -1) {
                $scope.ticketsList.splice(index, 1);
            }
        };

    }).factory('TicketsListService', function ($http, $log, $q) {
        return {
            getTicketsList: function () {
                var deferred = $q.defer();
                $http.get('http://localhost:3000/getTicketsList')
                    .success(function (data) {
                        deferred.resolve(data);
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                    });
                return deferred.promise;
            }
        }
    });