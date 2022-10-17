import { InferType } from 'yup';
import { schema } from './components/CreateForm/schema';

export interface Coach {
  id: string;
  fullName: string;
  email: string;
  parentCoach: string | null;
  position: number;
  owner?: boolean;
  children: TreeNodeType[] | Coach[];
}
export type CoachFormValues = InferType<typeof schema>;

export interface TreeNodeType extends Coach {
  children: TreeNodeType[];
}

export interface NodeMap {
  [key: string]: number;
}
