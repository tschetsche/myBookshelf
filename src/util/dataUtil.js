import { DateTime } from 'luxon';

export const formatISOString = (isoString) => {
  return DateTime.fromISO(isoString).toLocaleString(DateTime.DATE_SHORT);
};
