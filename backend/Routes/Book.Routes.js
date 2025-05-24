const express = require('express');
const router = express.Router();


const BookController  = require('../controllers/Book.Controller');


router.post('/' , BookController.createBook);


router.get('/', BookController.getAllBooks);

module.exports = router