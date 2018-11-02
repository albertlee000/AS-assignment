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
        //get a book by ID
        describe('GET /books/id=:id', () => {
            it('should return a book by id', function(done) {
                chai.request(server)
                    .get('/books/id=5bd0d75aa0fa610ec0cc092b')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (book) => {
                            return { name: book.name,
                                author: book.author }
                        });
                        expect(result).to.include( { name: 'me', author: 'gf' } );
                        done();
                    });
            });
            it('should return a message that can not find the book by id', function(done) {
                chai.request(server)
                    .get('/books/id=dsad')
                    .end(function(err, res) {
                        expect(res.body).to.have.property('Message').equal('Sorry! Can\' find this book by ID!' );
                        done();
                    });
            });
        });
    });
});