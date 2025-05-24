const Book = require('../Models/Book.Model');


//create  new book " register"



const createBook = async (req, res) => {
    try{
        const  { title, author, publishedDate, genre } = req.body;

        const newbook = await Book.create({ title, author, publishedDate, genre });



        res.status(201).json({
            status: true,
            message: "Book created successfully",
            data: newbook,
        })







    }catch (error) {
        res.status(500).json({
            message: "Internal server error",
            status: false,
            error: error,
        })
    }
}


// get all books 


const getAllBooks = async (req, res) => {


    try{


        const books = await Book.find();
        res.status(200).json({
            status: true,
            message: "Books fetched successfully",
            data: books,
        })

    }catch (error) {
        res.status(500).json({
            message: "Internal server error",
            status: false,
            error: error,
        })
    }
}






// export the function

module.exports = {
    createBook,
    getAllBooks
}
