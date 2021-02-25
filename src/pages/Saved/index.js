import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";
import Alert from "../../components/Alert";
import DeleteBtn from "../../components/DeleteBtn";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import "./style.css";

function Saved() {
    const [search, setSearch] = useState("");
    // delete "Wikipedia" above if you can
    const [books, setBooks] = useState([])
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [image, setImage] = useState("");
    // const [link, setLink] = useState("");
    const [formObject, setFormObject] = useState({})
    const [error, setError] = useState("");

    useEffect(() => {
        loadBooks()
    }, [])

    // Loads all books and sets them to books
    function loadBooks() {
        API.getBooks()
            .then(res =>
                setBooks(res.data)
            )
            .catch(err => console.log(err));
    };

    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteBook(id) {
        API.deleteBook(id)
            .then(res => loadBooks())
            .catch(err => console.log(err));
    }


    const handleSaveBook = event => {
        event.preventDefault();
        if (formObject.title && formObject.author) {
            API.saveBook({
                title: formObject.title,
                author: formObject.author,
                synopsis: formObject.synopsis
            })
                .then(res => loadBooks())
                .catch(err => console.log(err));
        }
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
                <h1 className="text-center">Books You've Saved</h1>
                <Alert type="danger" style={{ opacity: error ? 1 : 0, marginBottom: 10 }}>
                    {error}
                </Alert>

                {books.length ? (
                    <List>
                        {books.map(book => (
                            <ListItem key={book._id}>
                                <Link to={"/books/" + book._id}>
                                    <strong>
                                        {book.title} by {book.authors}
                                    </strong>
                                </Link>
                                <DeleteBtn onClick={() => deleteBook(book._id)} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                        <h3>No Results to Display</h3>
                    )}

            </Container>
        </div>
    );
}


export default Saved;
