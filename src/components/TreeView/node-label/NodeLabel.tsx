import { FC } from 'react';
import { Coach } from 'src/types';
import './styles.css';

interface Props {
  fullName: Coach['fullName'];
  email: Coach['email'];
}

export const NodeLabel: FC<Props> = (props) => {
  const { fullName, email } = props;

  return (
    <div className="node-label">
      <p>
        <strong>Full Name:</strong> {fullName}
      </p>
      <p>
        <strong>Email: </strong> {email}
      </p>
    </div>
  );
};
