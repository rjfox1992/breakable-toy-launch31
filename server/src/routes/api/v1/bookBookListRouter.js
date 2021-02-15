import express from "express";
import objection from "objection";
import { Book } from "../../../models/index.js";
import BookSerializer from "../../../serializers/BookSerializer.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
const { ValidationError } = objection;
const bookBookListRouter = new express.Router();

bookBookListRouter.get("/", async (req, res) => {
  debugger;
  try {
    const books = await Book.query();
    const serialzedBooks = [];
    debugger;
    for (const book of books) {
      const serializedBook = await BookSerializer.getSummary(book);
      serialzedBooks.push(serializedBook);
    }
    res.status(200).json({ book: serializedBook });
  } catch (error) {
    res.status(500).json({ error });
  }
});

bookBookListRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.query().findById(id);
    const serialzedBook = await BookSerializer.getSummary(book);
    res.status(200).json({ book: serialzedBook });
  } catch (error) {
    res.status(500).json(error);
  }
});

bookBookListRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { title, author } = formInput;
  const { bookListId } = req.params;
  try {
    const newBook = await Book.query().insertAndFetch({ title, author, bookListId });
    return res.status(201).json({ book: newBook });
  } catch (err) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default bookBookListRouter;
