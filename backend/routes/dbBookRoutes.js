import express from "express";
import { listAllImagesInFolder, uploadBookImagePresignedUrl, uploadPdfPresignedUrl, saveMetaData } from "../controller/uploadBooksController.js";
import userAuth from "../middleware/userAuth.js";
import { getBookChapters, getChapterSummary, getAvailableBooks, updateChapterName, deleteChapter } from "../controller/bookController.js";

const dbBookRouter = express.Router();

dbBookRouter.get('/images',listAllImagesInFolder);
dbBookRouter.post('/uploadImage',uploadBookImagePresignedUrl);
dbBookRouter.post('/uploadPdf',uploadPdfPresignedUrl);
dbBookRouter.post('/saveMetaData',userAuth, saveMetaData);
dbBookRouter.post('/getChapter',getBookChapters );
dbBookRouter.post('/getChapterSummary', getChapterSummary);
dbBookRouter.get('/books',userAuth,getAvailableBooks );
dbBookRouter.put('/updateChapter', updateChapterName)
dbBookRouter.delete('/deleteChapter/:bookNameWithoutSpaces/:chapterName', deleteChapter)


export default dbBookRouter;