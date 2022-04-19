import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<IFormData, any>;
}

export interface IFormData {
  name: string;
  amount: number;
  description: string;
  active?: boolean;
  _id?: string;
}

const StudentForm = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = form;

  const isExistingCourse = !Boolean(getValues()._id);

  return (
    <form>
      <Stack spacing={4}>
        {!isExistingCourse && (
          <FormControl>
            <FormLabel htmlFor="active">Habilitado</FormLabel>
            <Switch id="active" {...register("active")} />
          </FormControl>
        )}

        <FormControl isRequired isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <Input
            autoFocus
            id="name"
            placeholder="Nombre del curso"
            {...register("name", {
              required: "Campo requerido",
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.amount}>
          <FormLabel htmlFor="amount">Importe</FormLabel>

          <InputGroup>
            <InputLeftAddon color="gray.400" fontSize="1.2em">
              $
            </InputLeftAddon>
            <Input
              id="amount"
              type="number"
              {...register("amount", {
                required: "Campo requerido",
              })}
            />
          </InputGroup>

          <FormErrorMessage>
            {errors.amount && errors.amount.message}
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
        </FormControl>
      </Stack>
    </form>
  );
};

export default StudentForm;
