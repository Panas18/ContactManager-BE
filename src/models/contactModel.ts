import db from "../db/db";
import { Contact, ContactToCreate } from "../domain/Contact";

class ContactTable {
  public static table = "contact";

  /**
   * Get all contact of authorized user
   * @param {number} user_account_id
   * @returns {Promise<Contact>}
   */
  public static async getAllContacts(
    user_account_id: number
  ): Promise<Contact[]> {
    const contact = await db(ContactTable.table).where({
      user_account_id: user_account_id,
    });

    return contact;
  }

  /**
   * Add  user's contact
   * @param {ContactToCreate} contact
   * @returns { Promise<Contact> }
   */
  public static async addContact(contact: ContactToCreate): Promise<Contact> {
    console.log(contact);

    const newContact: Contact = await db(ContactTable.table)
      .where({ user_account_id: contact.user_account_id })
      .insert(contact, ["id", "first_name", "last_name", "user_account_id"]);

    return newContact;
  }

  public static async updateContact(
    user_id: number,
    contact_id: number,
    contact: ContactToCreate
  ): Promise<Contact> {
    const updatedContact: Contact = await db(ContactTable.table)
      .where({ user_account_id: user_id })
      .where({ id: contact_id })
      .update(contact)
      .returning(["id", "first_name", "last_name", "user_account_id"]);

    return updatedContact;
  }

  /**
   * Delete Contact
   * @param user_id
   * @param contact_id
   * @returns
   */
  public static async deleteContact(
    user_id: number,
    contact_id: number
  ): Promise<string> {
    await db(ContactTable.table)
      .where({ user_account_id: user_id })
      .where({ id: contact_id })
      .delete();

    return "Contact deleted successfully";
  }

  /**
   *
   * @param { number } user_id
   * @param { number } contact_id
   * @returns  { Promise<User> }
   */
  public static async getContactbyId(
    user_id: number,
    contact_id: number
  ): Promise<Contact> {
    const contact = await db(ContactTable.table)
      .where({ user_account_id: user_id })
      .where({ id: contact_id })
      .select()
      .first();

    return contact;
  }
}

export default ContactTable;
