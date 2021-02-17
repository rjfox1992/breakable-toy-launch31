import { BookFavorites } from "../../models/index.js";

class BookFavoritesSeeder {
  static async seed() {
    const fav1 = await BookFavorites.query().insert({
      bookListId: 2,
      bookId: 3,
    });

    const fav2 = await BookFavorites.query().insert({
      bookListId: 1,
      bookId: 1,
    });
    const fav3 = await BookFavorites.query().insert({
      bookListId: 3,
      bookId: 2,
    });
  }
}
export default BookFavoritesSeeder;
