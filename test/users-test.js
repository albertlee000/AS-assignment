let chai = require('chai');

let chaiHttp = require('chai-http');
let server = require('../bin/www');
let expect = chai.expect;

chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
describe('Users', function () {
    describe('GETs', function () {
        describe('GET /users/id=:id', () => {
            it('should return an user by id', function (done) {
                chai.request(server)
                    .get('/users/id=5bd0d4e956a059283002a29b')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (user) => {
                            return {
                                acc: user.account,
                                psw: user.psw
                            }
                        });
                        expect(result).to.include({acc: 'qqq', psw: '123456'});
                        done();
                    });
            });
            it('should return failed message', function (done) {
                chai.request(server)
                    .get('/users/id=fasdqe')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('Message').equal('Sorry! User Not Found !');
                        done();
                    });
            });
        });

        describe('GET /users/acc=:account', () => {
            it('should return an user by account', function(done) {
                chai.request(server)
                    .get('/users/acc=gg')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (user) => {
                            return { acc: user.account,
                                psw: user.psw }
                        });
                        expect(result).to.include( { acc: 'gg', psw: '123456' } );
                        done();
                    });
            });
            it('should return a failed message for user not found', function(done) {
                chai.request(server)
                    .get('/users/acc=minihi')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('Message').equal('Sorry! User Not Found !');
                        done();
                    });
            });
        });
        describe('GET /users/rank', () => {
            it('should return all books in descending order by likes', function(done) {
                chai.request(server)
                    .get('/users/rank')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body[0].name).to.include( 'you');
                        expect(res.body[1].name).to.include('her');
                        done();
                    });
            });
        });
    });
});