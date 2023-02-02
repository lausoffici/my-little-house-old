import { Control, Controller } from "react-hook-form";
import MultiSelect from "react-select";
import { IStudentFormData } from "student/StudentsForm";
import { styles } from "./CoursesMultiSelect.styles";

type Props = {
  control: Control<IStudentFormData, any>;
  options: { value: string; label: string }[];
};

const CoursesMultiSelect = ({ control, options }: Props) => {
  return (
    <Controller
      name="courses"
      control={control}
      render={({ field: { value, onChange, onBlur } }) => (
        <MultiSelect
          isMulti
          styles={styles}
          options={options}
          placeholder="Seleccionar cursos"
          noOptionsMessage={() => "No se encontraron cursos"}
          onBlur={onBlur}
          onChange={(options) =>
            onChange(options?.map((option) => option.value))
          }
          value={options.filter((option) => value?.includes(option.value))}
        />
      )}
    />
  );
};

export default CoursesMultiSelect;
