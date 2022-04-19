export const capitalize = (word: string) =>
  word && word.charAt(0).toUpperCase() + word.slice(1);

export const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const normalize = (string: string) =>
  removeAccents(string.toLowerCase());

export const formatCurrency = (n: number) => {};
