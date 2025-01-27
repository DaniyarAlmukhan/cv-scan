export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const setAccessToken = (accessToken: string) => {
  accessToken && localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

export const getAccessToken = (): string => {
  return localStorage.getItem(ACCESS_TOKEN) || '';
};
