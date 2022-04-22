import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Switch,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import CoursesMultiSelect from "components/CoursesMultiSelect/CoursesMultiSelect";
import { UseFormReturn } from "react-hook-form";

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
  active?: boolean;
  _id?: string;
}

const StudentForm = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
    control,
    getValues,
  } = form;

  const isExistingStudent = !Boolean(getValues()._id);

  return (
    <form>
      <Stack spacing={4}>
        {!isExistingStudent && (
          <FormControl display="flex" alignItems="center">
            <Switch
              colorScheme="green"
              id="active"
              {...register("active")}
              mr={2}
            />
            <span>Activo</span>
          </FormControl>
        )}

        <FormControl isRequired isInvalid={!!errors.firstName}>
          <FormLabel htmlFor="firstName">Nombre</FormLabel>
          <Input
            autoFocus
            id="firstName"
            placeholder="Juan"
            {...register("firstName", {
              required: "Campo requerido",
            })}
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
          />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Cursos</FormLabel>
          <CoursesMultiSelect control={control} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="address">Dirección</FormLabel>
          <Input
            id="address"
            placeholder="Juan B. Justo 572, Llavallol"
            {...register("address")}
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
            rows={6}
          />
        </FormControl>
      </Stack>
    </form>
  );
};

export default StudentForm;
