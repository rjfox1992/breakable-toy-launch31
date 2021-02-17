import { BookList } from "../../models/index.js";

class BookListSeeder {
  static async seed() {
    const scifi = await BookList.query().insertAndFetch({
      name: "Science-Fiction",
      userId: 1,
      imageUrl: "https://miro.medium.com/max/6200/1*teBtR_0pirBnX4nURoMvLA.jpeg",
    });

    const comedy = await BookList.query().insertAndFetch({
      name: "Comedy",
      userId: 2,
      imageUrl: "https://lionhearttheatre.org/wp-content/uploads/2016/01/download-14.jpg",
    });

    const trueCrime = await BookList.query().insertAndFetch({
      name: "True-Crime",
      userId: 3,
      imageUrl: "https://miro.medium.com/max/940/1*SVUOSDvBriNryyrOXpHttA.png",
    });
  }
}

export default BookListSeeder;
