import { differenceInYears, isBefore } from 'date-fns';

function calculateAgeDied(dob: Date, dod: Date): number {
  let age = differenceInYears(dod, dob);

  const thisYearBirthday = new Date(dod.getFullYear(), dob.getMonth(), dob.getDate());
  if (isBefore(dod, thisYearBirthday)) {
    age--;
  }

  return age;
}

export default calculateAgeDied;
