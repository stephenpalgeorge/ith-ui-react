import * as React from 'react';
import { ContactLink } from '../_shared';
import { MemberResponse } from '../../lib/members';

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
  return (mp && Object.keys(mp).length) ? <div className="member-card ith--member-card">
    {/* IMAGE */}
    {
      showImage &&
      <div className="member-card__image-container ith--member-card__image-container">
        <img src={ mp.thumbnailUrl } alt={ `portrait photo of ${ mp.nameDisplayAs }` } />
      </div>
    }

    {/* TEXT CONTENTS */}
    <div className="member-card__text-container ith--member-card__text-container">
      <h2>{ mp.nameFullTitle }</h2>
      <div className="member-card__text-container--details ith--member-card__text-container--details">
        <p className="member-card__text-container--party-name ith--member-card__text-container--party-name">
          { mp.latestParty && mp.latestParty.name }
        </p>
        <p className="member-card__text-container--constituency-name ith--member-card__text-container--constituency-name">
          { mp.latestHouseMembership && mp.latestHouseMembership.membershipFrom }
        </p>
      </div>
    </div>

    {/* LINKS */}
    <div className="member-card__links-container ith-member-card__links-container">
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