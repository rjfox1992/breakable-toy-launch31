import { connection } from "../boot.js";
import BookListSeeder from "./seeders/BookListSeeder.js";
import UserSeeder from "./seeders/UserSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("seeding users");
    await UserSeeder.seed();
    console.log("seeding BookLists");
    await BookListSeeder.seed();
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
