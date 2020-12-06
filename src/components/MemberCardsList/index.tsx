import * as React from 'react';
import { Container } from '../_shared';
import { Variations } from '../_shared/Container';
import MemberCard from '../MemberCard';
import { MemberResponse } from '../../lib/members';

interface MemberCardsListProps {
  /**
   * An array of Member objects, each of which will be represented as
   * a card in the UI.
   * */
  members: MemberResponse[]|null,
  /**
   * describes the HTML tag that will be used for the container.
   * If this prop isn't passed, then the default will be used as defined
   * within the Container component itself.
   * */
  variation?: Variations,
}

/**
 * The MemberCardsList component is a presentational component for displaying
 * an array of results from an API call - this would most typically be from
 * querying the `search` routes, which always return an array.
 * */
const MemberCardsList: React.FC<MemberCardsListProps> = ({
  members,
  variation,
}) => {
  return <Container variation={ variation }>
    {
      (members && members.length && members.length > 0) &&
      members.map(m => <MemberCard key={ m.id } mp={ m } />)
    }
  </Container>
}

export default MemberCardsList;
