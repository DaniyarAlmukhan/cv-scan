export const isEmpty = (value?: string | number | boolean | null) => {
  return value === '' || value === undefined || value === null;
};
