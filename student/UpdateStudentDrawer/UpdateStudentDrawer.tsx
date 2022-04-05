import { FC, useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import PrimaryButton from "components/PrimaryButton";

import StudentsForm, { IFormData } from "student/StudentsForm";
import studentsApi from "student/api";
import { IStudent } from "types";
import { useRouter } from "next/router";

interface Props {
  student: IStudent;
}

const UpdateStudentDrawer: FC<Props> = ({ student }) => {
  const router = useRouter();
  const form = useForm<IFormData>({ defaultValues: student });
  const btnRef = useRef<HTMLButtonElement>();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function onSubmit(inputs: IFormData) {
    try {
      const updatedStudent = await studentsApi.update(student._id, inputs);
      toast({
        title: "Éxito!",
        description: "Se modificó el alumno",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      router.push("/students/" + updatedStudent._id);
    } catch (e) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al intentar modificar el alumno",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  }

  return (
    <>
      <Button variant="outline" onClick={onOpen} leftIcon={<AiOutlineEdit />}>
        Editar
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Editar Alumno</DrawerHeader>
          <DrawerBody>
            <StudentsForm form={form} />
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              _focus={{ borderColor: "gray.300" }}
              mr={3}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <PrimaryButton onClick={form.handleSubmit(onSubmit)}>
              Guardar
            </PrimaryButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateStudentDrawer;
