export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key) => {
  const value = JSON.parse(localStorage.getItem(key));
  return value;
};

export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};

export const removeAllStorage = () => {
  localStorage.clear();
};
