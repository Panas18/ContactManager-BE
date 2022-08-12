import Success from "../domain/Success";
import { User, UserToGet, UserToCreate } from "../domain/User";
import Token from "../domain/token";
import logger from "../misc/logger";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import { SALT_LENGTH } from "../constants/common";
import jwt from "jsonwebtoken";
import dotent from "dotenv";

dotent.config({
  path: __dirname + "/../../.env",
});
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

/**
 * Get user by email
 * @param { string } email
 * @returns
 */
export const getUserByEmail = async (email: string): Promise<Success<User>> => {
  logger.info("Getting user by email");
  try {
    const user = await UserModel.getUserByEmail(email);

    return {
      data: user,
      message: "User fetched successfully",
    };
  } catch (err) {
    logger.info(err);

    return {
      message: "Error fetching user",
    };
  }
};

/**
 * Get user by Id
 * @param {number}
 * @returns {Promise}
 */
export const getUserById = async (
  user_id: number
): Promise<Success<UserToGet>> => {
  logger.info("Getting user by id");
  try {
    const user = await UserModel.getUserById(user_id);

    return {
      data: user,
      message: "User fetched successfully",
    };
  } catch (err) {
    logger.info(err);

    return {
      message: "Error fetching user",
    };
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<Success<Token>> => {
  logger.info("Logging in");
  const user = await UserModel.getUserByEmail(email);

  if (!user) {
    return {
      message: "User not Found",
    };
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return {
      message: "Password doesn't match",
    };
  }

  //user is authenticated
  const accessToken = jwt.sign(
    { user_id: user.user_id },
    process.env.JWT_SECRET as string
  );

  return {
    data: { accessToken },
    message: "User logged Successfully",
  };
};
