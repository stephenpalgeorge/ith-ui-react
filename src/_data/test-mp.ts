import { MemberResponse } from '../lib/members';

export const testMp: MemberResponse = {
  id: 0,
  nameListAs: 'Mr A Test',
  nameDisplayAs: 'Mr A Test',
  nameFullTitle: 'Mr A Test',
  nameAddressAs: 'Mr A Test',
  latestParty: {
    id: 0,
    name: 'Test',
    abbreviation: 'T',
    backgroundColour: '#000',
    foregroundColour: '#FFF',
    isLordsMainParty: true,
    isLordsSpiritualParty: true,
    governmentType: 0,
    isIndependentParty: true,
  },
  gender: 'M',
  latestHouseMembership: {
    membershipFrom: 'constituency',
    membershipFromId: 0,
    house: 0,
    membershipStartDate: 'date',
    membershipEndDate: null,
    membershipEndReason: null,
    membershipEndReasonNotes: null,
    membershipEndReasonId: null,
    membershipStatus: {
      statusIsActive: true,
      statusDescription: 'test',
      statusNotes: null,
      statusId: 0,
      statusStartDate: 'date',
    },
  },
  thumbnailUrl: 'https://test.org',
  portraitUrl: 'https://test.org',
  partyColor: '#000',
  Bio: {
    governmentPosts: [
      {
        house: 0,
        name: 'test',
        id: 0,
        startDate: 'date',
        endDate: null,
        additionalInfo: null,
        additionalInfoLink: null,
      }
    ],
    oppositionPosts: [
      {
        house: 0,
        name: 'test',
        id: 0,
        startDate: 'date',
        endDate: null,
        additionalInfo: null,
        additionalInfoLink: null,
      }
    ],
    otherPosts: [
      {
        house: 0,
        name: 'test',
        id: 0,
        startDate: 'date',
        endDate: null,
        additionalInfo: null,
        additionalInfoLink: null,
      }
    ],
    committeeMemberships: [
      {
        house: 0,
        name: 'test',
        id: 0,
        startDate: 'date',
        endDate: null,
        additionalInfo: null,
        additionalInfoLink: null,
      }
    ],
  },
  Contact: [
    {
      type: 'test',
      typeDescription: 'test description',
      typeId: 0,
      isPreferred: true,
      isWebAddress: true,
      line1: 'https://test.org',
    }
  ],
  Focus: [
    {
      category: 'cat',
      focus: ['test', 'demo'],
    }
  ],
  Synopsis: 'All about this person',
}