
// import express from 'express';
// import getAiResponse from '../aiIntegration/getAiResponse.js';
// import path from 'path';
// import userAuth from '../middleware/userAuth.js';
// import { getBookSummary, getAvailableBooks } from '../controller/bookController.js';
// import { fileURLToPath } from 'url';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const bookRouter = express.Router();

// // Route to get the list of available books
// bookRouter.get('/books', userAuth, getAvailableBooks);

// // Route to get the summary and sections of a specific book
// bookRouter.get('/books/:contentId', userAuth, getBookSummary);

// // Serve static PDFs from the 'public/pdfs' directory
// // bookRouter.use('/pdfs', express.static(path.join(__dirname, 'public', 'pdfs')));



// export default bookRouter;
