import db from "../db/db";
import { UserToCreate, UserToGet, User } from "../domain/User";

class UserAccount {
  public static table = "user_account";

  /**
   * return id and email of all users
   * @return promise
   */
  public static async getAllUsers(): Promise<UserToGet[]> {
    const users: UserToGet[] = await db(UserAccount.table).select(
      "user_id",
      "email",
      "first_name",
      "last_name"
    );

    return users;
  }

  /**
   *
   * @param {UserToCreate} user
   * @returns {Promise}
   */
  public static async createUser(user: UserToCreate): Promise<UserToGet> {
    const newUser: UserToGet = await db(UserAccount.table).insert(user, [
      "user_id",
      "email",
    ]);

    return newUser;
  }

  /**
   *
   * @param { user }
   * @returns {Promise}
   */
  public static async updateUser(user: User): Promise<UserToGet> {
    const updatedUser: UserToGet = await db(UserAccount.table)
      .where({ user_id: user.user_id })
      .update(user)
      .returning(["user_id", "email"]);

    return updatedUser;
  }

  public static async deleteUser(user_id: number): Promise<String> {
    await db(UserAccount.table).where({ user_id: user_id }).delete();
    return "User Deleted Successfully";
  }
}

export default UserAccount;
