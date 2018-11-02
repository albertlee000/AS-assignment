let chai = require('chai');

let chaiHttp = require('chai-http');
let server = require('../bin/www');
let expect = chai.expect;

chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
describe('Users', function () {
    describe('GET', function () {
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
    });
});