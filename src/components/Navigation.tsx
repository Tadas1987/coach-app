import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Navigation: FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Create From</Link>
        </li>
        <li>
          <Link to="/coach-list">Coaches List</Link>
        </li>
      </ul>
    </nav>
  );
};
