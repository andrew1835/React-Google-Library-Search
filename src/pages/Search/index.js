import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";
import Alert from "../../components/Alert";

function Search() {
    const [search, setSearch] = useState("");
    // delete "Wikipedia" above if you can
    const [books, setBooks] = useState([])
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [image, setImage] = useState("");
    // const [link, setLink] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Google Library Search"
    });

    const handleInputChange = event => {
        setSearch(event.target.value);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        if (!search) {
            return;
        }

        API.searchTerms(search)
            .then(res => {
                if (res.data.length === 0) {
                    throw new Error("No results found.");
                }
                if (res.data.status === "error") {
                    throw new Error(res.data.message);
                }
                // may have to change the below to just res.data
                setBooks(res.data.items)
                // setTitle(res.data.items);
                // setDescription(res.data.items);
                // setImage(res.data.items);
                // setLink(res.data.items);
                // setTitle(res.data.items[0].volumeInfo.title);
                // setDescription(res.data.items[0].volumeInfo.description);
                // setImage(res.data.items[0].volumeInfo.imageLinks.smallThumbnail);
                // setLink(res.data.items[0].volumeInfo.infoLink);

            })
            .catch(err => setError(err));
    }


        // const handleFormSubmit = event => {
        //     event.preventDefault();

        //     API.searchTerms(search)
        //         .then(res => {
        //             if (res.data.length === 0) {
        //                 throw new Error("No results found.");
        //             }
        //             if (res.data.status === "error") {
        //                 throw new Error(res.data.message);
        //             }
        //             setTitle(res.data.items[0].volumeInfo.title);
        //             setDescription(res.data.items[0].volumeInfo.description);
        //             setImage(res.data.items[0].volumeInfo.imageLinks.smallThumbnail);
        //             setLink(res.data.items[0].volumeInfo.infoLink);

        //         })
        //         .catch(err => setError(err));
        // };
        ;

    // When the component mounts, update the title to be Wikipedia Searcher
    // useEffect(() => {
    //     document.title = "Google Library Searcher";

    //     API.searchTerms
    //         .then((res) => {
    //             if (res.data.length === 0) {
    //                 throw new Error("No results found.");
    //             }
    //             if (res.data.status === "error") {
    //                 throw new Error(res.data.message);
    //             }
    //             setGoogleState(res)
    //         })
    //         .catch(err => console.log(err));

    // })


    // const handleInputChange = event => {
    //     setGoogleState({ ...googleState, search: event.target.value });
    // };

    // function handleFormSubmit(event) {
    //     event.preventDefault();
    //     if (!googleState.search) {
    //         return;
    //     }
    //     API.searchTerms(googleState.search)
    //         .then(res => {
    //             if (res.data.length === 0) {
    //                 throw new Error("No results found.");
    //             }
    //             if (res.data.status === "error") {
    //                 throw new Error(res.data.message);
    //             }
    //             setGoogleState({
    //                 ...googleState,
    //                 // will fix these to make them more specific once you figure out what res.data shows you
    //                 title: res.data,
    //                 description: res.data,
    //                 image: res.data,
    //                 link: res.data,
    //                 error: ""
    //             });
    //         })
    //         .catch(err => setGoogleState({ error: err.message }));
    // };

    return (
        <div>
            <Container style={{ minHeight: "100vh" }}>
                <h1 className="text-center">Search For a Book from Google's Book Library</h1>
                <Alert type="danger" style={{ opacity: error ? 1 : 0, marginBottom: 10 }}>
                    {error}
                </Alert>
                <SearchForm
                    handleInputChange={handleInputChange}
                    handleFormSubmit={handleFormSubmit}
                    results={search}
                />
                {books.map(book => {
                    return (
                        <SearchResults
                            title={book.volumeInfo.title}
                            description={book.volumeInfo.description}
                            image={
                                book.volumeInfo.imageLinks === undefined
                                    ? ""
                                    : `${book.volumeInfo.imageLinks.thumbnail}`
                            }
                            link={book.volumeInfo.infoLink}
                        />
                    )
                })}
                <SearchResults
                // title={title}
                // description={description}
                // image={image}
                // link={link}
                />
            </Container>
        </div>
    );
}


export default Search;
