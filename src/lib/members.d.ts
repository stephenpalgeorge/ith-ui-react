export interface MPContact {
  phone: string[],
  email: string[],
  links: string[]
}

export interface LookupParams {
  url?: string,
  searchBy: string,
  searchFor: string,
}

export interface Member {
  "@Member_Id": string,
  "@Dods_Id": string,
  "@Pims_Id": string,
  "@Clerks_Id": string,
  DisplayAs: string,
  ListAs: string,
  FullTitle: string,
  LayingMinisterName: string,
  DateOfBirth: string,
  DateOfDeath: object,
  Gender: string,
  Party: object,
  House: string,
  MemberFrom: string,
  HouseStartDate: string,
  HouseEndDate: object,
  CurrentStatus: object,
  Contact: MPContact
}

export interface Clean_Member {
  "@Member_Id": string,
  DisplayAs: string,
  ListAs: string,
  FullTitle: string,
  LayingMinisterName: string,
  DateOfBirth: string,
  Gender: string,
  Party: object,
  House: string,
  MemberFrom: string,
  HouseStartDate: string,
  Contact: MPContact
}