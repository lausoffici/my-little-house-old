import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import MultiSelect from "react-select";

import { IFormData } from "student/StudentsForm";
import theme from "theme";

const styles = {
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

const courseOptions = [
  { value: "kinder", label: "Kinder" },
  { value: "adults", label: "Adults" },
  { value: "fce", label: "FCE" },
];

interface Props {
  control: Control<IFormData, any>;
}

const CoursesMultiSelect: FC<Props> = ({ control }) => {
  return (
    <Controller
      name="courses"
      control={control}
      render={({ field: { value, onChange, onBlur } }) => (
        <MultiSelect
          isMulti
          styles={styles}
          options={courseOptions}
          placeholder="Seleccionar cursos"
          noOptionsMessage={() => "No se encontraron cursos"}
          onBlur={onBlur}
          onChange={(options) =>
            onChange(options?.map((option) => option.value))
          }
          value={courseOptions.filter((option) =>
            value?.includes(option.value)
          )}
        />
      )}
    />
  );
};

export default CoursesMultiSelect;
