import * as React from 'react';
import { MemberResponse, MemberContact } from '../../lib/members';

/**
 * ----------
 * CONTACT LINK
 * ----------
 */
interface ContactLinkProps {
  linkObject: MemberContact
}

const ContactLink: React.FC<ContactLinkProps> = ({ linkObject }) => {
  const href: string|null = linkObject.email ? `mailto:${linkObject.email}` :
    linkObject.isWebAddress === true ? linkObject.line1 : null;
  
  return href !== null ? <a className="member-card--contact-link" href={ href }>
    { linkObject.type }
  </a> : null;
}

/**
 * ----------
 * MEMBER CARD
 * ----------
 */
interface MemberCardProps {
  mp: MemberResponse,
  showImage?: boolean,
}

const MemberCard: React.FC<MemberCardProps> = ({ mp = {}, showImage = true}) => {
  return (mp && Object.keys(mp).length) ? <div className="member-card">
    {/* IMAGE */}
    {
      showImage &&
      <div className="member-card__image-container">
        <img src={ mp.thumbnailUrl } alt={ `portrait photo of ${ mp.nameDisplayAs }` } />
      </div>
    }

    {/* TEXT CONTENTS */}
    <div className="member-card__text-container">
      <h2>{ mp.nameFullTitle }</h2>
      <div>
        <p>{ mp.latestParty && mp.latestParty.name }</p>
        <p>{ mp.latestHouseMembership && mp.latestHouseMembership.membershipFrom }</p>
      </div>
    </div>

    {/* LINKS */}
    <div className="member-card__links-container">
      {
        (mp.Contact && mp.Contact.length > 0) &&
        mp.Contact.map(l => <ContactLink key={ l.type } linkObject={ l } />)
      }
    </div>

    <pre>
      {JSON.stringify(mp, null, 2)}
    </pre>
  </div> : null;
}

export default MemberCard;