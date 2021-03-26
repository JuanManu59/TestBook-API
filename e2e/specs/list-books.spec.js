const axios = require('axios');
const { expect } = require('chai');

const path = 'https://books-front-icesi.herokuapp.com/';

let response;
describe("When the user wants to list books",() => {
    before(async() =>{
        response = await axios.get(path);
    });

    it("Then it should return an OK status code",() => {
        console.log(response);
        expect(response.status).eql(200);
    });

    if("Then if should return books with name and author",() => {
        expect(response.data.length).to.be.greaterThan(0);
        const book = response.data[0];
        expect(book).to.have.property("name")
        expect(book).to.have.property("author")
    });
});