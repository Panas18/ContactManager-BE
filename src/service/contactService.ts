import Success from "../domain/Success";
import { Contact, ContactToCreate } from "../domain/Contact";
import contactModel from "../models/contactModel";
import logger from "../misc/logger";

/**
 * Get all contact of authorized user
 * @param { number } user_account_id
 * @returns { Promise<Success<Contact[]>>}
 */
export const getAllContacts = async (
  user_account_id: number
): Promise<Success<Contact[]>> => {
  logger.info("Getting all Contact");

  try {
    const contact = await contactModel.getAllContacts(user_account_id);

    return {
      data: contact,
      message: "Contact fetched successfully",
    };
  } catch (err) {
    logger.info(err);

    return {
      message: "Error fetching contact",
    };
  }
};

/**
 * Add  user's contact
 * @param {ContactToCreate} contact
 * @returns { Promise<Success<Contact>> }
 */
export const addContact = async (
  contact: ContactToCreate
): Promise<Success<Contact>> => {
  logger.info("Creating a new Contact");

  try {
    const newContact = await contactModel.addContact(contact);

    return {
      data: newContact,
      message: "Contact added successfully",
    };
  } catch (err) {
    logger.info(err);

    return {
      message: "Error adding contact",
    };
  }
};

export const deleteContact = async (
  user_id: number,
  contact_id: number
): Promise<Success<string>> => {
  logger.info("Delete contact");
  try {
    const message = await contactModel.deleteContact(user_id, contact_id);

    return {
      message: message,
    };
  } catch (err) {
    logger.info(err);

    return {
      message: "Error deleting contact",
    };
  }
};

export const getContactById = async (
  user_id: number,
  contact_id: number
): Promise<Success<Contact>> => {
  logger.info("Getting contact");

  try {
    const contact = await contactModel.getContactbyId(user_id, contact_id);

    return {
      message: "Contact fetched successfully",
      data: contact,
    };
  } catch (err) {
    logger.info(err);

    return {
      message: "Failed to fatch contact",
    };
  }
};

export const updateContact = async (
  user_id: number,
  contact_id: number,
  contact: Contact
): Promise<Success<Contact>> => {
  logger.info("Updating Contact");

  try {
    const updatedContact = await contactModel.updateContact(
      user_id,
      contact_id,
      contact
    );

    return {
      data: updatedContact,
      message: "Contact Updated successfully",
    };
  } catch (err) {
    logger.info(err);

    return {
      message: "Error updating contact",
    };
  }
};
