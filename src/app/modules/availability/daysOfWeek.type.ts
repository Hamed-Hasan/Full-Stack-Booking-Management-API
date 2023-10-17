export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type DaysOfWeek = {
  // eslint-disable-next-line no-unused-vars
  [key in DayOfWeek]?: boolean;
};
