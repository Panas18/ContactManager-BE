import db from "../db/db";
import { UserToCreate, UserToGet, User } from "../domain/User";

class UserAccount {
  public static table = "user_account";

  /**
   * return id, email, firstname and lastname of all users
   * @return promise
   */
  public static async getAllUsers(): Promise<UserToGet[]> {
    const users: UserToGet[] = await db(UserAccount.table).select(
      "user_id",
      "email"
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

  /**
   *  Get User by email
   * @param { string } email
   * @returns
   */
  public static async getUserByEmail(email: String) {
    const user = await db(UserAccount.table).where({ email: email }).first();

    return user;
  }

  /**
   * Get user by Id
   * @param {number}
   * @returns {Promise}
   */
  public static async getUserById(user_id: number) {
    const user = await db(UserAccount.table)
      .where({ user_id: user_id })
      .first()
      .returning(["user_id", "first_name", "last_name", "email"]);

    return user;
  }

  /**
   *  Delete user
   * @param {number}
   * @returns{ string }
   */
  public static async deleteUser(user_id: number): Promise<String> {
    await db(UserAccount.table).where({ user_id: user_id }).delete();
    return "User Deleted Successfully";
  }
}

export default UserAccount;
