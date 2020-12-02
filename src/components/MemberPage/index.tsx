import * as React from 'react';
import List from './List';
import { ContactLink, Container } from '../_shared';
import { Info, MemberContact, MemberResponse } from '../../lib/members';

// ----------
// PAGE HEADER COMPONENT
// ----------
//
interface PageHeaderProps {
  constituencyName: string | undefined,
  contactLinks: MemberContact[] | undefined,
  memberName: string | undefined,
  memberSynopsis: string | undefined,
  partyName: string | undefined,
}

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
  governmentPosts: Info[] | undefined,
  oppositionPosts: Info[] | undefined,
  otherPosts: Info[] | undefined,
  committeeMemberships: Info[] | undefined,
}

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
  mp: MemberResponse,
}

const MemberPage: React.FC<MemberPageProps> = ({ mp = {} }) => {
  return (mp && Object.keys(mp).length) ? <Container>
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
