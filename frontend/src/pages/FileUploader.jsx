import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FileUploader = () => {
    const { user, isAuthenticated } = useAuth();
    const [imageFile, setImageFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [chapters, setChapters] = useState([
        { chapterName: '', startPage: '', endPage: '' }
    ]);
    const [bookName, setBookName] = useState('');

    const navigate = useNavigate();

  
    const imageInputRef = useRef();
    const pdfInputRef = useRef();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated]);

    // Function to handle file selection
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
      
    };

    const handlePdfChange = (e) => {
        setPdfFile(e.target.files[0]);
      
    };

    // Function to add new chapter input
    const addChapter = () => {
        setChapters([...chapters, { chapterName: '', startPage: '', endPage: '' }]);
    };

    // Function to update chapter fields
    const handleChapterChange = (index, field, value) => {
        const updatedChapters = [...chapters];
        updatedChapters[index][field] = value;
        setChapters(updatedChapters);
    };

    const handleSubmit = async () => {
        try {

            console.log("The image Name is ",imageFile.name)

            // 1. Get pre-signed URL for image
            const imagePresignRes = await axios.post('http://localhost:4000/api/uploadImage',
                { imageFileName: imageFile.name },
                {
                    withCredentials: true,
                }
            );
            console.log(imagePresignRes.data.url)

            // 2. Upload image to S3
            await axios.put(imagePresignRes.data.url, imageFile, {
                headers: { 'Content-Type': imageFile.type },
                // withCredentials: true,
            });

            // 3. Get pre-signed URL for PDF
            const pdfPresignRes = await axios.post('http://localhost:4000/api/uploadPdf',
                { pdfFileName: pdfFile.name },
                {
                    withCredentials: true,
                }
            );

                        // 4. Upload PDF to S3
            await axios.put(pdfPresignRes.data.url, pdfFile, {
                headers: { 'Content-Type': pdfFile.type },
                // withCredentials: true
            });

           

            const finalData = {
                bookName,
                image: `https://my-book-summary-bucket.s3.us-east-1.amazonaws.com/images/${imageFile.name}`,
                pdf: `https://my-book-summary-bucket.s3.us-east-1.amazonaws.com/pdfs/${pdfFile.name}`,
                chapters
            };

            // 6. Save metadata to your backend
            const res = await axios.post(
                'http://localhost:4000/api/saveMetaData',
                finalData,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success('Upload and save successful!');
            navigate('/dashboard')
                
            } else {
                toast.error(res.data.message)
                throw new Error(res.data.message || 'Failed to save metadata');
                
            }
        } catch (error) {
            console.error(' Submission error:', error);
            alert('Something went wrong. Please try again.');
        }
    };


    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">File Uploads</h1>

            
            <div className="w-full max-w-lg mb-6 shadow-lg rounded-lg p-6 bg-white border space-y-6">
               
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        📷 Upload Image:
                    </label>
                    <div className="flex items-center space-x-4">
                        <button
                            type="button"
                            onClick={() => imageInputRef.current.click()}
                            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                        >
                            Select Image
                        </button>
                        <span className="text-gray-600 text-sm">
                            {imageFile ? imageFile.name : "No file selected"}
                        </span>
                    </div>
                    <input
                        type="file"
                        accept="image/jpeg ,image/png"
                        onChange={handleImageChange}
                        ref={imageInputRef}
                        className="hidden"
                    />
                </div>

                
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        📄 Upload PDF:
                    </label>
                    <div className="flex items-center space-x-4">
                        <button
                            type="button"
                            onClick={() => pdfInputRef.current.click()}
                            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                        >
                            Select PDF
                        </button>
                        <span className="text-gray-600 text-sm">
                            {pdfFile ? pdfFile.name : "No file selected"}
                        </span>
                    </div>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfChange}
                        ref={pdfInputRef}
                        className="hidden"
                    />
                </div>
            </div>

            <div className="w-full max-w-lg mb-6 shadow-lg rounded-lg p-6 bg-white border">
                <label className="block text-gray-700 font-semibold mb-2">📚 Book Name:</label>
                <input
                    type="text"
                    placeholder="Enter Book Title"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    className="w-full border rounded-md p-2 bg-gray-50"
                />
            </div>


            {/* Chapters */}
            <div className="w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Chapters:</h2>
                {chapters.map((chapter, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Chapter Name"
                            value={chapter.chapterName}
                            onChange={(e) => handleChapterChange(index, 'chapterName', e.target.value)}
                            className="flex-1 border rounded-md p-2 bg-gray-50"
                        />
                        <input
                            type="number"
                            placeholder="Start Page"
                            value={chapter.startPage}
                            onChange={(e) => handleChapterChange(index, 'startPage', e.target.value)}
                            className="w-24 border rounded-md p-2 bg-gray-50"
                        />
                        <input
                            type="number"
                            placeholder="End Page"
                            value={chapter.endPage}
                            onChange={(e) => handleChapterChange(index, 'endPage', e.target.value)}
                            className="w-24 border rounded-md p-2 bg-gray-50"
                        />
                    </div>
                ))}

                {/* Add New Chapter */}
                <button
                    type="button"
                    onClick={addChapter}
                    className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                >
                    + Add Chapter
                </button>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                >
                    Submit All
                </button>
            </div>
        </div>
    );
};

export default FileUploader;
