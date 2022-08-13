export interface Contact {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  work?: string;
  home?: string;
  mobile?: string;
  email?: string;
  company?: string;
  is_favourite?: string;
  user_account_id: number;
}

export type ContactToCreate = Omit<Contact, "id">;
