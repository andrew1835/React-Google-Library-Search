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
    }
};
