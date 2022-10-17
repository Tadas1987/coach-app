import { FC } from 'react';
import { Coach } from 'src/types';

interface Props {
  fullName: Coach['fullName'];
  email: Coach['email'];
  parentCoachFullName?: Coach['fullName'];
}

export const NodeLabel: FC<Props> = (props) => {
  const { fullName, email, parentCoachFullName } = props;

  return (
    <div className="node-label">
      <p>
        <span>Full Name: </span>
        {fullName}
      </p>
      <p>
        <span>Email: </span>
        {email}
      </p>
      {parentCoachFullName && (
        <p>
          <span>Parent Coach: </span>
          {parentCoachFullName}
        </p>
      )}
    </div>
  );
};
