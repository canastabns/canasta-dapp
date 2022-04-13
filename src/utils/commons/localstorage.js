export const getItem = name => {
  try {
    if(!name)
      return {};

    const item = localStorage.getItem(name);
    return JSON.parse(item);
  } catch (error) {
    return {};
  }
};

export const setItem = (name, item = {}) => {
  try {
    localStorage.setItem(name, JSON.stringify(item));
  } catch (error) {
    console.log('setItem error', error);
  }
};

export const removeItem = name => localStorage.removeItem(name);
