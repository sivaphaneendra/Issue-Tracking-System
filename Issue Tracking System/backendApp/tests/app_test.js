var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var supertest = require('supertest');
var api = supertest('http://localhost:3000');
var mysqlConfig = require('./../app.js');

describe('Checking REST api calls', function () {
    it('should check the base root', function () {
        api.get('/').expect('Issue Tracking System Api\'s!');
    });

    it('should check the checkuser api', function () {
        api.get('/checkuser')
            .set('Accept', 'application/json')
            .send({
                username: 'siva',
                password: 'siva'
            })
            .expect(200)
            .end(function (err, res) {
                expect(res.body.username).to.equal('siva');
                expect(res.body.role).to.equal('admin');
            });
    });

    it('should get the list of tickets', function () {
        api.get('/getTicketsList')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body.length).to.equal(2);
            });
    });

    it('should get the list of users and roles', function () {
        api.get('/getusersroles')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body.length).to.equal(2);
            });
    });
});