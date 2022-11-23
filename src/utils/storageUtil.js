
export let setLocalStorage = (key, value) => {
  if (value && typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};


export let getLocalStorage = key => {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};


export let clearLocalStorage = key => localStorage.removeItem(key);
