export interface LookupParams {
  url?: string,
  searchBy?: string,
  searchFor: string,
}

export interface Member {
  id: number,
  nameListAs: string,
  nameDisplayAs: string,
  nameFullTitle: string,
  nameAddressAs: string,
  latestParty: object,
  gender: 'M'|'F',
  latestHouseMembership: object,
  thumbnailUrl: string,
}

export interface MemberResponse extends Member {
  portraitUrl: string,
  Contact: object[],
}
