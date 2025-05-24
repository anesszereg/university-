//  model for book
const mongoose = require('mongoose');
const { Schema } = mongoose;




const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    }, 

    author: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },

    isAvailable: {
        type: Boolean,
        default: true,
    },
    isReserved: {
        type: Boolean,
        default: false,
    },
    reservedBy: {
        type: String,
        default: null,
    },
    reservedAt: {
        type: Date,
        default: null,
    },
    isIssued: {
        type: Boolean,
        default: false,
    },
    issuedBy: {
        type: String,
        default: null,
    },

});

const Book = mongoose.model('Book', bookSchema);    

module.exports = Book;
