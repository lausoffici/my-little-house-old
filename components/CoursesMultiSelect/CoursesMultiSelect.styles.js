import theme from "theme";

export const styles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: 40,
    borderRadius: 6,
    boxShadow: "none",
    border: state.isFocused
      ? `2px solid ${theme.colors.brand[400]}`
      : `1px solid ${theme.colors.gray[200]}`,
    "&:hover": {
      borderColor: state.isFocused
        ? theme.colors.brand[400]
        : theme.colors.gray[300],
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: theme.colors.gray[400],
  }),
  input: (provided) => ({
    ...provided,
    cursor: "text",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? theme.colors.brand[50]
      : theme.colors.white,
  }),
};
