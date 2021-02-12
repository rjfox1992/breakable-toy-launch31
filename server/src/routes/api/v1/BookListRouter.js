import express from "express";
import objection from "objection";
import { BookList } from "../../../models/index.js";
const { ValidationError } = objection;
import BookListSerializer from "../../../serializers/BookListSerializer.js";
const BookListRouter = new express.Router();

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
    const serializedBookList = await BookListSerializer.getSummary(bookList);

    return res.status(200).json({ bookList: serializedBookList });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

export default BookListRouter;
