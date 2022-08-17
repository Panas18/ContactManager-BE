import { Response, NextFunction } from "express";
import { AuthRequest } from "../domain/User";
import * as contactService from "../service/contactService";

/**
 *
 * @param { AuthRequest } req
 * @param { Response } res
 * @param { NextFunction }next
 */
export const getAllContacts = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user_account_id = req.authUser;

  contactService
    .getAllContacts(user_account_id as number)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Add contact of authorized user
 * @param { AuthRequest } req
 * @param { Response } res
 * @param { NextFunction }next
 */
export const addContact = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user_account_id = req.authUser;
  const photo = req.file?.path + "";

  const contact = req.body;
  contact.photo = photo;

  contactService
    .addContact({ ...contact, user_account_id })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Update contact
 * @param req
 * @param res
 * @param next
 */
export const updateContact = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.authUser;
  const contact_id = req.params.contact_id;
  const contact = req.body;
  const photo = req.file?.path + "";
  contact.photo = photo;

  contactService
    .updateContact(user_id as number, +contact_id, contact)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 *  Delete contact
 * @param req
 * @param res
 * @param next
 */
export const deleteContact = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.authUser;
  const contact_id = req.params.contact_id;
  contactService
    .deleteContact(user_id as number, +contact_id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Get contact by ID
 * @param req
 * @param res
 * @param next
 */
export const getContactById = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.authUser;
  const contact_id = req.params.contact_id;
  contactService
    .getContactById(user_id as number, +contact_id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
