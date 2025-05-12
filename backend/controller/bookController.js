
import generateAIResponse from "../services/geminiPrompting.js";
import bookModel from "../model/bookModel.js";










const getAvailableBooks = async (req, res) => {


    try {
        const books = await bookModel.find({
            userId: req.body.userId
        })

        res.json({ books })

    } catch (e) {
        console.log(e)
    }
};

const getBookChapters = async (req, res)=>{
    try{
        const book = await bookModel.find({
            bookNameWithoutSpaces: req.body.bookNameWithoutSpaces
        })
        // const chapterNames = bookChapters.chapters
        console.log("this is book name",book[0].bookName)
        return res.json({chapters: book[0].chapters, bName: book[0].bookName})

    } catch(e){
        console.log(e);
    }
}

const getChapterSummary = async (req, res) =>{
    try{
        const {bookNameWithoutSpaces, startPage, endPage}  = req.body;
        if (!bookNameWithoutSpaces|| !startPage|| !endPage){
            return res.json({success: false, message: "Missing book fields."})
        }
        const book = await bookModel.find({
            bookNameWithoutSpaces: req.body.bookNameWithoutSpaces
        })
        const pdfUrl = book[0].pdf;
        console.log("My pdfUrl to read is ",pdfUrl)
        if (!book){
            return res.json({success:false, message: "No book to show"})
        }
        res.json({book:book})
        
        
        
        

    }catch(error){
        res.json({success:false, message:error.message})
    }
}

const updateChapterName = async (req, res) => {
    try {
        const { bookNameWithoutSpaces, oldChapterName, newChapterName } = req.body;

        if (!bookNameWithoutSpaces || !oldChapterName || !newChapterName) {
            return res.json({ success: false, message: "The name of the book, chapterNameToEdit, or newChapterDetails is missing." });
        }

        // const bookNameWithoutSpaces = bookName.replace(/\s+/g, '').toLowerCase();
        const book = await bookModel.findOne({ bookNameWithoutSpaces });

        if (!book) {
            return res.json({ success: false, message: "Book not found." });
        }

        const chapterIndex = book.chapters.findIndex(chapter => chapter.chapterName === oldChapterName);

        if (chapterIndex === -1) {
            return res.json({ success: false, message: "Chapter not found." });
        }

        if (typeof newChapterName === 'string') {
            // updating chapter name.
            book.chapters[chapterIndex].chapterName = newChapterName;
        }

        await book.save();

        return res.json({ success: true, message: "Chapter updated successfully." });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

const deleteChapter = async (req, res) => {
    try {
        console.log("Params received:", req.params); 

        const { bookNameWithoutSpaces, chapterName } = req.params;

        if (!bookNameWithoutSpaces || !chapterName) {
            return res.json({ success: false, message: "Book name or chapter name is missing." });
        }

        const book = await bookModel.findOne({ bookNameWithoutSpaces });

        if (!book) {
            return res.json({ success: false, message: "Book not found." });
        }

        const initialLength = book.chapters.length;

        book.chapters = book.chapters.filter(chap => chap.chapterName !== chapterName);

        if (book.chapters.length === initialLength) {
            return res.json({ success: false, message: "Chapter not found." });
        }

        await book.save();

        return res.json({ success: true, message: "Chapter deleted successfully." });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};


export {  getAvailableBooks, getBookChapters, getChapterSummary, updateChapterName, deleteChapter};
