import * as React from 'react';
import List from './List';
import { ContactLink, Container } from '../_shared';
import { Variations } from '../_shared/Container';
import { Info, MemberContact, MemberResponse } from '../../lib/members';

// ----------
// PAGE HEADER COMPONENT
// ----------
//
interface PageHeaderProps {
  /**
   * text that describes the constituency that the member represents
   * */
  constituencyName: string | undefined,
  /**
   * an array of objects, each with properties 'type', 'typeDescription',
   * 'typeId', 'isPreferred', 'isWebAddress', 'line1', 'email?'
   * */
  contactLinks: MemberContact[] | undefined,
  /**
   * the name of the member of parliament returned from the API
   * */
  memberName: string | undefined,
  /**
   * A paragraph that summarise the MPs role, provided directly by the API.
   * */
  memberSynopsis: string | undefined,
  /**
   * the name of the parliamentary party that the member represents.
   * */
  partyName: string | undefined,
}

/**
 * The PageHeader component is a presentational component that is consumed by the
 * MemberPage component. It essentially presents an enriched version of the MemberCard
 * component, but within a page structure.
 * */
const PageHeader: React.FC<PageHeaderProps> = ({
  constituencyName,
  contactLinks,
  memberName,
  memberSynopsis,
  partyName,
}) => {
  return <header className="ith--member-page__header">
    <div className="ith--member-page__header-image-container">

    </div>

    <div className="ith--member-page__header-text-container">
      { memberName && <h1>{ memberName }</h1> }
      
      <div className="ith--member-page__header-text-container--details">
        { partyName && <p className="ith--member-details__party-name">{ partyName }</p> }
        { constituencyName && <p className="ith--member-details__constituency-name">{ constituencyName }</p> }
      </div>

      {
        (contactLinks && contactLinks.length > 0) &&
        <ul>
          { contactLinks.map(l => <li key={ l.type }><ContactLink linkObject={ l } /></li>) }
        </ul>
      }
    </div>

    {
      memberSynopsis &&
      <div className="ith--member-page__synopsis">
        <p>{ memberSynopsis }</p>
      </div>
    }
  </header>
}

// ----------
// MEMBER POSTS COMPONENT
// ----------
// 
interface MemberPostsProps {
  /**
   * An array of objects, each with the properties: 'house', 'name',
   * 'id', 'startDate', 'endDate', 'additionalInfo', 'additionalInfoLink'
   * */
  governmentPosts: Info[] | undefined,
  /**
   * An array of objects, each with the properties: 'house', 'name',
   * 'id', 'startDate', 'endDate', 'additionalInfo', 'additionalInfoLink'
   * */
  oppositionPosts: Info[] | undefined,
  /**
   * An array of objects, each with the properties: 'house', 'name',
   * 'id', 'startDate', 'endDate', 'additionalInfo', 'additionalInfoLink'
   * */
  otherPosts: Info[] | undefined,
  /**
   * An array of objects, each with the properties: 'house', 'name',
   * 'id', 'startDate', 'endDate', 'additionalInfo', 'additionalInfoLink'
   * */
  committeeMemberships: Info[] | undefined,
}

/**
 * The MemberPosts component is a presentational component that displays the different
 * positions/roles that a member has had in government, opposition or elsewhere.
 */
const MemberPosts: React.FC<MemberPostsProps> = ({
  committeeMemberships,
  governmentPosts,
  oppositionPosts,
  otherPosts,
}) => {
  return <section className="ith--member-page__posts">
    { governmentPosts && <List titleText="Government posts" listItems={ governmentPosts } /> }
    { oppositionPosts && <List titleText="Opposition posts" listItems={ oppositionPosts } /> }
    { otherPosts && <List titleText="Other posts" listItems={ otherPosts } /> }
    { committeeMemberships && <List titleText="Committee Memberships" listItems={ committeeMemberships } /> }
  </section>
}

// ----------
// MEMBER PAGE COMPONENT
// ----------
// 
interface MemberPageProps {
  /**
   * An object, the response from the API call.
   * */
  mp: MemberResponse,
  /**
   * A string that describes the markup that should be used for the container.
   * If this is undefined, the Container components default of 'main' will be used.
   * */
  variation: Variations | undefined,
}

/**
 * The MemberPage component provides a rich presentation of the member data
 * that is returned from the API. This is an extension of the MemberCard component,
 * that only renders the basic member data.
 */
const MemberPage: React.FC<MemberPageProps> = ({ mp = {}, variation }) => {
  return (mp && Object.keys(mp).length) ? <Container variation={ variation }>
    <PageHeader
      constituencyName={ mp.latestHouseMembership && mp.latestHouseMembership.membershipFrom }
      contactLinks={ mp.Contact }
      memberName={ mp.nameFullTitle }
      memberSynopsis={ mp.Synopsis }
      partyName={ mp.latestParty && mp.latestParty.name }
    />

    <MemberPosts
      committeeMemberships={ mp.Bio && mp.Bio.committeeMemberships }
      governmentPosts={ mp.Bio && mp.Bio.governmentPosts }
      oppositionPosts={ mp.Bio && mp.Bio.oppositionPosts }
      otherPosts={ mp.Bio && mp.Bio.otherPosts }
    />
  </Container> : null;
}

export default MemberPage;
