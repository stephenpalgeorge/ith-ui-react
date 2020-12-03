import * as React from 'react';
import { MemberContact } from '../../lib/members';

interface ContactLinkProps {
  /**
   * An object with properties 'type', 'typeDescription', 'typeId', 'isPreferred',
   * 'isWebAddress', 'line1', 'email?'.
   * */
  linkObject: MemberContact
}

/**
 * The ContactLink component renders a link to an external resource that is
 * associated with the MP in question.
 * */
export const ContactLink: React.FC<ContactLinkProps> = ({ linkObject }) => {
  // href can be to an email (in which case use `mailto`) or to a web address,
  // also make sure we don't pick up an actual address line.
  const href: string|null = linkObject.email ? `mailto:${linkObject.email}` :
    linkObject.isWebAddress === true ? linkObject.line1 : null;
  
  // href will only be null if the value is not an email link, or a url to
  // an external website - in this case, we don't render anything.
  return href !== null ? (
    <a
      className="member-card__links-container--link ith--member-card__links-container--link"
      href={ href }
      target="_blank"
    >
      { linkObject.type }
    </a>
  ) : null;
}
