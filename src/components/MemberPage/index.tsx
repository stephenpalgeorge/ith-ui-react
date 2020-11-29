import * as React from 'react';
import { Container } from '../_shared';
import { Member, MemberResponse } from '../../lib/members';

interface MemberPageProps {
  mp: MemberResponse,
}

const MemberPage: React.FC<MemberPageProps> = () => {
  return <Container>
    <div>test</div>
  </Container>
}

export default MemberPage;
