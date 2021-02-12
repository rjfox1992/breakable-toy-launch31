import { connection } from "../boot.js";
import BookListSeeder from "./seeders/BookListSeeder.js";
import UserSeeder from "./seeders/UserSeeder.js";
import BookSeeder from "./seeders/BookSeeder.js";
import BookFavoriteSeeder from "./seeders/BookFavoriteSeeder.js";
class Seeder {
  static async seed() {
    console.log("seeding users");
    await UserSeeder.seed();
    console.log("seeding BookLists");
    await BookListSeeder.seed();
    console.log("seeding Books");
    await BookSeeder.seed();
    console.log("seeding Book Favorites");
    await BookFavoriteSeeder.seed();
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
