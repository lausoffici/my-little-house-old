import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Controller, UseFormReturn } from "react-hook-form";
import MultiSelect from "react-select";

interface Props {
  form: UseFormReturn<IFormData, any>;
}

export interface IFormData {
  firstName: string;
  lastName: string;
  courses: string[];
  address: string;
  email: string;
  description: string;
}

const courseOptions = [
  { value: "kinder", label: "Kinder" },
  { value: "adults", label: "Adults" },
  { value: "fce", label: "FCE" },
];

const StudentForm = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
    control,
  } = form;

  const customStyles = {
    placeholder: (provided, state) => ({
      ...provided,
      color: "#A0AEC0",
      borderColor: state.isFocused ? "#2A9D8F" : "#A0AEC0",
    }),
  };

  return (
    <form>
      <Stack spacing={4}>
        <FormControl isRequired isInvalid={!!errors.firstName}>
          <FormLabel htmlFor="firstName">Nombre</FormLabel>
          <Input
            id="firstName"
            placeholder="Juan"
            {...register("firstName", {
              required: "Campo requerido",
            })}
            _focus={{ border: "2px", borderColor: "brand.400" }}
          />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.lastName}>
          <FormLabel htmlFor="lastName">Apellido</FormLabel>
          <Input
            id="lastName"
            placeholder="Pérez"
            {...register("lastName", {
              required: "Campo requerido",
            })}
            _focus={{ border: "2px", borderColor: "brand.400" }}
          />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl minH="72px">
          <FormLabel>Cursos</FormLabel>
          <Controller
            name="courses"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <MultiSelect
                isMulti
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
                styles={customStyles}
              />
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="address">Dirección</FormLabel>
          <Input
            id="address"
            placeholder="Juan B. Justo 572, Llavallol"
            {...register("address")}
            _focus={{ border: "2px", borderColor: "brand.400" }}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="mlhouse@gmail.com"
            {...register("email", {
              required: false,
              pattern: /^\S+@\S+$/i,
            })}
            _focus={{ border: "2px", borderColor: "brand.400" }}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="description">Comentarios</FormLabel>
          <Textarea
            id="description"
            placeholder=""
            {...register("description")}
            _focus={{ border: "2px", borderColor: "brand.400" }}
          />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>
    </form>
  );
};

export default StudentForm;
