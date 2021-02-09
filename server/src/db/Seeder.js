import { connection } from "/Users/rjfox1992/challenges/readingListApp/breakable-toy-launch31/server/src/boot.js";
import UserSeeder from "./seeders/UserSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("seeding users");
    await UserSeeder.seed();
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
