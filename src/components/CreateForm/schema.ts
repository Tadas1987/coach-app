import { number, NumberSchema, object, string, StringSchema } from 'yup';

const reg = new RegExp(/^[A-Za-z\s]+$/);
const wordsRegExp = new RegExp(/\S+/g);
const firstLettersRegExp = new RegExp(/\b[A-Z]/g);
const emailDomainRefExp = new RegExp(/\b(@example.com)$\b/g);

const shape = {
  fullName: string()
    .min(4)
    .max(64)
    .matches(reg, 'Special characters are not allowed')
    .test(
      'fourWords',
      'Full Name should not consist of more than 4 words ad each word should begin with the first uppercase letter',
      function (fullName) {
        let wordsInFullName: string[] | null = [];
        let firstLetters: string[] | null = null;

        if (!!fullName) {
          wordsInFullName = fullName.match(wordsRegExp) as string[];
          firstLetters = fullName.match(firstLettersRegExp) as string[];
        }

        return (
          wordsInFullName.length <= 4 &&
          firstLetters?.length === wordsInFullName.length
        );
      }
    )
    .required(),
  email: string()
    .email()
    .matches(emailDomainRefExp, "Email domain name should be 'example.com'")
    .when('fullName', {
      is: (fullName: string) => fullName !== '',
      then: string().test(
        'emailMatchFullName',
        'Email should be combined from the words entered in the Full Name field and separated by dot',
        function (email, context) {
          const fullNameValue = context.parent.fullName as string;
          const fullNameWordsArray = fullNameValue
            .split(' ')
            .map((element) => element.toLocaleLowerCase());

          const emailBeforeDomain = email?.substring(
            email.indexOf('@'),
            0
          ) as string;
          const emailsWordsArray = emailBeforeDomain?.split('.');

          const isSameWords = emailsWordsArray.every((e) =>
            fullNameWordsArray.includes(e.toLocaleLowerCase())
          );

          return (
            emailsWordsArray.length === fullNameWordsArray.length && isSameWords
          );
        }
      ),
    })
    .required(),
  parentCoach: string().nullable() as StringSchema<string | null>,
  position: number().required() as NumberSchema<number>,
};

export const schema = object<typeof shape>().shape(shape);
