const axios = require('axios');
const { expect } = require('chai');

const path = 'https://books-front-icesi.herokuapp.com/';

const book = {
    "name": "nameBook",
    "author": "authorBook"
};

let response;
describe("Given a created book", () => {
    before(async() => {
        bookCreated = await axios.post(path,book);
    });

    describe("When user delete a book", () =>{
        before(async () =>{
            oldListBooks = await axios.get(path);
            response = await axios.delete(`${path}/${bookCreated.data.id}`);
            newListBooks = await axios.get(path);
        });

        it("Should return OK satus code", () =>{
            expect(response.status).eql(200);
        });

        it("When a book is deleted the list decreases by one", () =>{
            expect(newListBooks.data.length).eql(oldListBooks.data.length-1);
        });

    })
})