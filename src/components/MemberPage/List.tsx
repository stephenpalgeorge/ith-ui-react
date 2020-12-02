import * as React from 'react';
import { Info } from '../../lib/members';

// ----------
// LIST ITEM COMPONENT
// ----------
// 
const ListItem: React.FC<Info> = ({
  id,
  name,
  additionalInfoLink,
  additionalInfo,
  startDate,
  endDate,
}) => {
  return <li key={ id }>
    <h3>{ name }</h3>
    {
      additionalInfoLink !== null ?
      <a href={ additionalInfoLink }>{ additionalInfo }</a> :
      <p>{ additionalInfo }</p>
    }
    <p>{ startDate } - { endDate }</p>
  </li>
}


// ----------
// LIST COMPONENT
// ----------
// 
interface ListProps {
  titleText?: string,
  listItems: Info[] | undefined,
}

const List: React.FC<ListProps> = ({ titleText, listItems }) => {
  return (listItems && listItems.length > 0) ? <div>
    <h2>{ titleText }</h2>
    <ul>
      {
        listItems.map(item => <ListItem {...item} />)
      }
    </ul>
  </div> : null;
}

export default List;
