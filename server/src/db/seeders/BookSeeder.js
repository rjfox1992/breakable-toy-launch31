import { Book } from "../../models/index.js";

class BookListSeeder {
  static async seed() {
    const book1 = await Book.query().insertAndFetch({
      id: 1,
      title: "Star Trek All the Books",
      author: "Gene Rodenberry",
      userId: 1,
    });

    const book2 = await Book.query().insertAndFetch({
      id: 2,
      title: "The Cereal Killer",
      author: "Capt. Horatio P. Crunch",
      userId: 2,
    });
    const book3 = await Book.query().insertAndFetch({
      id: 3,
      title: "Laugh the Pain Away",
      author: "Guy who can't stop laughing",
      userId: 3,
    });
  }
}

export default BookListSeeder;
