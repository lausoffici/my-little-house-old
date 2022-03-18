export const capitalize = (word: string) =>
  word && word.charAt(0).toUpperCase() + word.slice(1);

export const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
