import { MemberLookupReturn, LookupError, LookupParams } from '../lib/members';

export const useLookup = async ({url, searchBy, searchFor, type = 'single'}: LookupParams): Promise<[MemberLookupReturn|null, LookupError|null]> => {
  try {
    const terms: string = searchFor.split(',').join('+');
    const response = await fetch(`${url}/api/${searchBy}/${type}/${terms}`);
    if (response.status !== 200) {
      const error = await response.json();
      return [null, {...error, status: response.status}];
    } else {  
      const data: MemberLookupReturn = await response.json();
      return [data, null];
    }
  } catch (err) {
    return [null, err];
  }
}
