import express from "express";
import objection from "objection";
import { BookList, BookFavorites } from "../../../models/index.js";
const { ValidationError } = objection;
import BookListSerializer from "../../../serializers/BookListSerializer.js";
const bookListRouter = new express.Router();
import cleanUserInput from "../../../services/cleanUserInput.js";

bookListRouter.get("/", async (req, res) => {
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

bookListRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookList = await BookList.query().findById(id);
    debugger;
    bookList.books = await bookList.$relatedQuery("books");
    debugger;
    return res.status(200).json({ bookList });
  } catch (err) {
    debugger;
    return res.status(500).json({ err });
  }
});

bookListRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { name, imageUrl } = formInput;
  const userId = req.user.id;

  try {
    const newBookList = await BookList.query().insertAndFetch({ name, imageUrl, userId });
    const serializedBookList = await BookListSerializer.getSummary(newBookList);
    return res.status(201).json({ bookList: serializedBookList });
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default bookListRouter;
