import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const BACKEND_API = process.env.REACT_APP_BACKEND_API;




const BookDetailPage = () => {
    const status = () => {
        toast(" The Book is added to favorite book list")
    }
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [bookDetail, setBookDetail] = useState([]);
    const [ setErrorMsg] = useState('');

    const postBookData = async () => {
        await fetch(`${BACKEND_API}/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookDetail),
            });
        status();
    }

    useEffect(() => {
        if(!id) return
        async function fetchData() {
            setLoading(true);
            try {
            let url = `${BACKEND_API}/books/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok) {
                setBookDetail(data);
            

            } else {
                setErrorMsg(`FETCH BOOKS ERROR: ${data.message}`);
            }
            } catch (error) {
            setErrorMsg(`FETCH BOOKS ERROR: ${error.message}`);
            }
            setLoading(false);
    }
            fetchData();
    }, [id]);


    console.log(bookDetail.imageLink);
    if(loading) return <h1 className="text-center">Loading</h1>

    return (
        <div className="book-detail-page">
            <h1 className="text-center  p-5"> Book Detail </h1>
            <div className="book-detail-card container ">
                <div className="book-img">
                    {bookDetail.imageLink ? (
                        <img src={bookDetail.imageLink} alt={`${bookDetail.title} Poster`} />
                    ) : (
                        <div className="filler-poster"></div>
                    )}
                </div>
                <div className="book-content">
                    <h1>{bookDetail.title}</h1>
                    <h4>Author: {bookDetail.author}</h4>
                    <h5>Language: {bookDetail.language}</h5>
                    <h5>Country: {bookDetail.country}</h5>
                    <h5>Pages: {bookDetail.pages}</h5>
                    <h5>Year: {bookDetail.year}</h5>
                    <h5>Link book: {bookDetail.link}</h5>
                    <button onClick={postBookData} className="add-watched">Add to Favorite List</button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default BookDetailPage
