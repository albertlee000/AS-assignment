let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let expect = chai.expect;

chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
describe('Books', function () {
    describe('GETs', function () {
        //get all books
        describe('GET /books', () => {
            it('should return all books\' infomation', function (done) {
                chai.request(server)
                    .get('/books')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(4);
                        done();
                    });
            });
        });
    });
});