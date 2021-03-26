const axios = require('axios');
const { expect } = require('chai');

const path = 'https://books-front-icesi.herokuapp.com/';

const book = {
    "name": "nameBook",
    "author": "authorBook"
};

let response;
describe("When the user want to create a book",() => {
    before(async() => {
        oldListBooks = await axios.get(path);
        response = await axios.post(path, book);
        newListBooks = await axios.get(path);
    });

    after(async ()=>{
        deleteBook = await axios.delete(`${path}/${response.data.id}`);
        if(deleteBook.status === 200){
            console.log("Deleted book");
        }else{
            console.log("An error occurred deleting the book");
        }
    });

    it("Then should return a created status code", () => {
        expect(response.status).eql(201);
    });

    it("Then should return a created book", () => {
        createdBook = response.data;
        delete createdBook['id'];
        expect(createdBook).eql(book);
    });

    it("Then should return a json as content type", () => {
        expect(response.headers['content-type']).to.contain('application/json');
    });

    it("When a book is added the list increases by one", ()=>{
        expect(newListBooks.data.length).eql(oldListBooks.data.length + 1);
    })
});