
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
                        expect(res.body.length).to.equal(5);
                        done();
                    });
            });
        });
        //get a book by ID
        describe('GET /books/id=:id', () => {
            it('should return a book by id', function (done) {
                chai.request(server)
                    .get('/books/id=5bd0d75aa0fa610ec0cc092b')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author: book.author
                            }
                        });
                        expect(result).to.include({name: 'me', author: 'gf'});
                        done();
                    });
            });
            it('should return a message that can not find the book by id', function (done) {
                chai.request(server)
                    .get('/books/id=dsad')
                    .end(function (err, res) {
                        expect(res.body).to.have.property('Message').equal('Sorry! Can\' find this book by ID!');
                        done();
                    });
            });
        });
        //find a book by name and fuzzy search and exception
        describe('GET /books/name=:name', () => {
            it('should return a book by name', function (done) {
                chai.request(server)
                    .get('/books/name=them')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body.length).to.equal(1);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author: book.author
                            }
                        });
                        expect(result).to.include({name: 'them', author: 'bgg'});
                        done();
                    });
            });
            it('should return all books whose names contain letter \'e\'', function (done) {
                chai.request(server)
                    .get('/books/name=e')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body.length).to.equal(3);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author: book.author
                            }
                        });
                        expect(result).to.include({name: 'them', author: 'bgg'});
                        expect(result).to.include({name: 'her', author: 'mm'});
                        expect(result).to.include({name: 'me', author: 'gf'});
                        done();
                    });
            });
            it('should return a message that can not find the book by name', function (done) {
                chai.request(server)
                    .get('/books/name=123')
                    .end(function (err, res) {
                        expect(res.body).to.have.property('Message').equal('Sorry! Can\' find this book by name!');
                        done();
                    });
            });
        });
    });
});
describe('Books', function (){
    describe('PUTs', function (){
        //write a summary for the book which is searched by id
        describe('PUT /books/writeSummary=:id', function () {
            it('should return a successful message and update the book by new summary', function(done) {
                let summary = {summary:'a legendary story'};
                chai.request(server)
                    .put('/books/writeSummary=5bdb9eb0fb6fc074abb4df49')
                    .send(summary)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Summary wrote successfully!!');
                        done();
                    });
            });
            after(function  (done) {
                chai.request(server)
                    .get('/books/id=5bdb9eb0fb6fc074abb4df49')
                    .end(function(err, res) {
                        let result = _.map(res.body, (book) => {
                            return { summary:book.summary };
                        }  );
                        expect(result).to.include( { summary:'a legendary story' } );
                        done();
                    });
            });
            it('should return a failed message', function(done) {
                let summary = {summary:'a legendary story'};
                chai.request(server)
                    .put('/books/writeSummary=vds41234fv221scdf')
                    .send(summary)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Summary wrote failed...');

                        done();
                    });
            });
        });

        //find all books whose likes are greater than or equal to the input number
        describe('GET /books/like=:like', () => {
            it('should return all books whose likes are greater than or equal to 12', function (done) {
                chai.request(server)
                    .get('/books/like=12')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body.length).to.equal(3);
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                like: book.like
                            }
                        });
                        expect(result).to.include({name: 'you', like: 5780});
                        expect(result).to.include({name: 'her', like: 80});
                        expect(result).to.include({name: 'them', like: 12});
                        done();
                    });
            });
            it('should return a message that there is no book has such a number of likes', function (done) {
                chai.request(server)
                    .get('/books/like=10000')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Sorry, cannot find any book has higher likes');
                        done();
                    });
            });
            it('should return an error message for input number is not integer', function (done) {
                chai.request(server)
                    .get('/books/like=2.5')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Input number only allows integers and must not be less than 0');
                        done();
                    });
            });
            it('should return an error message for input number is less than 0', function (done) {
                chai.request(server)
                    .get('/books/like=-9')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Input number only allows integers and must not be less than 0');
                        done();
                    });
            });
        });
        //completely clear all reviews of a book
        describe('PUT /books/clearReview=:id', function () {
            it('should return a successful message that clear all reviews of the book', function(done) {
                chai.request(server)
                    .put('/books/clearReview=5bdb9eb0fb6fc074abb4df49')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Reviews clear successfully!!');
                        done();
                    });
            });
            after(function  (done) {
                chai.request(server)
                    .get('/books/id=5bdb9eb0fb6fc074abb4df49')
                    .end(function(err, res) {
                        let result = _.map(res.body, (book) => {
                            return { review:book.review };
                        }  );
                        expect(result).to.include({review:[null]});
                        done();
                    });
            });
            it('should return a failed message that clear failed', function(done) {
                chai.request(server)
                    .put('/books/clearReview=vds41234fv221scdf')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Reviews clear failed...');
                        done();
                    });
            });
        });
    });
});
describe('Books', function () {
    describe('POSTs', function () {
        describe('POST /books/addBook', function () {
            it('should return a message that add book successfully and update database', function (done) {
                let book = {
                    bookname: 'math',
                    author: 'ki'
                };
                chai.request(server)
                    .post('/books/addBook')
                    .send(book)
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Book Successfully Added!');
                        done();
                    });
            })
            after(function (done) {
                chai.request(server)
                    .get('/books/name=math')
                    .end(function (err, res) {
                        let result = _.map(res.body, (book) => {
                            return {
                                name: book.name,
                                author: book.author
                            };
                        });
                        expect(res).to.have.status(200);
                        expect(result).to.include({name: 'math', author: 'ki'});
                        done();
                    });
            });
            it('should return a failed message that create book failed for the book exists', function (done) {
                let book = {
                    name: 'math',
                    author: 'ki'
                };
                chai.request(server)
                    .post('/books/addBook')
                    .send(book)
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Book NOT Added!');
                        done();
                    });
            });
        });
    });
});