import Success from "../domain/Success";
import { User, UserToGet, UserToCreate } from "../domain/User";
import logger from "../misc/logger";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import { SALT_LENGTH } from "../constants/common";

/**
 * Get all users
 * @returns promise
 */
export const getAllUsers = async (): Promise<Success<UserToGet>> => {
  logger.info("Getting all users");
  try {
    const users = await UserModel.getAllUsers();

    return {
      data: users,
      message: "User fetched successfully",
    };
  } catch (err) {
    logger.info(err);
    return {
      message: "Error while fetching user",
    };
  }
};

/**
 * Create new user
 * @param {UserToCreate}
 * @returns {Promise}
 */
export const createUser = async (
  user: UserToCreate
): Promise<Success<UserToGet>> => {
  // create password hash
  const { password } = user;
  const salt = await bcrypt.genSalt(SALT_LENGTH);
  const passwordHash = await bcrypt.hash(password, salt);
  logger.info("Creating a new user");

  try {
    const newUser: UserToGet = await UserModel.createUser({
      ...user,
      password: passwordHash,
    });

    return {
      data: newUser,
      message: "New user created successfully",
    };
  } catch (err) {
    logger.info(err);
    return {
      message: "Error creating new user",
    };
  }
};

/**
 * Update user
 * @param { User }
 * @returns { Promise }
 */
export const updateUser = async (user: User): Promise<Success<UserToGet>> => {
  const { password } = user;

  const salt = await bcrypt.genSalt(SALT_LENGTH);
  const passwordHash = await bcrypt.hash(password, salt);
  logger.info("Updating user");
  try {
    const updatedUser: UserToGet = await UserModel.updateUser({
      ...user,
      password: passwordHash,
    });

    return {
      data: updatedUser,
      message: "User updated successfully",
    };
  } catch (err) {
    logger.info(err);
    return {
      message: "Error updating user",
    };
  }
};

/**
 * Deletes user
 * @param { number }
 * @returns { Promise }
 */
export const deleteUser = async (user_id: number): Promise<String> => {
  try {
    const message = await UserModel.deleteUser(user_id);

    return message;
  } catch (err) {
    logger.info(err);

    return "Error deleting user";
  }
};
