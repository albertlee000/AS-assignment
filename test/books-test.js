let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let expect = chai.expect;

chai.use(require('chai-things'));
chai.use(chaiHttp);
let _ = require('lodash' );
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

    });
});