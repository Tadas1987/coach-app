import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Coach, CoachFormValues } from 'src/types';
import { schema } from './schema';

interface Props {
  onSubmit: SubmitHandler<CoachFormValues>;
  coaches: Coach[];
  associationOwner: Coach;
}

export const CreateForm: FC<Props> = (props) => {
  const { onSubmit, coaches, associationOwner } = props;
  const formMethods = useForm<CoachFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      position: 1,
    },
  });
  const parentCoachId = formMethods.watch('parentCoach');

  useEffect(() => {
    if (associationOwner) {
      formMethods.setValue('parentCoach', associationOwner.id);
    }
  }, [associationOwner, formMethods]);

  useEffect(() => {
    if (coaches && parentCoachId) {
      let childCount = coaches.filter(
        (element) => element.parentCoach === parentCoachId
      ).length;

      formMethods.setValue('position', childCount + 1);
    }
  }, [parentCoachId, coaches, formMethods]);

  return (
    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <div className="form-container">
        <div className="input-container">
          <label htmlFor="fullName">Full name</label>
          <div className="input">
            <input
              {...formMethods.register('fullName')}
              id="fullName"
              data-testid="fullName"
            />
            {formMethods.formState.errors.fullName && (
              <div>
                <p className="error-message">
                  <ErrorMessage
                    errors={formMethods.formState.errors}
                    name="fullName"
                  />
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <div className="input">
            <input
              {...formMethods.register('email')}
              id="email"
              data-testid="email"
            />
            {formMethods.formState.errors.email && (
              <div>
                <p className="error-message">
                  <ErrorMessage
                    errors={formMethods.formState.errors}
                    name="email"
                  />
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="parentCoach">Select Coach</label>
          <div className="input">
            <select
              {...formMethods.register('parentCoach')}
              id="parentCoach"
              data-testid="parentCoach"
            >
              {associationOwner && (
                <option value={associationOwner?.id}>Select coach...</option>
              )}
              {coaches &&
                coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.fullName}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div>
          <button type="submit" data-testid="submit">
            Create
          </button>
        </div>
      </div>
    </form>
  );
};
