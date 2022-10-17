import { Coach, CoachFormValues } from 'src/types';

export const getCoaches = async () =>
  fetch('http://localhost:3010/coaches', {
    method: 'GET',
  })
    .then((response): Promise<Coach[]> => response.json())
    .then((data) => data);

export const postCoach = async (data: CoachFormValues) =>
  fetch('http://localhost:3010/coaches', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response): Promise<Coach> => response.json())
    .then((data) => data);

export const deleteCoach = async (coachId: string) =>
  fetch(`http://localhost:3010/coaches/${coachId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response): Promise<Coach> => response.json())
    .then((data) => data);

export const updateCoach = async (coachId: string, data: CoachFormValues) =>
  fetch(`http://localhost:3010/coaches/${coachId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response): Promise<Coach> => response.json())
    .then((data) => data);
