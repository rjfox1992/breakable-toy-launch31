import { Book } from "../../models/index.js";

class BookListSeeder {
  static async seed() {
    const book1 = await Book.query().insertAndFetch({
      title: "Star Trek All the Books",
      author: "Gene Rodenberry",
      userId: 1,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/0018/7324/8355/products/STD-Universe2-Sherpa2_620x.jpg?v=1565210297",
    });

    const book2 = await Book.query().insertAndFetch({
      title: "The Cereal Killer",
      author: "Capt. Horatio P. Crunch",
      userId: 2,
      imageUrl:
        "https://static.wikia.nocookie.net/p__/images/d/d0/Cap%27n_Crunch.jpg/revision/latest/scale-to-width-down/340?cb=20120716233144&path-prefix=protagonist",
    });
    const book3 = await Book.query().insertAndFetch({
      title: "Laugh the Pain Away",
      author: "Guy who can't stop laughing",
      userId: 3,
      imageUrl:
        "https://s3.amazonaws.com/media.mediapost.com/dam/cropped/2017/11/24/laughingemoji-560.JPEG",
    });
    const book4 = await Book.query().insertAndFetch({
      title: "The Notebook",
      author: "Nicholas Sparks",
      userId: 3,
      imageUrl:
        "https://play-lh.googleusercontent.com/YWVTiGWDDjJfG6Xlu94v3M8aeQNiu6I-JSdJOut28ZLkpCAeqQni3tpB2VPWs3zGHN9i9lOioQKFHNE=s200-rw",
    });
    const book5 = await Book.query().insertAndFetch({
      title: "The Glory of Their Times",
      author: "Lawrence S. Ritter",
      userId: 3,
      imageUrl:
        "https://books.google.com/books/content/images/frontcover/DXJgvIwXW6MC?fife=w200-h300",
    });
  }
}

export default BookListSeeder;
