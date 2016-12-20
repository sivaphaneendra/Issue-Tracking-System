var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var mysqlConfig = require('./../mysqlConfig.js');

describe('MYSQLConfiguration', function () {
    it('should check the connection properties', function () {
        expect(mysqlConfig.host).to.equal('localhost');
    });
});