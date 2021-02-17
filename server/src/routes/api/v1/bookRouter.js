import express from "express";
import objection from "objection";
const { ValidationError } = objection;
import { Book, BookFavorites } from "../../../models/index.js";
import BookSerializer from "../../../serializers/BookSerializer.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
const bookRouter = new express.Router({ mergeParams: true });

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
  } catch (error) {
    return res.status(500).json({ error });
  }
});

bookRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { title, author } = formInput;
  const bookListId = req.body.bookListsId;
  const userId = req.user.id;
  debugger;
  try {
    const newBook = await Book.query().insertAndFetch({ title, author, userId });
    const bookId = newBook.id;
    console.log(newBook);
    const serializedBook = await BookSerializer.getSummary(newBook);
    console.log(serializedBook);
    const newBookFavorite = await BookFavorites.query().insertAndFetch({ bookId, bookListId });
    console.log(newBookFavorite);
    debugger;
    return res.status(201).json({ book: serializedBook, newBookFavorite });
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    // debugger;
    return res.status(500).json({ errors: error });
  }
});
export default bookRouter;
