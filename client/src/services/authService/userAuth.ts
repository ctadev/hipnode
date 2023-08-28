import { ICurrentUser } from '../../../types/index';

const LOCAL_STORAGE_KEY = 'currentUser';

const isValidUser = (obj: any): obj is ICurrentUser => {
  return (
    obj &&
    'id' in obj &&
    typeof obj.id === 'number' &&
    'username' in obj &&
    typeof obj.username === 'string' &&
    'token' in obj &&
    typeof obj.token === 'string'
  );
};

export const getUserFromLocalStorage = (): ICurrentUser | null => {
  const currentUser = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!currentUser) {
    return null;
  }
  try {
    const parsedCurrentUser: ICurrentUser = JSON.parse(currentUser);
    if (isValidUser(parsedCurrentUser)) {
      return parsedCurrentUser;
    }
  } catch (err) {
    console.error('Error parsing user data from localStorage', err);
  }

  return null;
};

export const setUserToLocalStorage = (currentUser: ICurrentUser): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentUser));
};

export const removeUserFromLocalStorage = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const getToken = (): string | undefined => {
  if (!getUserFromLocalStorage()) {
    return undefined;
  }
  return getUserFromLocalStorage()?.token;
};

export const removeToken = (): void => {
  if (getUserFromLocalStorage()) {
    removeUserFromLocalStorage();
  }
};
