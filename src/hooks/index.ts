import { Member, Clean_Member } from '../lib/members';

export const useSingleLookup = async (queryUrl: string, searchBy: string, searchTerm: string): Promise<Clean_Member|Member> => {
  const response = await fetch(`${queryUrl}/${searchBy}/single/${searchTerm}`);
  const data: Clean_Member|Member = await response.json();
  return data;
}