'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('TicketDetailsCtrl', function($scope, $state, ticketAddUpdateService) {
        $scope.ticket = {};
        $scope.ticket.timestamp = null;
        $scope.$state = $state;

        $scope.submitTicketForm = function() {
            var promise = ticketAddUpdateService.addUpdateTicket($scope.ticket);
            promise.then(function(response) {
                if (response.affectedRows === 0) {
                    $scope.login.error = "Unable to add/update ticket details";
                }
                else {
                    $scope.success = true;
                    $scope.ticket = {};
                }
            }, function(error) {
                $scope.login.error = "Error occured";
            });
        };
    }).factory('ticketAddUpdateService', function($http, $log, $q) {
        return {
            addUpdateTicket: function(details) {
                var myobject = { title: details.title, description: details.description, timestamp: details.timestamp, comments: details.comments };
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/addupdateticket',
                    data: myobject
                }).success(function(data) {
                    deferred.resolve(data);
                }).error(function(msg, code) {
                    deferred.reject(msg);
                });
                return deferred.promise;
            }
        }
    });
