'use strict';

describe('Controller: LoginCtrl', function () {
    // load the controller's module
    beforeEach(module('yapp'));

    var scope, mockDataSvc, loginController, $httpBackend, $location;

    // Initialize the controller and a mock scope

    beforeEach(inject(function ($rootScope, $controller, checkuserService, _$httpBackend_, _$location_) {
        scope = $rootScope.$new();
        mockDataSvc = checkuserService;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        loginController = $controller('LoginCtrl', {
            $scope: scope,
            checkuserService: mockDataSvc
        });
    }));

    it('should have checked the username and password', function ($rootScope, $location) {
        scope.login = {
            username: "siva",
            password: "siva"
        };
        scope.submit();
        $location.path('/dashboard');
        expect($location.path()).toBe('/dashboard');
    });

    it('should have checked the username and password', function ($rootScope, $location) {
        scope.login = {
            username: "siva",
            password: "siva12345"
        };
        scope.submit();
        expect(scope.login.error).toBe('Invalid login details');
    });

});
