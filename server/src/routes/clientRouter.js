import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
  "/",
  "/user-sessions/new",
  "/users/new",
  "/bookLists",
  "/googleSearch",
  "/bookLists/new",
  "/bookLists/:id",
  "/books",
  "/books/new",
  "/books/:id",
  "/books/:id/delete",
];
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
