import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//route to save a new book
router.post('/', async(request,response)=>{
    try {
        if(
            !request.body.title || !request.body.author || !request.body.publishYear
        ){
            return response.status(400).send({message: 'Send all required fields'});
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook)
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

//route to get all books
router.get('/', async(request, response)=>{
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

//route to get one book from its id
router.get('/:id', async(request, response)=>{
    try {

        const { id } = request.params; //request.params is used to access route parameters from the URL.

        const book = await Book.findById(id);
        if(!book){
            response.status(404).send({message: 'Book not found'})
        }
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

//route to update a book
router.put('/:id', async(request, response)=>{
    try {
        if(
            !request.body.title || !request.body.author || !request.body.publishYear //fields that describe new data
        ){
            return response.status(400).send({message: 'Send all required fields'});  
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            response.status(404).send({message: 'Book not found'});
        }
        response.status(200).send({message: 'Book updated successfully'})

    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
})

//route to delete a book
router.delete('/:id', async(request, response)=>{
    try {
        const { id } = request.params; //request.params is used to access route parameters from the URL.
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            response.status(404).send({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book deleted successfully'});
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
})

export default router;