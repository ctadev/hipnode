export const getUser = () => {
  const user = localStorage.getItem('user');
  if (user !== null) {
    const parsedUser = JSON.parse(user) || user;
    return parsedUser;
  } else {
    return null;
  }
};
