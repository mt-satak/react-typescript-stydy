import { Career } from "../entity/career";

export const exitEmptyCareers = (careers: Career[]) => {
  return careers.some(career => isEmptyCareer(career));
};

const isEmptyCareer = (career: Career) => {
  return Object.values(career).every(value => !value);
};