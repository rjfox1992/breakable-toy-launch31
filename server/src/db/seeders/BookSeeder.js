import { Book } from "../../models/index.js";

class BookListSeeder {
  static async seed() {
    const book1 = await Book.query().insertAndFetch({
      title: "Star Trek All the Books",
      author: "Gene Rodenberry",
      userId: 1,
      bookListId: 1,
    });

    const book2 = await Book.query().insertAndFetch({
      title: "The Cereal Killer",
      author: "Capt. Horatio P. Crunch",
      userId: 2,
      bookListId: 3,
    });
    const book3 = await Book.query().insertAndFetch({
      title: "Laugh the Pain Away",
      author: "Guy who can't stop laughing",
      userId: 3,
      bookListId: 2,
    });
  }
}

export default BookListSeeder;
