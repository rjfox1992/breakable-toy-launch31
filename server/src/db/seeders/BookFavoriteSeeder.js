import { BookFavorites } from "../../models/index.js";

class BookFavoritesSeeder {
  static async seed() {
    const comedy = await BookFavorites.query().insert({
      bookListId: 2,
      bookId: 3,
    });

    const scienceFiction = await BookFavorites.query().insert({
      bookListId: 1,
      bookId: 1,
    });
    const trueCrime = await BookFavorites.query().insert({
      bookListId: 3,
      bookId: 2,
    });
  }
}
export default BookFavoritesSeeder;
