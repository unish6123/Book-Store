import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ id, image, title }) => {
    return (
        
        <Link to={`/summary/${title.replace(/\s+/g, '').toLowerCase()}`}>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-xs">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-60 object-cover"
                />
                {console.log('By book image url is ',image)}

                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h2>
                </div>
            </div>
        </Link>
    );
};

export default BookCard;
