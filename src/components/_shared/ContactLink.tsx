import * as React from 'react';
import { MemberContact } from '../../lib/members';

/**
 * ----------
 * CONTACT LINK
 * ----------
 */
interface ContactLinkProps {
  linkObject: MemberContact
}

export const ContactLink: React.FC<ContactLinkProps> = ({ linkObject }) => {
  const href: string|null = linkObject.email ? `mailto:${linkObject.email}` :
    linkObject.isWebAddress === true ? linkObject.line1 : null;
  
  return href !== null ? (
    <a
      className="member-card__links-container--link ith--member-card__links-container--link"
      href={ href }
    >
      { linkObject.type }
    </a>
  ) : null;
}
