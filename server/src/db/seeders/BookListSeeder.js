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
    const romance = await BookList.query().insertAndFetch({
      name: "Romance",
      userId: 3,
      imageUrl:
        "https://image.freepik.com/free-vector/silhouette-scene-with-love-couple-holding-hands-sunset_1639-16214.jpg",
    });

    const sports = await BookList.query().insertAndFetch({
      name: "Sports",
      userId: 3,
      imageUrl:
        "https://media.npr.org/assets/img/2020/06/10/gettyimages-200199027-001-b5fb3d8d8469ab744d9e97706fa67bc5c0e4fa40-s1100-c15.jpg",
    });
  }
}

export default BookListSeeder;
