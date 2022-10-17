import { SubmitHandler } from 'react-hook-form';
import './App.css';
import { FC } from 'react';
import { CoachFormValues } from '../types';
import { postCoach } from '../api/http';
import { useNavigate } from 'react-router-dom';
import { useCoaches } from './CoachContext';
import { Navigation } from '../components/Navigation';
import { CreateForm } from 'src/components/CreateForm/CreateForm';

export const CreatePage: FC = () => {
  const navigate = useNavigate();
  const { coaches, setCoaches, associationOwner } = useCoaches();

  const onSubmit: SubmitHandler<CoachFormValues> = (data) => {
    postCoach(data).then((data) => {
      if (coaches !== null) {
        setCoaches([...coaches, data]);
        navigate('/coach-list');
      }
    });
  };

  return (
    <div className="App">
      <Navigation />
      <div className="App-header">
        <div>
          <h1>Create - Form</h1>
        </div>
        {associationOwner && coaches && (
          <CreateForm
            associationOwner={associationOwner}
            coaches={coaches}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
};
