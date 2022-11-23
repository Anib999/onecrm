export const generateUrlEncodedData = (initialObject) => {
  const formData = Object.keys(initialObject)
    .map((key, index) => {
      if (initialObject[key]) {
        return `${key}=${encodeURIComponent(initialObject[key])}`
      }
    })
    .join('&');
  return formData;
}