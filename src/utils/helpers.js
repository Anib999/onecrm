export const insertSpace = (value) => {
  let newValue = value.replace(/([A-Z])/g, ' $1').trim()
  return newValue
}