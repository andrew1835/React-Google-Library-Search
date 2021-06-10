import axios from "axios";

// Export an object containing methods we'll use for accessing the GitHub Jobs API

export default {
    searchTerms: function (query) {
        return axios.get(
            "https://www.googleapis.com/books/v1/volumes?q=" +
            query
            // change the max results to 10 once you figure out how to put all 10 results onto the page
            + "&maxResults=10"
        );
    },
    // TODO: Commented out all the below requests
    // getBooks: function () {
    //     return axios.get("/api/books");
    // },
    // // Gets the book with the given id
    // getBook: function (id) {
    //     return axios.get("/api/books/" + id);
    // },
    // // Deletes the book with the given id
    // deleteBook: function (id) {
    //     return axios.delete("/api/books/" + id);
    // },
    // // Saves a book to the database
    // saveBook: function (bookData) {
    //     return axios.post("/api/books", bookData);
    // }
};
