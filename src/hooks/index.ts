import { MemberLookupReturn, LookupParams } from '../lib/members';

export const useLookup = async ({url, searchBy, searchFor}: LookupParams): Promise<MemberLookupReturn> => {
  const response = await fetch(`${url}/${searchBy}/single/${searchFor}`);
  const data: MemberLookupReturn = await response.json();
  return data;
}
