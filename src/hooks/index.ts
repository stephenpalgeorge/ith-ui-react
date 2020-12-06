import { MemberLookupReturn, LookupParams } from '../lib/members';

export const useLookup = async ({url, searchBy, searchFor, type = 'single'}: LookupParams): Promise<MemberLookupReturn> => {
  try {
    const terms: string = searchFor.split(',').join('+');
    const response = await fetch(`${url}/${searchBy}/${type}/${terms}`);
    const data: MemberLookupReturn = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
