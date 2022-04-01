import { FC, useEffect, useMemo, useState } from "react";
import { Control, Controller } from "react-hook-form";
import MultiSelect from "react-select";

import courseApi from "course/api";
import { IFormData } from "student/StudentsForm";
import { ICourse } from "types";

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

interface Props {
  control: Control<IFormData, any>;
}

const CoursesMultiSelect: FC<Props> = ({ control }) => {
  const [courses, setCourses] = useState<ICourse[]>([]);

  // Fetchea los cursos de la api al montar el componente para cargar las options
  useEffect(() => {
    const getCourses = async () => {
      const courses = await courseApi.findAll();
      setCourses(courses);
    };
    getCourses();
  }, []);

  // Array de objetos con el formato { value: string, label: string } para las options de react-select
  const courseOptions = useMemo(
    () => courses.map((c) => ({ value: c.name, label: c.name })),
    [courses]
  );

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
