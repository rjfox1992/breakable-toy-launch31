import express from "express";
import objection from "objection";
import { BookList } from "../../../models/index.js";
import bookBookListRouter from "./bookBookListRouter.js";
const { ValidationError } = objection;
import BookListSerializer from "../../../serializers/BookListSerializer.js";
const BookListRouter = new express.Router();

bookBookListRouter.use("/:bookListId/books", bookBookListRouter);

BookListRouter.get("/", async (req, res) => {
  try {
    const bookLists = await BookList.query();
    const serializedBookLists = [];

    for (const BookList of bookLists) {
      const serializedBookList = await BookListSerializer.getSummary(BookList);
      serializedBookLists.push(serializedBookList);
    }

    return res.status(200).json({ bookLists: serializedBookLists });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

BookListRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookList = await BookList.query().findById(id);

    bookList.books = await bookList.$relatedQuery("books");
    return res.status(200).json({ bookList });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

bookBookListRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { name, imageUrl } = formInput;
  const userId = req.user.id;

  try {
    const newBookList = await Book.query().insertAndFetch({ name, imageUrl, id, userId });
    const serializedBookList = await BookListSerializer.getSummary(newBookList);
    return res.status(201).json({ bookList: serializedBookList });
  } catch (err) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default BookListRouter;
