# Assignment 1 - API testing and Source Control.

Name:Zonghao Li

## Overview.
Users.js can add and delete users, get user information, recommend books, like favorite books and unlike it, filter and arrange books according to likes. 

Books.js can add and delete books, get information about books, give a summary to writing, clear all reviews on a book, and so on.

## API endpoints.
+ GET /books - get all books.
+ GET /books/id=:id - Get a BOOK by ID.
+ GET /books/name=:name - Get a BOOK by NAME.
+ GET /users/id=:id - Get an USER by ID.
+ GET /users/acc=:account - Get an USER by ACCOUNT.
+ GET /books/like=:like - Get all books whose likes are greater or equal to the input number.
+ GET /users/findreview=:id - Get all reviews of the book that the input user has recommended.
+ GET /users/rank - Get all books in descending order.

+ PUT /users/like=:id - Set an user like a book
+ PUT /users/unlike=:id - Set an user unlike a book
+ PUT /books/writeSummary=:id - Write a summary to a book
+ PUT /books/clearReview=:id - Clear a book's all reviews
+ PUT /users/recommende=:id - Make an user like a book and write a review to it.

+ POST /books/addBook - add a book
+ POST /users/addUser - add an user

+ DELETE /books/id=:id - delete a book by object id
+ DELETE /books/name=:bookname - delete a book by name
+ DELETE /users/id=:id - delete an user by object id
+ DELETE /users/acc=:account - delete a book by object id


## Data storage.
User Schema:
        
        {
           account:{type:String,required:true,unique:true},
           psw:{type:String,required:true},
           email:String,
          recommendation:[{
              type:mongoose.Schema.Types.ObjectId,
                    ref:'Book'
                }],
                like:[{
                   type:String,
                   default:null,
                   _id:false
                }],
         }
         
Book Schema:

        {
                name: {type:String,required:true},
                author:{type:String,required:true},
                summary:{type:String,default:null},
                like: {type: Number, default: 0},
                review:[{
                 content:{type:String,default: null},
                reviewer:{type:String,default:null},
                 _id:false
                }]
          }

## Sample Test execution.
// books-test.js testing
D:\lzh\AS-assignment>mocha test/books-test.js


(node:11000) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoC
lient.connect.
  Books
    GETs
      GET /books
Successfully Connected to [ book ]
Successfully Connected to [ book ]
(node:11000) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
GET /books 200 649.438 ms - 1764
        √ should return all books' infomation (684ms)
      GET /books/id=:id
GET /books/id=5bd0d75aa0fa610ec0cc092b 200 42.485 ms - 689
        √ should return a book by id (48ms)
GET /books/id=dsad 200 1.993 ms - 47
        √ should return a message that can not find the book by id
      GET /books/name=:name
GET /books/name=them 200 55.341 ms - 227
        √ should return a book by name (58ms)
GET /books/name=e 200 49.924 ms - 1277
        √ should return all books whose names contain letter 'e' (53ms)
GET /books/name=123 200 35.800 ms - 49
        √ should return a message that can not find the book by name (38ms)

  Books
    PUTs
      PUT /books/writeSummary=:id
(node:11000) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
PUT /books/writeSummary=5bdb9eb0fb6fc074abb4df49 200 234.081 ms - 42
        √ should return a successful message and update the book by new summary (267ms)
PUT /books/writeSummary=vds41234fv221scdf 200 3.057 ms - 37
        √ should return a failed message
GET /books/id=5bdb9eb0fb6fc074abb4df49 200 112.422 ms - 249
      GET /books/like=:like
GET /books/like=12 200 59.933 ms - 830
        √ should return all books whose likes are greater than or equal to 12 (66ms)
GET /books/like=10000 200 62.449 ms - 58
        √ should return a message that there is no book has such a number of likes (69ms)
GET /books/like=2.5 200 0.621 ms - 75
        √ should return an error message for input number is not integer
GET /books/like=-9 200 0.675 ms - 75
        √ should return an error message for input number is less than 0
      PUT /books/clearReview=:id
PUT /books/clearReview=5bdb9eb0fb6fc074abb4df49 200 64.801 ms - 42
        √ should return a successful message that clear all reviews of the book (70ms)
PUT /books/clearReview=vds41234fv221scdf 200 0.658 ms - 37
        √ should return a failed message that clear failed
GET /books/id=5bdb9eb0fb6fc074abb4df49 200 50.710 ms - 249

  Books
    POSTs
      POST /books/addBook
POST /books/addBook 200 60.177 ms - 38
        √ should return a message that add book successfully and update database (64ms)
POST /books/addBook 200 6.050 ms - 29
        √ should return a failed message that create book failed for the book exists
GET /books/name=math 200 51.196 ms - 205

  Books
    DELETEs
      DELETE /books/name=:name
DELETE /books/name=math 200 57.977 ms - 45
        √ should return a message that book deleted successfully (60ms)
DELETE /books/name=math 200 54.528 ms - 40
        √ should return a failed message that delete book failed for the book does not exist (56ms)
GET /books/name=math 200 58.951 ms - 49


  18 passing (2s)

 //users-test.js testing
 D:\lzh\AS-assignment>mocha test/users-test.js


(node:10160) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoC
lient.connect.
  Users
    GETs
      GET /users/id=:id
Successfully Connected to [ book ]
Successfully Connected to [ book ]
(node:10160) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
GET /users/id=5bd0d4e956a059283002a29b 200 649.087 ms - 373
        √ should return an user by id (684ms)
GET /users/id=fasdqe 200 2.147 ms - 37
        √ should return failed message
      GET /users/acc=:account
GET /users/acc=gg 200 63.185 ms - 305
        √ should return an user by account (69ms)
GET /users/acc=minihi 200 56.875 ms - 37
        √ should return a failed message for user not found (59ms)
      GET /users/rank
GET /users/rank 200 76.053 ms - 1764
        √ should return all books in descending order by likes (80ms)

  Users
    PUTs
      PUT /users/like=:id
PUT /users/like=5bd0d4f056a059283002a29c 200 416.710 ms - 33
(node:10160) DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.
        √ should return a message that user liked the book and the book's like number increased  (454ms)
PUT /users/like=5bd0d4f056a059283002a29c 200 292.355 ms - 60
        √ should return a message that liked failed for this user has liked  (297ms)
      PUT /users/unlike=:id
PUT /users/unlike=5bd0d4f056a059283002a29c 200 58.840 ms - 35
        √ should return a message that user unlikes the book and the book's like decreased  (66ms)
PUT /users/unlike=5bd0d4f056a059283002a29c 200 283.059 ms - 43
        √ should return a message that unliked failed for this user has not liked the book (289ms)
GET /books/id=5bd0d747a0fa610ec0cc092a 200 56.140 ms - 242
      PUT /users/recommende=:id
(node:10160) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
PUT /users/recommende=5bd0d4fa56a059283002a29d 200 177.696 ms - 34
        √ should return a message and update database that user recommended a book and added a review to the book (182ms)
PUT /users/recommende=11255 200 0.585 ms - 41
        √ should return a message that recommende failed

  Users
    POSTs
      POST /users/addUser
POST /users/addUser 200 60.268 ms - 40
        √ should return confirmation message that add successfully and update database  (63ms)
POST /users/addUser 200 88.961 ms - 36
        √ should return a failed message for creating user failed (97ms)
GET /users/acc=albert 200 105.585 ms - 226

  Users
    DELETEs
      DELETE /users/acc=:account
DELETE /users/acc=albert 200 72.165 ms - 38
        √ should return a succcessful message and the user would be deleted by account (76ms)
DELETE /users/acc=albert 200 54.535 ms - 33
        √ should return a failed message for deleting user failed (56ms)
GET /users/acc=albert 200 85.895 ms - 37


  15 passing (3s)
[ Markdown Tip: By indenting the above listing, GitHub will display it in a 'box' and preserve any formatting.]

## Extra features.
. . . . Briefly state any extra features of your testing that you feel should be high-lighted . . . . .
