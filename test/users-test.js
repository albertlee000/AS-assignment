let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let expect = chai.expect;

chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
describe('Users', function (){
    describe('POSTs', function (){
        describe('POST /users/addUser', function () {
            it('should return confirmation message that add successfully and update database ', function(done) {
                let user = {
                    account: 'albert',
                    psw: '123456',
                    email: 'aaa@qq.com',
                };
                chai.request(server)
                    .post('/users/addUser')
                    .send(user)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('User created successfully!' );
                        done();
                    });
            });
            after(function (done) {
                chai.request(server)
                    .get('/users/acc=albert')
                    .end(function(err, res) {
                        let result = _.map(res.body, (user) => {
                            return {
                                account: user.account,
                                psw: user.psw,
                                email: user.email,
                            };
                        });
                        expect(result).to.include( { account: 'albert', psw: '123456',email:'aaa@qq.com'  } );
                        done();
                    });
            });
            it('should return a failed message for creating user failed', function(done) {
                let user = {
                    account: 'albert',
                    psw: '123456',
                    email: 'aaa@qq.com',
                };
                chai.request(server)
                    .post('/users/addUser')
                    .send(user)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('User created failed...' );
                        done();
                    });
            });
        });
    });
});
describe('Users', function () {
    describe('DELETEs', function () {
        describe('DELETE /users/acc=:account', () => {
            it('should return a succcessful message and the user would be deleted by account', function(done) {
                chai.request(server)
                    .delete('/users/acc=albert')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('User delete successully!' );
                        done();
                    });
            });
            after(function  (done) {
                chai.request(server)
                    .get('/users/acc=albert')
                    .end(function(err, res) {
                        let result = _.map(res.body, (user) => {
                            return { account:user.account };
                        }  );
                        expect(result).to.not.include( { account:'albert'  } );
                        done();
                    });
            });
            it('should return a failed message for deleting user failed', function(done) {
                chai.request(server)
                    .delete('/users/acc=albert')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('User delete failed!' );
                        done();
                    });
            });
        });
    });
});