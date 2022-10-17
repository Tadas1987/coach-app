import { TreeView } from '../components/TreeView/TreeView';
import { FC } from 'react';
import { useCoaches } from './CoachContext';
import { Navigation } from '../components/Navigation';

export const CoachList: FC = () => {
  const { coaches } = useCoaches();

  return (
    <div className="App">
      <Navigation />
      {coaches && <TreeView coachList={coaches} />}
    </div>
  );
};
