import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const user1 = await User.query().insertAndFetch({
      email: "test@test.com",
      cryptedPassword: "test",
      username: "BigBoi",
    });
    const user2 = await User.query().insertAndFetch({
      email: "ryan@test.com",
      cryptedPassword: "test",
      username: "The Greatest Ryan",
    });
    const user3 = await User.query().insertAndFetch({
      email: "test2@test.com",
      cryptedPassword: "test",
      username: "Sadboi",
    });
  }
}
export default UserSeeder;
