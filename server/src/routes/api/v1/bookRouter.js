import express from "express";
import objection from "objection";
const { ValidationError } = objection;
import { Book } from "../../../models/index.js";
import BookSerializer from "../../../serializers/BookSerializer.js";

const bookRouter = new express.Router();

bookRouter.get("/", async (req, res) => {
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

bookRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.query().findById(id);
    const serializedBook = await BookSerializer.getSummary(book);
    return res.status(200).json({ book: serializedBook });
  } catch (err) {
    return res.status(500).json({ err });
  }
});
export default bookRouter;
