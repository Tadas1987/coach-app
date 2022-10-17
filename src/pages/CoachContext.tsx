import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getCoaches } from 'src/api/http';

import { Coach } from 'src/types';

interface ProviderProps {
  children: ReactNode;
}

export const CoachesProvider: FC<ProviderProps> = (props) => {
  const { children } = props;
  const [coaches, setCoaches] = useState<Coach[] | null>(null);
  const [owner, setOwner] = useState<Coach | null>(null);

  useEffect(() => {
    getCoaches().then((data) => {
      setCoaches(data);

      if (data !== null) {
        const ownerCoach = data.find((coach) => coach.owner);
        if (ownerCoach) {
          setOwner(ownerCoach);
        }
      }
    });
  }, []);

  return (
    <CoachContext.Provider
      value={{
        coaches: coaches,
        setCoaches: setCoaches,
        associationOwner: owner,
      }}
    >
      {children}
    </CoachContext.Provider>
  );
};

export type CoachContextProps = {
  coaches: Coach[] | null;
  setCoaches: React.Dispatch<React.SetStateAction<Coach[] | null>>;
  associationOwner: Coach | null;
};

const CoachContext = createContext<CoachContextProps | undefined>(undefined);

export const useCoaches = (): CoachContextProps => {
  const context = useContext(CoachContext);

  if (context === undefined) {
    throw new Error('useCoaches must be used within an CoachesProvider');
  }

  return context;
};
