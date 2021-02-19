import express from "express";
import googleBooksClient from "../../apiClient/GoogleBooksClient.js";

const googleBooksRouter = new express.Router();

googleBooksRouter.get("/", async (req, res) => {
  const query = req.query.q;

  try {
    const googleBooksResults = await googleBooksClient.searchBooks(query);
    return res.status(201).json({ googleBooksResults: googleBooksResults });
  } catch (error) {
    return res.status(422).json({ errors: error });
  }
});

export default googleBooksRouter;
