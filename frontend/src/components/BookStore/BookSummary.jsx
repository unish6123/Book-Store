import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookSummary = () => {
    const { bookNameWithoutSpaces } = useParams();
    const [chapterData, setChapterData] = useState([]);
    const [openChapter, setOpenChapter] = useState(null);
    const [bookName, setBookName] = useState("");
    const [editingChapter, setEditingChapter] = useState(null);
    const [newChapterName, setNewChapterName] = useState('');
    const [oldChapterName, setOldChapterName] = useState('');

    const fetchBookSummary = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/api/getChapter`, {
                bookNameWithoutSpaces,
            });

            const data = response.data;
            if (data) {
                setChapterData(data.chapters);
                setBookName(data.bName);
            }
        } catch (error) {
            console.error('Error fetching book summary:', error);
        }
    };

    useEffect(() => {
        if (bookNameWithoutSpaces) {
            fetchBookSummary();
        }
    }, [bookNameWithoutSpaces]);

    const handleChapterClick = (chapterName) => {
        setOpenChapter(openChapter === chapterName ? null : chapterName);
    };

    const handleEdit = (chapterName) => {
        setOpenChapter(chapterName);
        if (editingChapter === chapterName) {
            setEditingChapter(null);
            setNewChapterName('');
            setOldChapterName('');
        } else {
            setEditingChapter(chapterName);
            setNewChapterName(chapterName);
            setOldChapterName(chapterName); 
        }
    };

    const handleEditSubmit = async () => {
        console.log("Sending:", { bookNameWithoutSpaces, oldChapterName, newChapterName });
        try {
            const response = await axios.put(`http://localhost:4000/api/updateChapter`, {
                bookNameWithoutSpaces,
                oldChapterName,
                newChapterName
            });

            if (response.data) {
                alert(response.data.message);
                fetchBookSummary(); 
                setEditingChapter(null);
                setNewChapterName('');
                setOldChapterName('');
            }
        } catch (error) {
            console.error("Error when updating chapterName", error);
        }
    };

    const handleDeleteChapter = async (bookNameWithoutSpaces, chapterName) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/deleteChapter/${bookNameWithoutSpaces}/${chapterName}`);
            if (response.data) {
                toast(response.data.message);
                fetchBookSummary();
                setEditingChapter(null);
                setNewChapterName('');
                setOldChapterName('');
            }

        } catch (error) {
            console.error("Error when deleting chapter", error);
        }
    };

    return (
        <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-start">
            <h1 className="text-4xl font-bold text-purple-700 mb-12 text-center">{bookName}</h1>
            <div className="w-full max-w-4xl flex flex-col gap-6">
                {chapterData.map((chapter, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-5 px-8 rounded-2xl shadow-lg transition-transform hover:scale-[1.02]"
                    >
                        <div
                            className="flex justify-between items-center text-xl w-full cursor-pointer"
                            onClick={() => handleChapterClick(chapter.chapterName)}
                        >
                            <div className="flex items-center gap-2">
                                <span>{chapter.chapterName}</span>
                                <span
                                    className={`transform transition-transform duration-300 ${
                                        openChapter === chapter.chapterName ? 'rotate-180' : ''
                                    }`}
                                >
                                    &#9660;
                                </span>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(chapter.chapterName);
                                }}
                                className="bg-transparent text-white border-none cursor-pointer text-sm font-bold"
                            >
                                Edit
                            </button>
                        </div>

                        {openChapter === chapter.chapterName && (
                            <div className="mt-4 bg-white text-black p-4 rounded-xl shadow-inner text-base">
                                <p>{chapter.summary || 'summary update coming soon.'}</p>

                                {editingChapter === chapter.chapterName && (
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            value={newChapterName}
                                            onChange={(e) => setNewChapterName(e.target.value)}
                                            className="border border-gray-400 p-2 rounded w-full"
                                            placeholder="Enter new chapter name"
                                        />
                                        <div className="flex gap-4 mt-4">
                                            <button
                                                onClick={handleEditSubmit}
                                                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
                                            >
                                                Submit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteChapter(bookNameWithoutSpaces, editingChapter)
                                                }
                                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookSummary;
