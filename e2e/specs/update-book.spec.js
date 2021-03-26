const axios = require('axios');
const { expect } = require('chai');

const path = 'https://books-front-icesi.herokuapp.com/';

const Book = {
    "name": "nameBook-Old",
    "author": "authorBook-Old"
};

const newBook = {
    "name": "nameBook-New",
    "author": "authorBook-New"
};

let response;
describe("Given a created book", () => {
    before(async() => {
        oldBook = await axios.post(path, Book);
    });

    after(async ()=>{
        deleteBook = await axios.delete(`${path}/${oldBook.data.id}`);
        if(deleteBook.status === 200){
            console.log("Deleted book");
        }else{
            console.log("An error occurred deleting the book");
        }
    });

    describe('Then the user wants to update the book',() => {
        before(async() => {
            response = await axios.put(`${path}/${oldBook.data.id}`, newBook);
        });

        it("Then the response status code should be 200", () => {
            expect(response.status).eql(200);
        })

        it("Then should return a modified book", () => {
            modifiedBook = response.data;
            delete modifiedBook['id'];
            expect(modifiedBook).eql(newBook);
        });

    });
});