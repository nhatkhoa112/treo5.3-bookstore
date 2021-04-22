import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const BACKEND_API = process.env.REACT_APP_BACKEND_API;




const FavoriteBookPage = () => {
    const status = () => {
        toast(" The Book is removed from fav books list")
    }
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [ setErrorMsg] = useState('');
    let url = `${BACKEND_API}/favorites?`;
    
    const onDeleteFav = async (book) => {
        await fetch(`${BACKEND_API}/favorites/${book.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }); 
        document.location.reload();
        status();
    }

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


    return (
        <div className="add-page">
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                    </div>

                    {books.length > 0 ? (
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
                                        <div className="icons-btn">
                                            <button onClick={() => onDeleteFav(book)} className="close-btn">X</button>
                                            <ToastContainer />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (<div className="filter-content "><h1>No Books in list, add more...</h1></div>)}

                </div>
            </div>
        </div>
    )
}


export default FavoriteBookPage;
