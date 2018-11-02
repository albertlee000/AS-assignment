let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let expect = chai.expect;

chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
describe('Users', function (){
    describe('PUTs', function (){
        describe('PUT /users/like=:id', function () {
            it('should return a message that user liked the book and the book\'s like number increased ', function(done) {
                let bookname = {bookname:'you'};
                chai.request(server)
                    .put('/users/like=5bd0d4f056a059283002a29c')
                    .send(bookname)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('You liked this book' );
                        done();
                    });
            });
            after(function  (done) {
                chai.request(server)
                    .get('/books/id=5bd0d747a0fa610ec0cc092a')
                    .end(function(err, res) {
                        let result = _.map(res.body, (book) => {
                            return { like:book.like };
                        }  );
                        expect(result).to.include( { like:5781 } );
                        done();
                    });
            });
            it('should return a message that liked failed for this user has liked ', function(done) {
                let bookname = {bookname:'you'};
                chai.request(server)
                    .put('/users/like=5bd0d4f056a059283002a29c')
                    .send(bookname)
                    .end(function(err, res) {
                        expect(res.body).to.have.property('message').equal('You have liked this book, cannot like again...' );
                        done();
                    });
            });
        });
        describe('PUT /users/unlike=:id', function () {
            it('should return a message that user unlikes the book and the book\'s like decreased ', function(done) {
                let bookname = {bookname:'you'};
                chai.request(server)
                    .put('/users/unlike=5bd0d4f056a059283002a29c')
                    .send(bookname)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('You unliked this book');
                        done();
                    });
            });
            after(function  (done) {
                chai.request(server)
                    .get('/books/id=5bd0d747a0fa610ec0cc092a')
                    .end(function(err, res) {
                        let result = _.map(res.body, (book) => {
                            return { like:book.like };
                        }  );
                        expect(result).to.include( { like:5780 } );
                        done();
                    });
            });
            it('should return a message that unliked failed for this user has not liked the book', function(done) {
                let bookname = {bookname:'you'};
                chai.request(server)
                    .put('/users/unlike=5bd0d4f056a059283002a29c')
                    .send(bookname)
                    .end(function(err, res) {
                        expect(res.body).to.have.property('message').equal('You have not liked this book!' );
                        done();
                    });
            });
        });
        describe('PUT /users/recommende=:id', function () {
            it('should return a message and update database that user recommended a book and added a review to the book', function(done) {
                let recommendation = {
                    bookname: 'me' ,
                    id: '5bd0d75aa0fa610ec0cc092b',
                    review: 'what a book!!!'
                };
                chai.request(server)
                    .put('/users/recommende=5bd0d4fa56a059283002a29d')
                    .send(recommendation)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('You recommended [me]');
                        done();
                    });
            });
            it('should return a message that recommende failed', function(done) {
                let recommendation = {
                    bookname: 'me' ,
                    id: '5bce51756436e42a00965e4e',
                    review: 'an amazing book'
                };
                chai.request(server)
                    .put('/users/recommende=11255')
                    .send(recommendation)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Sorry! Please try it again!');
                        done();
                    });
            });
        });
    });
});