import express from "express";
import objection from "objection";
const { ValidationError } = objection;
import { Book } from "../../../models/index.js";
import BookSerializer from "../../../serializers/BookSerializer.js";

const BooksRouter = new express.Router();

BooksRouter.get("/", async (req, res) => {
  try {
    const books = await Book.query();
    const serializedBooks = [];

    for (const Book of books) {
      const serializedBook = await BookSerializer.getSummary(Book);
      serializedBooks.push(serializedBook);
    }

    return res.status(200).json({ books: serializedBooks });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
export default BooksRouter;
