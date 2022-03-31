import { DateTime } from 'luxon';

export const formatISOString = (isoString) => {
  return DateTime.fromISO(isoString).toLocaleString('dd LL yy');
};

export const isFutureDate = (jsDate) => {
  const passedDate = DateTime.fromJSDate(jsDate);
  const tomorrow = DateTime.now().plus({ days: 1 });
  return tomorrow < passedDate;
};

export const isDateBeforeOtherDate = (predecessor, successor) => {
  return DateTime.fromJSDate(predecessor) <= DateTime.fromJSDate(successor);
};
