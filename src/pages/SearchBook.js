import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginationBar from '../components/PaginationBar';


const BACKEND_API = process.env.REACT_APP_BACKEND_API;
const limit = 10;



const SearchBook = () => {
    const status = () => {
        toast(" The Book is added to favorite book list")
    }
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [total] = useState(100)
    const [pageNumber, setPageNumber] = useState(1);

    let url = `${BACKEND_API}/books?_page=${pageNumber}&_limit=${limit}`;
    const [query, setQuery] =  useState('')
    if (query) {
            url +=`&q=${query}`;
        }

    const onSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
        fetchData();
    };

    const postBookData = async (book) => {
        await fetch(`${BACKEND_API}/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
            });
        status();
    }
    


    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setBooks(data);
        setLoading(false);
    }
    useEffect(() => {

    fetchData();
}, []);

    if(loading) return '';



    return (
        <div className="add-page">
            <h1 className="text-center mt-5"> Book Store</h1> 
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                        <input type="text" 
                                placeholder="Search for a book" 
                                value={query}
                                onChange={onSearch}
                            />
                    </div>
                    {books.length > 0 && (
                        <ul className="results">
                            {books.map(book => (
                                <li key={book.id} className="favorites">
                                    <div className="result-card">
                                        <div className="book-card">
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
                                        <div className="add-btn">
                                            <button onClick={() => postBookData(book)} className="add-fav-btn">Add Fav</button>
                                        </div>
                                    </div>
                                    <ToastContainer />

                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="pagination">
                <PaginationBar pageNumber={pageNumber} setPageNumber={setPageNumber} total={total} fetchData={fetchData}/>
            </div>
        </div>
    )
}


export default SearchBook
