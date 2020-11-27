import { MemberResponse, LookupParams } from '../lib/members';

export const useLookup = async ({url, searchBy, searchFor}: LookupParams): Promise<MemberResponse> => {
  const response = await fetch(`${url}/${searchBy}/single/${searchFor}`);
  const data: MemberResponse = await response.json();
  return data;
}
