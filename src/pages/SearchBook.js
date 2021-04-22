import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';



const BACKEND_API = process.env.REACT_APP_BACKEND_API;
const pageNum = 10;
const limit = 10;



const SearchBook = () => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [query, setQuery] =  useState('')
    let url = `${BACKEND_API}/books?_page=${pageNum}&_limit=${limit}`;
    if (query) {
            url += `&q=${query}`;
        }

    const handleSearchFormSubmit = (e) => {
        e.preventDefault();
        //pick one of the two
        setQuery(e.target[0].value); 
        fetchData();
    };

    const fetchData = async () => {
        setLoading(true);
        try {
        console.log(url);

        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            setBooks(data);
        } else {
            setErrorMsg(`FETCH BOOKS ERROR: ${data.message}`);
        }
        } catch (error) {
        setErrorMsg(`FETCH BOOKS ERROR: ${error.message}`);
        }
        setLoading(false);
    }
    
    useEffect(() => {

    fetchData();
}, []);



    if(loading) {
        return <h1 className="text-center mt-5">Loading</h1> 
    }

    console.log(query)

    return (
        <div className="add-page">
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                        <form onSubmit={handleSearchFormSubmit}>
                            <input type="text" 
                                placeholder="Search for a book" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            
                        </form>

                        
                    </div>

                    {books.length > 0 && (
                        <ul className="results">
                            {books.map(book => (
                                <li key={book.id}>
                                    <div className="result-card">
                                        <div className="poster-wrapper">
                                            {book.imageLink ? (
                                                <img src={book.imageLink} alt={`${book.title} Poster`} />
                                            ) : (
                                                <div className="filler-poster"></div>
                                            )}
                                        </div>
                                        <div className="info">
                                            <div className="header">
                                                <h3 className="title">{book.title}</h3>
                                                <h4 className="release-data">
                                                    Author : {book.author}
                                                </h4>
                                                <h4 className="release-data">
                                                    Language : {book.language}
                                                </h4>
                                                <h4 className="release-data">
                                                    Pages : {book.pages}
                                                </h4>
                                            </div>
                                            <div className="controls">
                                                <button>
                                                    <Nav.Link as={Link} to={"/books/" + book.id}>
                                                        More Details
                                                    </Nav.Link>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>
            </div>
        </div>
    )
}


export default SearchBook
