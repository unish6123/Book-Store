import React, { useEffect, useState } from 'react';
import BookCard from '../UI/BookCard';
import SearchBar from '../UI/Search';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookStore = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/books`, { withCredentials: true });
                const data = await response.data;
                setBooks(data.books);

            } catch (error) {

                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
        console.log('Searching for:', query);

    };

    const handleBookClick = (id) => {
        console.log(`Book clicked: ${id}`);

    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-slate-800">📚 Book Store</h1>
                    <p className="text-gray-500 mt-2">Browse our collection of powerful reads</p>
                </div>
                <SearchBar onSearch={handleSearch} />

                {loading ? (
                    <p>Loading books...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                        {books.map((book) => (
                            
                            
                        book.bookName.toLowerCase().startsWith(searchQuery) &&
                            
                            <BookCard
                                key={book._id}
                                id={book._id}
                                image={book.image}
                                title={book.bookName}
                                onClick={() => handleBookClick(book.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Link
                to="/upload"
                aria-label="Upload a new book"
                className="
          fixed bottom-6 right-6
          flex items-center justify-center
          w-20 h-20 md:w-24 md:h-24            /* a bit wider for text */
          rounded-full bg-blue-900 text-white
          shadow-lg hover:bg-blue-800
          text-lg font-semibold
        "
            >
                Upload
            </Link>
        </>
    );
};

export default BookStore;
