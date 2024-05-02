export const formatTime = date => {
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const amPm = date.getHours() < 12 ? 'AM' : 'PM';
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${amPm}`;
};

export const tomorrow = () => {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

export const isToday = isoString => {
  let isoDate = new Date(isoString);

  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  let isoDateOnly = new Date(isoDate);
  isoDateOnly.setHours(0, 0, 0, 0);

  if (isoDateOnly.getTime() === currentDate.getTime()) {
    return true;
  } else {
    return false;
  }
};

export const isNextDay = isoString => {
  let isoDate = new Date(isoString);

  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  let isoDateOnly = new Date(isoDate);
  isoDateOnly.setHours(0, 0, 0, 0);

  if (isoDateOnly.getTime() > currentDate.getTime()) {
    return true;
  } else {
    return false;
  }
};
