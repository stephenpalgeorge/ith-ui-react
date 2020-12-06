import * as React from 'react';
import { ContactLink } from '../_shared';
import { MemberResponse } from '../../lib/members';

interface MemberCardProps {
  /**
   * an MP object returned by the API.
   * @default {}
   */
  mp: MemberResponse,
  /**
   * a boolean flag to control whether or not the image is rendered.
   * @default true
   */
  showImage?: boolean,
}

/**
 * The MemberCard component provides basic markup for rendering/displaying the
 * return value of an API call.
 * */
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
        <p className="member-card__text-container--party-name ith--member-card__text-container--party-name ith--member-details__party-name">
          { mp.latestParty && mp.latestParty.name }
        </p>
        <p className="member-card__text-container--constituency-name ith--member-card__text-container--constituency-name ith--member-details__constituency-name">
          { mp.latestHouseMembership && mp.latestHouseMembership.membershipFrom }
        </p>
      </div>
    </div>

    {/* LINKS */}
    <ul className="member-card__links-container ith-member-card__links-container">
      {
        (mp.Contact && mp.Contact.length > 0) &&
        mp.Contact.map(l => <li key={ l.type }><ContactLink linkObject={ l } /></li>)
      }
    </ul>
  </div> : null;
}

export default MemberCard;